import { Component, OnInit } from '@angular/core';
import { RevokeTokenCommand } from "@aws-sdk/client-cognito-identity-provider";
import UserUtils from '../utils/user-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  constructor(private router: Router) {}

  preferredUsername = '';
  displayUserDropdown = false;

  ngOnInit(): void {
    this.preferredUsername = localStorage.getItem('preferred_username') as string;
  }

  toggleUserDropdown(): void {
    this.displayUserDropdown = !this.displayUserDropdown;
  }

  async logoutUser(): Promise<void> {
    const accessToken = localStorage.getItem('accessToken');
    const loginParams:any = {
      ClientId: UserUtils.CLIENT_ID,
      Token: accessToken
    }
    try {
      await UserUtils.cognitoClient.send(new RevokeTokenCommand(loginParams));
    } catch(err) {
      console.log(err);
    }
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
