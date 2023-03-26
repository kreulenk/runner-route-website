import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import axios from 'axios';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  displayName: string = '';
  email: string = '';

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

    // Start registration API call to Lambda function
    axios.post('https://0495i2ikqg.execute-api.us-east-1.amazonaws.com/default/registerNewUser', {
      email: this.email,
      displayName: this.displayName
    }).then((res: any) => {
      console.log(res);
    });
  }
}
