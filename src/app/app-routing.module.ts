import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewRunnersPageComponent } from './view-runners-page/view-runners-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'view-runners', component: ViewRunnersPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
