import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewRunnersPageComponent } from './view-runners-page/view-runners-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ViewLiveMapComponent } from './view-live-map/view-live-map-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'view-runners', component: ViewRunnersPageComponent },
  { path: 'view-live-map', component: ViewLiveMapComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-registration', component: ConfirmRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
