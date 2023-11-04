import { AfterViewInit, Component, Input } from '@angular/core';
import { UserDataCollection, UserData } from '../types/run-data-types';
import * as d3 from 'd3';

@Component({
  selector: 'app-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.css']
})
export class LiveMapComponent implements AfterViewInit {

  @Input()
  public allUsersData: UserDataCollection = {};

  private svg: any;
  private originalXScale: any;
  private currentXScale: any;
  private xAxis: any;
  private originalYScale: any;
  private currentYScale: any;
  private yAxis: any;
  private pageWidth: number = window.innerWidth * .99;
  private pageHeight: number = window.innerHeight * .99;

  private createSvg(): void {
    this.svg = d3.select("div#bar")
      .append("svg")
      .attr("width", this.pageWidth)
      .attr("height", this.pageHeight - 60)

    // Create the X-axis band scale
    this.originalXScale = d3.scaleLinear()
      .range([0, this.pageWidth])
      .domain([-2, 2]);
    this.currentXScale = this.originalXScale;

    // Draw the X-axis on the DOM
    this.xAxis = this.svg.append("g")
      .attr("transform", "translate(" + 0 + "," + this.pageHeight / 2 + ")")
      .call(d3.axisBottom(this.originalXScale));

    // Create the Y-axis band scale
    this.originalYScale = d3.scaleLinear()
      .range([0, this.pageHeight])
      .domain([2, -2]);
    this.currentYScale = this.originalYScale;

    // Draw the Y-axis on the DOM
    this.yAxis = this.svg.append("g")
      .attr("transform", "translate(" + this.pageWidth / 2 + "," + 0 + ")")
      .call(d3.axisLeft(this.originalYScale));

    let zoom: any = d3.zoom()
      .scaleExtent([0.5, 2])
      .extent([[0, 0], [this.pageWidth, this.pageHeight]])
      .translateExtent([[-this.pageWidth, -this.pageHeight], [this.pageWidth * 2, this.pageHeight * 2]])
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

  public addNewUser(userData: UserData): void {
    // Add the path element that will track the user
    this.svg.append("path")
      .datum(userData.dataToPlot)
      .attr("id", userData.username)
      .attr("fill", "none")
      .attr("stroke", userData.lineColor)
      .attr("stroke-width", 2.5)
      .attr("d", d3.line()
        .x((d: any) => this.currentXScale(d.adjustedLatitude))
        .y((d: any) => this.currentYScale(d.adjustedLongitude))
      );

    let Tooltip = d3.select("div#bar")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "fixed")

    let mouseover: any = () => {
      d3.select("path#" + userData.username)
        .attr("stroke-width", 5)

      Tooltip
        .style("opacity", 1)
    }

    let mousemove:any = (event: any, pathData: any) => {
      const username = event.target.attributes.id.value;
      Tooltip
        .html("User: " + username + "<br>Heart Rate: " + pathData[pathData.length - 1].heartRate)
        .style("left", event.x + 5 + "px")
        .style("top", event.y + 5 +"px")
    }

    let mouseout: any = () => {
      d3.select("path#" + userData.username)
        .attr("stroke-width", 2.5)

      Tooltip
        .style("opacity", 0)
    }
    
    d3.select("path#" + userData.username)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout)
  }

  public plotUserLines() {
    for (const [key, value] of Object.entries(this.allUsersData)) {
      this.svg.select("path#" + value.username)
        .datum(value.dataToPlot)
        .attr("d", d3.line()
          .x((d: any) => this.currentXScale(d.adjustedLatitude))
          .y((d: any) => this.currentYScale(d.adjustedLongitude))
        );
    }
  }

  ngAfterViewInit(): void {
    this.createSvg();
  }
}
