import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewRunnersPageComponent } from './view-runners-page/view-runners-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { UserListComponent } from './user-list/user-list.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DisplayMapComponent } from './display-map/display-map.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    LoginPageComponent,
    ViewRunnersPageComponent,
    UserListComponent,
    DisplayMapComponent,
    RegistrationPageComponent
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
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoia2V2ZWFnbGU1IiwiYSI6ImNsZm5ha2dndjBhOWUzcXB0Zjh3ZXV4cDYifQ.CCW819lbKrXm1NCEdqoGaw',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
