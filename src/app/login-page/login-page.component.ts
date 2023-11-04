import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserUtils from '../utils/user-utils';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import { InitiateAuthCommand, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  email = '';
  password = '';

  async onEnter(): Promise<void> {
    const loginParams = {
      ClientId: UserUtils.CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: this.email,
        PASSWORD: this.password
      }
    }

    try {
      const authResponse = await UserUtils.cognitoClient.send(new InitiateAuthCommand(loginParams));
      const AccessToken = authResponse.AuthenticationResult?.AccessToken;

      const getUserResponse = await UserUtils.cognitoClient.send(new GetUserCommand({ AccessToken }));

      localStorage.setItem('access_token', AccessToken as string);
      getUserResponse.UserAttributes?.forEach(attribute => { // Set preferred username and other attrs
        localStorage.setItem(attribute.Name as string, attribute.Value as string);
      });
      this.router.navigate(['view-live-map']);
    } catch(err) {
      this._snackBar.open('There was an error logging in');
    }
  }
}
