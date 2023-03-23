import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-view-runners-page',
  templateUrl: './view-runners-page.component.html',
  styleUrls: ['./view-runners-page.component.css']
})
export class ViewRunnersPageComponent implements OnInit {
  currentHeartRate: number = 0;

  currentHeartRateDate: string = '';

  heartRateNumbers: number[] = []

  heartRateDates: string[] = []

  ngOnInit() {
    this.setupWebSocketSubscription();
  }

  setupWebSocketSubscription() {
    let subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
    subject.subscribe(
       (heartRateData: any) => {
         if (heartRateData.Records) {
          this.currentHeartRate = parseInt(heartRateData.Records[0].dynamodb.NewImage.heartRate.N);
          this.currentHeartRateDate = new Date(parseInt(heartRateData.Records[0].dynamodb.NewImage.timestamp.N)).toLocaleTimeString();
          this.heartRateNumbers = [...this.heartRateNumbers, this.currentHeartRate];
          this.heartRateDates = [...this.heartRateDates, this.currentHeartRateDate]
         }
       },
       (err) => console.log(err),
       () => console.log('complete')
     );
    subject.next(JSON.stringify({ op: 'hello' }));
  }

  colorSelector(heartRate: number): string {
    if (heartRate >= 110) return 'red';
    else if (heartRate >= 80 && heartRate < 110) return '#f5e076';
    else if (heartRate < 80 && heartRate > 0) return 'green';
    return 'black'
  }

}
