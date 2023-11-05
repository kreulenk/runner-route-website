import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  preferredUsername = '';
  displayUserDropdown = false;

  ngOnInit(): void {
    this.preferredUsername = localStorage.getItem('preferred_username') as string;
  }

  toggleUserDropdown(): void {
    this.displayUserDropdown = !this.displayUserDropdown;
  }
}
