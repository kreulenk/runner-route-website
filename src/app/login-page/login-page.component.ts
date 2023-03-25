import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  email = '';
  password = '';

  onEnter(): void {
    this.router.navigate(['/view-runners'], { queryParams: { email: this.email }});
  }
}
