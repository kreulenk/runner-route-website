import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ViewLiveMapPageComponent } from './view-live-map-page/view-live-map-page.component';
import { LiveMapComponent } from './live-map/live-map.component';
import { UserBarComponent } from './user-bar/user-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ResetPasswordComponent,
    ConfirmRegistrationComponent,
    ViewLiveMapPageComponent,
    LiveMapComponent,
    UserBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
