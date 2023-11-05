import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ViewLiveMapPageComponent } from './view-live-map-page/view-live-map-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'view-live-map', component: ViewLiveMapPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-registration', component: ConfirmRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
