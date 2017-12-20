import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service'
import { Global } from './global';
import { UserService } from './user.service';

import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'app';
  users:any;
  username: string;

  constructor(private authenticationService: AuthenticationService,
    private global: Global,
    private userService: UserService) { }

  logout() {
    this.authenticationService.logout();
    this.authenticationService.token = null;
  }

}
