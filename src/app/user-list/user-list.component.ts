import { Component } from '@angular/core';

export interface RunnerInfo {
  runnerName: string;
  currentHeartRate: number;
}

const ELEMENT_DATA: RunnerInfo[] = [
  {runnerName: 'Kevin', currentHeartRate: 70},
  {runnerName: 'test1', currentHeartRate: 75},
  {runnerName: 'test2', currentHeartRate: 72},
  {runnerName: 'test3', currentHeartRate: 90},
  {runnerName: 'test4', currentHeartRate: 100},
  {runnerName: 'test5', currentHeartRate: 73},
  {runnerName: 'test6', currentHeartRate: 54},
  {runnerName: 'test7', currentHeartRate: 110},
  {runnerName: 'test8', currentHeartRate: 88},
  {runnerName: 'test9', currentHeartRate: 79},
  {runnerName: 'test10', currentHeartRate: 90}
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns: string[] = ['runnerName', 'currentHeartRate'];
  dataSource = ELEMENT_DATA;
}
