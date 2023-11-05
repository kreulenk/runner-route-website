import { Component, OnInit } from '@angular/core';
import { RevokeTokenCommand } from "@aws-sdk/client-cognito-identity-provider";
import UserUtils from '../utils/user-utils';

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

  async logoutUser(): Promise<void> {
    const accessToken = localStorage.getItem('accessToken');
    const loginParams:any = {
      ClientId: UserUtils.CLIENT_ID,
      Token: accessToken
    }
    const authResponse = await UserUtils.cognitoClient.send(new RevokeTokenCommand(loginParams));
  }
}
