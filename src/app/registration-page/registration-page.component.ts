import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import UserUtils from '../utils/user-utils';
import { Router } from '@angular/router';
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

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

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  async submitCredentials(): Promise<void> {
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

    const newUserParams = {
      ClientId: UserUtils.CLIENT_ID,
      Username: this.email,
      Password: this.password1,
      UserAttributes: [{ Name: "email", Value: this.email}, { Name: "preferred_username", Value: this.displayName }]
    };
    
    let response;
    try {
      const command = new SignUpCommand(newUserParams);
      response = await UserUtils.cognitoClient.send(command);
      this._snackBar.open('Your user has been created! Please check your email to complete the registration.');
      this.router.navigate(['confirm-registration'])
    } catch(err) {
      console.log(err);
      this._snackBar.open(`There was an error creating your user: ${err}`);
    }
    
  }
}
