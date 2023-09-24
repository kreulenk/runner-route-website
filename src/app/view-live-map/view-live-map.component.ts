import { AfterViewInit, Component } from '@angular/core';
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
  dataToPlot: PlottableData[],
  username: string
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
export class ViewLiveMapComponent implements AfterViewInit {
  private allUsersData: UserDataCollection = {};
  private svg: any;
  private originalXScale: any;
  private currentXScale: any;
  private xAxis: any;
  private originalYScale: any;
  private currentYScale: any;
  private yAxis: any;
  private pageWidth: number = window.innerWidth * .99;
  private pageHeight: number = window.innerHeight * .99;


  setupWebSocketSubscription() {
    let subject = webSocket('wss://vkur9pkf63.execute-api.us-east-1.amazonaws.com/production');
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
      this.addNewUser(this.allUsersData[usernameNoSpaces])
    } else {
      console.log(this.allUsersData[usernameNoSpaces]);
      this.plotUserLines();
    }
  }


  private createSvg(): void {
    this.svg = d3.select("div#bar")
      .append("svg")
      .attr("width", this.pageWidth)
      .attr("height", this.pageHeight)

    // Create the X-axis band scale
    this.originalXScale = d3.scaleLinear()
      .range([0, this.pageWidth])
      .domain([-3, 3]);
    this.currentXScale = this.originalXScale;

    // Draw the X-axis on the DOM
    this.xAxis = this.svg.append("g")
      .attr("transform", "translate(" + 0 + "," + this.pageHeight / 2 + ")")
      .call(d3.axisBottom(this.originalXScale));

    // Create the Y-axis band scale
    this.originalYScale = d3.scaleLinear()
      .range([0, this.pageHeight])
      .domain([3, -3]);
    this.currentYScale = this.originalYScale;

    // Draw the Y-axis on the DOM
    this.yAxis = this.svg.append("g")
      .attr("transform", "translate(" + this.pageWidth / 2 + "," + 0 + ")")
      .call(d3.axisLeft(this.originalYScale));

    var zoom: any = d3.zoom()
      .scaleExtent([0.5, 2])
      .extent([[0, 0], [this.pageWidth, this.pageHeight]])
      .translateExtent([[0, 0], [this.pageWidth * 2, this.pageHeight * 2]] )
      .on('zoom', (e) => this.updatePerZoom(e));

    d3.select("div#bar")
      .call(zoom);
  }

  private updatePerZoom(event: any) {
    // Update the scales
    this.currentXScale = event.transform.rescaleX(this.originalXScale);
    this.currentYScale = event.transform.rescaleY(this.originalYScale);
    // Update the axes
    this.xAxis.call(d3.axisBottom(this.currentXScale))
    this.yAxis.call(d3.axisLeft(this.currentYScale))

    this.plotUserLines();
  }

  private addNewUser(userData: UserData): void {
    this.svg.append("path")
      .datum(userData.dataToPlot)
      .attr("fill", "none")
      .attr("stroke", userData.lineColor)
      .attr("id", userData.username)
      .attr("stroke-width", 2.5)
      .attr("d", d3.line()
        .x((d: any) => this.currentXScale(d.adjustedLatitude))
        .y((d: any) => this.currentYScale(d.adjustedLongitude))
      );
  }

  private plotUserLines() {
    for (const [key, value] of Object.entries(this.allUsersData)) {
      this.svg.select("#" + value.username)
        .datum(value.dataToPlot)
        .attr("d", d3.line()
          .x((d: any) => this.currentXScale(d.adjustedLatitude))
          .y((d: any) => this.currentYScale(d.adjustedLongitude))
        );
    }
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.setupWebSocketSubscription();
  }

}
