import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Used for toast messages
import { Router } from '@angular/router';
import axios from 'axios';
import { ConfirmSignUpCommand, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";
import UserUtils from '../utils/user-utils';


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


  async resendConfirmationCode(): Promise<void> {
    const newUserParams = {
      ClientId: UserUtils.CLIENT_ID,
      Username: this.email
    };
        
    let response;
    try {
      const command = new ResendConfirmationCodeCommand(newUserParams);
      response = await UserUtils.cognitoClient.send(command);
      this._snackBar.open('Successfully resent the confirmation code!');
    } catch(err) {
      this._snackBar.open('There was an error resending the confirmation code');
    }
  }
  

  async confirmRegistration(): Promise<void> {
    const newUserParams = {
      ClientId: UserUtils.CLIENT_ID,
      Username: this.email,
      ConfirmationCode: this.confirmationCode
    };
        
    let response;
    try {
      const command = new ConfirmSignUpCommand(newUserParams);
      response = await UserUtils.cognitoClient.send(command);
      this._snackBar.open('You have successfully confirmed your account! Please log in to begin using TrackXC');
      this.router.navigate(['/']);
    } catch(err: any) {
      if(err?.name === 'CodeMismatchException') { // If the confirmation code does not match
        let newCodeSnackBarRef = this._snackBar.open('Your code is invalid. Click \'Get New Code\' receive a new one by email.', 'Get New Code', { duration: 10000});

        newCodeSnackBarRef.onAction().subscribe(() => { // If the snacbar 'New Code' button gets pressed, run this function
          this.resendConfirmationCode();
        });
      } else {
        this._snackBar.open('There was an error confirming your user');
      }
    }
  }
}
