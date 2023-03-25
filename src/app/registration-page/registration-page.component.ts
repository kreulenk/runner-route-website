import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  displayName: string = '';
  email: string = '';
  firstPassword: string = '';
  secondPassword: string = '';

  onEnter(): void {
    console.log('Submit');
  }
}
