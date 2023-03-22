import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentHeartRate = 0;

  currentHeartRateDate = '';

  heartRateData: number[] = []

  heartRateDataDates: string[] = []

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
          this.heartRateData = [...this.heartRateData, this.currentHeartRate];
          this.heartRateDataDates = [...this.heartRateDataDates, this.currentHeartRateDate]

         }
        console.log(this.currentHeartRate) },
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
