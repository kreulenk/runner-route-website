import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AWSDataPoint, PlottableData, UserDataCollection } from '../types/run-data-types';
import { LiveMapComponent } from '../live-map/live-map.component';

@Component({
  selector: 'app-view-live-map-page',
  templateUrl: './view-live-map-page.component.html',
  styleUrls: ['./view-live-map-page.component.css']
})
export class ViewLiveMapPageComponent implements AfterViewInit {
  public allUsersData: UserDataCollection = {};

  @ViewChild(LiveMapComponent)
  child: LiveMapComponent = new LiveMapComponent;

  setupWebSocketSubscription() {
    const subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
    subject.subscribe(
      (heartRateData: any) => {
        if (heartRateData.Records) {
          const newDataPoint: AWSDataPoint = {
            latitude: parseFloat(heartRateData.Records[0].dynamodb.NewImage.latitude.N),
            longitude: parseFloat(heartRateData.Records[0].dynamodb.NewImage.longitude.N),
            username: heartRateData.Records[0].dynamodb.NewImage.username.S,
            heartRate: heartRateData.Records[0].dynamodb.NewImage.heartRate.N
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
    let isNewUser = false;
    const usernameNoSpaces = awsDataPoint.username.replace(/\s|\)|\(/g, "_")
    if (!this.allUsersData[usernameNoSpaces]) { // If the user's data does not exist we will create a entry point for their data with a zero'd coordinate set
      isNewUser = true;
      const initialLatitude = awsDataPoint.latitude;
      const initialLongitude = awsDataPoint.longitude;
      const lineColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Randomly generate a color that will be used for this user's line

      this.allUsersData[usernameNoSpaces] = { initialLatitude, initialLongitude, dataToPlot: [], lineColor, username: usernameNoSpaces }
    }

    const latitudeDifferenceFromInitial = (Math.abs(this.allUsersData[usernameNoSpaces].initialLatitude) - Math.abs(awsDataPoint.latitude));
    const longitudeDifferenceFromInitial = (Math.abs(this.allUsersData[usernameNoSpaces].initialLongitude) - Math.abs(awsDataPoint.longitude));
    const adjustedLatitude = latitudeDifferenceFromInitial * 68.96139; // 1 degree of latitude change is 68 miles
    const adjustedLongitude = longitudeDifferenceFromInitial * 55.11761; // 1 degree of longitude is 54 miles

    const newPlottableData: PlottableData = { adjustedLatitude, adjustedLongitude, heartRate: awsDataPoint.heartRate };

    this.allUsersData[usernameNoSpaces].dataToPlot.push(newPlottableData);
    if (isNewUser) {
      this.child.addNewUser(this.allUsersData[usernameNoSpaces])
    } else {
      console.log(this.allUsersData[usernameNoSpaces]);
      this.child.plotUserLines();
    }
  }

  ngAfterViewInit(): void {
    this.setupWebSocketSubscription();
  }

}
