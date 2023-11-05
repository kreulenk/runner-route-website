import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import UserUtils from '../utils/user-utils';

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

  constructor(private _snackBar: MatSnackBar) {}

  submitPasswordReset():void {
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
  }
}
