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

  heartRateNumbers: number[] = [];

  heartRateDates: string[] = [];

  siteUserCount: number = 0;

  ngOnInit() {
    this.setupWebSocketSubscription();
  }

  setupWebSocketSubscription() {
    let subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
    subject.subscribe(
       (heartRateData: any) => {
         if (heartRateData.Records) {
          console.log(heartRateData.Records);
          this.currentHeartRate = parseInt(heartRateData.Records[0].dynamodb.NewImage.heartRate.N);
          this.currentHeartRateDate = new Date(parseInt(heartRateData.Records[0].dynamodb.NewImage.timestamp.N)).toLocaleTimeString();
          this.heartRateNumbers = [...this.heartRateNumbers, this.currentHeartRate];
          this.heartRateDates = [...this.heartRateDates, this.currentHeartRateDate];
         }
         if (heartRateData.userCount) this.siteUserCount = heartRateData.userCount;
       },
       (err) => console.log(err),
       () => console.log('complete')
     );
    subject.next(JSON.stringify({ op: 'hello' }));
  }

}
