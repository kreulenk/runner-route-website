import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-view-live-map',
  templateUrl: './view-live-map.component.html',
  styleUrls: ['./view-live-map.component.css']
})
export class ViewLiveMapComponent implements OnInit {
  private data = [
    { latitude: -30, longitude: 40 },
    { latitude: -40, longitude: 45 },
    { latitude: -45, longitude: 40 },
    { latitude: -40, longitude: 33 },
    { latitude: -30, longitude: 30 }
  ];
  private svg: any;
  private pageWidth = window.innerWidth * .99;
  private pageHeight = window.innerHeight * .99;

  private createSvg(): void {
    this.svg = d3.select("div#bar")
      .append("svg")
      .attr("width", this.pageWidth)
      .attr("height", this.pageHeight)
      .append("g")
      // .attr("transform", "translate(" + this.pageWidth / 2 + "," + this.pageHeight / 2 + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleLinear()
      .range([0, this.pageWidth])
      .domain([-50, 50]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(" + 0 + "," + this.pageHeight/2 + ")")
      .call(d3.axisBottom(x));

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .range([0, this.pageHeight])
      .domain([50, -50]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(" + this.pageWidth/2 + "," + 0 + ")")
      .call(d3.axisLeft(y));

    this.svg.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d: any) => x(d.latitude))
        .y((d: any) => y(d.longitude))
        )
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

}
