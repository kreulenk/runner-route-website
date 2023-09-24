import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { webSocket } from 'rxjs/webSocket';

type AWSDataPoint = {
  latitude: number,
  longitude: number,
  username: string,
  heartRate: number
}

type UserData = {
  initialLatitude: number,
  initialLongitude: number,
  lineColor: string,
  dataToPlot: PlottableData[]
}

type PlottableData = {
  adjustedLatitude: number,
  adjustedLongitude: number,
  heartRate: number
}

type UserDataCollection = {
  [key: string]: UserData
}

@Component({
  selector: 'app-view-live-map',
  templateUrl: './view-live-map.component.html',
  styleUrls: ['./view-live-map.component.css']
})
export class ViewLiveMapComponent implements OnInit {
  private allUsersData: UserDataCollection = {};
  private svg: any;
  private xAxis: any;
  private yAxis: any;
  private pageWidth: number = window.innerWidth * .99;
  private pageHeight: number = window.innerHeight * .99;


  setupWebSocketSubscription() {
    let subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
    subject.subscribe(
      (heartRateData: any) => {
        let currentLatitude;
        let currentLongitude;
        if (heartRateData.Records) {
          currentLatitude = heartRateData.Records[0].dynamodb.NewImage.latitude.N;
          currentLongitude = heartRateData.Records[0].dynamodb.NewImage.longitude.N
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

  private addDataPoint(dataPoint: AWSDataPoint): void {
    if (!this.allUsersData[dataPoint.username]) { // If the user's data does not exist we will create a entry point for their data with a zero'd coordinate set
      const initialLatitude = dataPoint.latitude;
      const initialLongitude = dataPoint.longitude;
      const lineColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Randomly generate a color that will be used for this user's line

      this.allUsersData[dataPoint.username] = { initialLatitude, initialLongitude, dataToPlot: [], lineColor }
    }

    const latitudeDifferenceFromInitial = (Math.abs(this.allUsersData[dataPoint.username].initialLatitude) - Math.abs(dataPoint.latitude));
    const longitudeDifferenceFromInitial = (Math.abs(this.allUsersData[dataPoint.username].initialLongitude) - Math.abs(dataPoint.longitude));
    const adjustedLatitude = latitudeDifferenceFromInitial * 68.96139; // 1 degree of latitude change is 68 miles
    const adjustedLongitude = longitudeDifferenceFromInitial * 55.11761; // 1 degree of longitude is 54 miles
    this.allUsersData[dataPoint.username].dataToPlot.push({adjustedLatitude, adjustedLongitude, heartRate: dataPoint.heartRate });
    console.log(this.allUsersData[dataPoint.username]);
    this.drawBars();
  }


  private createSvg(): void {
    this.svg = d3.select("div#bar")
      .append("svg")
      .attr("width", this.pageWidth)
      .attr("height", this.pageHeight)
      .append("g")

    // Create the X-axis band scale
    this.xAxis = d3.scaleLinear()
      .range([0, this.pageWidth])
      .domain([-3, 3]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(" + 0 + "," + this.pageHeight / 2 + ")")
      .call(d3.axisBottom(this.xAxis));

    // Create the Y-axis band scale
    this.yAxis = d3.scaleLinear()
      .range([0, this.pageHeight])
      .domain([3, -3]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(" + this.pageWidth / 2 + "," + 0 + ")")
      .call(d3.axisLeft(this.yAxis));
  }

  private drawBars(): void {
    for (const [key, value] of Object.entries(this.allUsersData)) {
      this.svg.append("path")
      .datum(value.dataToPlot)
      .attr("fill", "none")
      .attr("stroke", value.lineColor)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d: any) => this.xAxis(d.adjustedLatitude))
        .y((d: any) => this.yAxis(d.adjustedLongitude))
      );
    }


  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars();
    this.setupWebSocketSubscription();
  }

}
