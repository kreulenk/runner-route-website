import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserUtils from '../utils/user-utils';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  email = '';
  password = '';

  ngOnInit(): void {
    localStorage.clear();
  }

  async loginUser(): Promise<void> {
    const loginParams:any = {
      ClientId: UserUtils.CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: this.email,
        PASSWORD: this.password
      }
    }
    
    let accessToken: string;
    try {
      const authResponse = await UserUtils.cognitoClient.send(new InitiateAuthCommand(loginParams));
      accessToken = authResponse.AuthenticationResult?.AccessToken as string;
      localStorage.setItem('accessToken', accessToken as string);
    } catch(err: any) {
      this._snackBar.open(err.message);
      return;
    }

    try {
      UserUtils.setUserInfo(accessToken);
    } catch(err) {
      this._snackBar.open('There was an error fetching your user\'s information');
    }
    this.router.navigate(['view-live-map']);
  }
}
