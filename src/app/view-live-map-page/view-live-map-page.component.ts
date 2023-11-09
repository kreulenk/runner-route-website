import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AWSDataPoint, PlottableData, WorkoutCollection } from '../types/run-data-types';
import { LiveMapComponent } from '../live-map/live-map.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-live-map-page',
  templateUrl: './view-live-map-page.component.html',
  styleUrls: ['./view-live-map-page.component.css']
})
export class ViewLiveMapPageComponent implements AfterViewInit {
  constructor(private apiService: ApiService) { }
  public allWorkoutsData: WorkoutCollection = {};

  @ViewChild(LiveMapComponent)
  child: LiveMapComponent = new LiveMapComponent;

  private getRecentData(): void {
    this.apiService.getRecentData().subscribe({
      next: (res: any) => {
        res.forEach((element: AWSDataPoint) => {
          this.addDataPoint( {
            latitude: element.latitude,
            longitude: element.longitude,
            username: element.username.replace(/\s|\)|\(/g, "_"),
            heartRate: element.heartRate,
            workoutId: 'a' + element.workoutId, // add A so that the ID does not start with a number so that it can be used as an HTML id
            timestamp: element.timestamp
          } );
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  setupWebSocketSubscription() {
    const subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
    subject.subscribe(
      (heartRateData: any) => {
        if (heartRateData.Records) {
          const newDataPoint: AWSDataPoint = {
            latitude: parseFloat(heartRateData.Records[0].dynamodb.NewImage.latitude.N),
            longitude: parseFloat(heartRateData.Records[0].dynamodb.NewImage.longitude.N),
            username: heartRateData.Records[0].dynamodb.NewImage.username.S.replace(/\s|\)|\(/g, "_"),
            heartRate: heartRateData.Records[0].dynamodb.NewImage.heartRate.N,
            timestamp: heartRateData.Records[0].dynamodb.NewImage.timestamp.N,
            workoutId: 'a' + heartRateData.Records[0].dynamodb.NewImage.workoutId.S // add A so that the ID does not start with a number so that it can be used as an HTML id
          }
          this.addDataPoint(newDataPoint);
        }
      },
      (err) => console.log(err),
      () => console.log('complete')
    );
    subject.next(JSON.stringify({ op: 'hello' }));
  }

  private addDataPoint(awsDataPoint: AWSDataPoint): void {
    let isNewWorkout = false;
    if (!this.allWorkoutsData[awsDataPoint.workoutId]) { // If the workout's data does not exist yet, create a new entry for it
      isNewWorkout = true;
      const lineColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Randomly generate a color that will be used for this user's line

      this.allWorkoutsData[awsDataPoint.workoutId] = { dataToPlot: [], lineColor, workoutId: awsDataPoint.workoutId, username: awsDataPoint.username }
    }

    const latitude = awsDataPoint.latitude * 68.96139; // 1 degree of latitude change is 68 miles
    const longitude = awsDataPoint.longitude * 55.11761; // 1 degree of longitude is 54 miles

    const newPlottableData: PlottableData = { latitude, longitude, heartRate: awsDataPoint.heartRate, username: awsDataPoint.username };

    this.allWorkoutsData[awsDataPoint.workoutId].dataToPlot.push(newPlottableData);
    if (isNewWorkout) {
      this.child.addNewWorkout(this.allWorkoutsData[awsDataPoint.workoutId])
    } else {
      this.child.plotWorkoutLines();
    }
  }

  ngAfterViewInit(): void {
    this.getRecentData();
    this.setupWebSocketSubscription();
  }

}
