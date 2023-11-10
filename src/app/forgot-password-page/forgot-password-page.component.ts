import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import UserUtils from '../utils/user-utils';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent {
  email = '';

  constructor(private _snackBar: MatSnackBar) {}

  async requestForgottenPasswordEmail():Promise<void> {
    const resetPassParams:any = {
      ClientId: UserUtils.CLIENT_ID,
      Username: this.email
    }
    
    try {
      await UserUtils.cognitoClient.send(new ForgotPasswordCommand(resetPassParams));
      this._snackBar.open('Please check your email for the password reset information.');
    } catch(err: any) {
      this._snackBar.open(err.message);
      return;
    }
  }
}
