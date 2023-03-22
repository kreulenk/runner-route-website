import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input()
  heartRateData: number[] = [];

  @Input()
  heartRateDataDates: string[] = []

  public lineChartData: ChartDataSets[] = [
    { data: this.heartRateData, label: 'Heart Rate' },
  ];
  public lineChartLabels: Label[] = this.heartRateDataDates;
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true })
  chart!: BaseChartDirective;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.heartRateData) {
      this.lineChartData = [
        { data: this.heartRateData, label: 'Heart Rate' },
      ]
      this.chart.update();
    }
    if (changes.heartRateDataDates) {
      this.lineChartLabels = this.heartRateDataDates;
      console.log(this.lineChartLabels);
      this.chart.update();
    }
  }

}
