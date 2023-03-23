import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {

  @Input()
  heartRateNumbers: number[] = [];

  @Input()
  heartRateDates: string[] = []

  public lineChartData: ChartDataset[] = [
    { data: this.heartRateNumbers, label: 'Heart Rate' },
  ];
  public lineChartLabels: string[] = this.heartRateDates;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.heartRateData || changes.heartRateDates) {
      this.lineChartData = [
        { data: this.heartRateNumbers, label: 'Heart Rate' },
      ]
      this.lineChartLabels = this.heartRateDates;
      this.chart.update();
    }
  }

}
