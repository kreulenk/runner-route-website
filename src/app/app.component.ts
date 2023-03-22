import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import {ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  currentHeartRate = 'NA';
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    let subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
    subject.subscribe(
       (heartRateData: any) => {
         if (heartRateData.Records) {
           console.log(JSON.stringify(heartRateData.Records));
          this.currentHeartRate = heartRateData.Records[0].dynamodb.NewImage.heartRate.N;
         }
        console.log(this.currentHeartRate) },
       (err) => console.log(err),
       () => console.log('complete')
     );
    subject.next(JSON.stringify({ op: 'hello' }));
  }

  colorSelector(heartRate: string): string {
    const heartRateNumber = parseFloat(heartRate);
    if (heartRateNumber >= 110) return 'red';
    else if (heartRateNumber >= 80 && heartRateNumber < 110) return '#f5e076';
    else if (heartRateNumber < 80) return 'green';
    return 'black'
  }

}
