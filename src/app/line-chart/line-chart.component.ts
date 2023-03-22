import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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

  public lineChartData: ChartDataset[] = [
    { data: this.heartRateData, label: 'Heart Rate' },
  ];
  public lineChartLabels = this.heartRateDataDates;
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors = [
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
