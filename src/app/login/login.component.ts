import { Component, OnInit, Output, OnChanges } from '@angular/core';
import { Customer } from '../customer'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  error = '';
  hide_validation: boolean = true;
  //show no hint on initial page
  user_length: boolean;
  length: boolean;
  capital: boolean;
  lowercase: boolean;
  SpecialChar: boolean;
  NoMoreThanThreeConsecutiveLetters: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.username = '';
    this.password = '';
    this.authenticationService.logout();
    this.clearValidation();

  }

  login() {
    this.clearValidation();
    this.validateAll();
    if (this.user_length && this.length && this.capital && this.lowercase && this.SpecialChar && this.NoMoreThanThreeConsecutiveLetters) {
      this.loading = true;
      this.authenticationService.login(this.username, this.password)
        .subscribe(result => {
          if (result === true) {
            // login successful
            this.router.navigate(['/summary']);
          }
          else {
            // login failed

            this.error = 'username or password is incorrect';
            this.loading = false;
          }
        });
    }
    else {
      this.hide_validation = false;
      //show error hint
    }

  }



  validateAll() {
    if (this.username.length >= 8 && this.username.length <= 20) {
      this.user_length = true;
    }

    if (this.password.length >= 10 && this.password.length <= 20) {
      this.length = true;
    }
    if (this.hasCapital(this.password)) {
      this.capital = true;
    }

    if (this.hasLowerCase(this.password)) {
      this.lowercase = true;
    }

    if (this.hasSpecialChar(this.password)) {
      this.SpecialChar = true;
    }

    if (this.hasNoMoreThanThreeConsecutiveLetters(this.password)) {
      this.NoMoreThanThreeConsecutiveLetters = true;
    }
    //could use regex too, but less readable and hard to response with correct coditions    

    // return this.length && this.capital && this.lowercase && this.SpecialChar && this.NoMoreThanThreeConsecutiveLetters;
  }

  hasCapital(str: string): boolean {
    for (var i = 0; i < str.length; i++) {
      if (str[i].toLowerCase() != str[i]) {
        return true;
      }
    }
    return false;
  }

  hasLowerCase(str: string): boolean {
    for (var i = 0; i < str.length; i++) {
      if (str[i].toUpperCase() != str[i]) {
        return true;
      }
    }
    return false;
  }

  hasSpecialChar(str: string): boolean {
    for (var i = 0; i < str.length; i++) {
      if (['%', '#', '*', '&', '!', '@'].indexOf(str[i]) != -1) {
        return true;
      }
    }
    return false;
  }

  hasNoMoreThanThreeConsecutiveLetters(str: string): boolean {
    var counter = 0;
    for (var i = 0; i < str.length; i++) {
      //is a letter
      if (/^[A-Za-z]{1}$/.test(str[i])) {
        counter += 1;
      }
      else {
        counter = 0;
      }

      if (counter > 3) {
        return false;
      }
    }
    return true;
  }


  clearValidation() {
    this.user_length = false;
    this.length = false;
    this.capital = false;
    this.lowercase = false;
    this.SpecialChar = false;
    this.NoMoreThanThreeConsecutiveLetters = false;
  }
}
