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
  async ngOnInit(): Promise<void> {
    // We do not need to confirm an active session on registration pages
    const currentUrl = document.location.href;
    if (currentUrl.includes('/confirm-registration') || currentUrl.includes('/registration')) return;
    if (await this.isSessionActive()) return;

    this.router.navigate(['']);
  }

  async isSessionActive(): Promise<boolean> {
    const accessToken = localStorage.getItem('accessToken') as string;
    if (!accessToken) return false;

    try {
      await UserUtils.setUserInfo(accessToken);
    } catch (err) {
      return false;
    }
    return true;
  }
}
