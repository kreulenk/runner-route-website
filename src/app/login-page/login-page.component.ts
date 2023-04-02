import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserUtils from '../utils/user-utils';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  email = '';
  password = '';

  onEnter(): void {
    const loginParams = {
      ClientId: UserUtils.CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: this.email,
        PASSWORD: this.password
      }
    }

    let response;
    try {
      const command = new InitiateAuthCommand(loginParams);
      response = UserUtils.cognitoClient.send(command);
    } catch(err) {
      this._snackBar.open('There was an error logging in');
    }
    console.log(response);
  }
}
