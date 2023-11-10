import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import UserUtils from '../utils/user-utils';
import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email = '';
  resetToken = '';
  newPassword1 = '';
  newPassword2 = '';

  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  async submitPasswordReset():Promise<void> {
    if (this.newPassword1 != this.newPassword2) {
      this._snackBar.open('The new passwords you entered do not match');
      return;
    }

    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
    if (!emailRegex.test(this.email)) {
      this._snackBar.open('The email you entered is not properly formatted');
      return;
    }
    const passwordComplexityIssue:any = UserUtils.findIssueWithPasswordComplexity(this.newPassword1);
    if (passwordComplexityIssue) {
      this._snackBar.open(passwordComplexityIssue);
      return;
    }

    const loginParams:any = {
      ClientId: UserUtils.CLIENT_ID,
      Username: this.email,
      Password: this.newPassword1,
      ConfirmationCode: this.resetToken
    }
    
    try {
      await UserUtils.cognitoClient.send(new ConfirmForgotPasswordCommand(loginParams));
    } catch(err: any) {
      this._snackBar.open(err.message);
      return;
    }
    this._snackBar.open('You have successfully reset your password!');
    this.router.navigate(['']); // If successful password reset, navigate to the login page
  }
}
