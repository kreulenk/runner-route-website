import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import UserUtils from './utils/user-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // If we load into the site on a random page, check if we are logged in
  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken') as string;
    if (document.location.href.includes('/confirm-registration')) return;

    if (!accessToken) {
      this.router.navigate(['']);
      return;
    }
    try {
      UserUtils.setUserInfo(accessToken);
    } catch (err) {
      this.router.navigate(['']);
    }
  }
}
