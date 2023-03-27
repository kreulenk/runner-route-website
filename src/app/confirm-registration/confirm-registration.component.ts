import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent {
  email: string = '';
  confirmationCode: string = '';
  showGenerateNewTokenLink: boolean = false;

  constructor(private router: Router, private _snackBar: MatSnackBar) {}


  resendConfirmationCode(): void {
    axios.post('https://2738ix8bz3.execute-api.us-east-1.amazonaws.com/default/resendConfirmationCode', {
      email: this.email
    }).then(() => {
      this._snackBar.open('Successfully resent the confirmation code!');
    }).catch((err: any) => {
      this._snackBar.open('There was an error resending the confirmation code');
    });
  }
  

  confirmRegistration(): void {
    // Start registration API call to Lambda function
    axios.post('https://4xywj10n62.execute-api.us-east-1.amazonaws.com/default/verifyNewUser', {
      email: this.email,
      confirmationCode: this.confirmationCode,
    }).then((res: any) => {
      this._snackBar.open('You have successfully confirmed your account! Please login to begin using TrackXC');
      this.router.navigate(['/']);
    }).catch((err: any) => {
      console.log(err.request.status);
      if(err.request.status === 498) { // If the confirmation code has expired
        let newCodeSnackBarRef = this._snackBar.open('Your code is invalid. Click \'New Code\' receive a new one by email.', 'New Code', { duration: 10000});

        newCodeSnackBarRef.onAction().subscribe(() => { // If the snacbar 'New Code' button gets pressed, run this function
          this.resendConfirmationCode();
        });
      } else {
        this._snackBar.open('There was an error confirming your user');
      }
    });
  }
}
