import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import UserUtils from '../utils/user-utils';
import axios from 'axios';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  displayName: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';

  constructor(private _snackBar: MatSnackBar) {}

  submitCredentials(): void {
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);

    if (this.displayName.length < 4 || this.displayName.length > 12) { // Check Display Name Length
      this._snackBar.open('Display Name must be between 4 and 12 characters in length');
      return;
    }
    if (!emailRegex.test(this.email)) {
      this._snackBar.open('The email you entered is not properly formatted');
      return;
    }
    if (this.password1 != this.password2) {
      this._snackBar.open('The passwords you entered do not match');
      return;
    }

    const passwordComplexityIssue:any = UserUtils.findIssueWithPasswordComplexity(this.password1);
    if (passwordComplexityIssue) {
      this._snackBar.open(passwordComplexityIssue);
      return;
    }

    // Start registration API call to Lambda function
    axios.post('https://0495i2ikqg.execute-api.us-east-1.amazonaws.com/default/registerNewUser', {
      email: this.email,
      displayName: this.displayName,
      password: this.password1
    }).then((res: any) => {
      this._snackBar.open('Your user has been created! Please check your email to reset your password.');
    }).catch((err: any) => {
      this._snackBar.open('There was an error creating your user');
    });
  }
}
