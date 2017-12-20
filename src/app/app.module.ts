import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component'

import { AppRoutingModule } from './app.routing.module';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { Global } from './global';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [AuthenticationService, AuthGuard, Global, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
