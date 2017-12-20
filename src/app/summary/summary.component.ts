import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Global } from '../global';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, DoCheck {

  data: any;
  userDetail: any;
  username: string;
  constructor(private userService: UserService) { }
  deposit_account: Array<Object>;
  loan_account: Array<Object>;
  sums: Object = {};

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userDetail = this.userService.getUser(this.username).subscribe
      (res => {
      this.userDetail = JSON.parse(JSON.stringify(res));

      });
  }
  ngDoCheck() {
    //This lives right after Oninit and before rendering views
    this.deposit_account = this.userDetail['deposit_account'];
    this.loan_account = this.userDetail['loan_account'];
    var sum_current_balance = 0;
    var sum_available_balance = 0;
    var sum_current_credit_balance = 0;
    var sum_current_credit_limit = 0;
    if(this.deposit_account){
      for(var i=0; i<this.deposit_account.length; i++){
        var keys = Object.keys(this.deposit_account[i]);
        for(var j=0; j<keys.length; j++){
          this.deposit_account[i][keys[j]] = parseFloat(this.deposit_account[i][keys[j]]);
        }
        sum_current_balance += this.deposit_account[i]['current_balance'];
        sum_available_balance += (this.deposit_account[i]['current_balance'] + this.deposit_account[i]['over_draft'] 
                                                                             - this.deposit_account[i]['on_hold'])
            // available balance = current balance + over_draft - on_hold
      }
      this.sums['sum_current_balance'] = sum_current_balance;
      this.sums['sum_available_balance'] = sum_available_balance;
      //while converting string num to floats inside the objects, also calculate the subtotals and save them in objects.
    }

    if(this.loan_account){
      for(var i=0; i<this.loan_account.length; i++){
        var keys = Object.keys(this.loan_account[i]);
        for(var j=0; j<keys.length; j++){
          this.loan_account[i][keys[j]] = parseFloat(this.loan_account[i][keys[j]]);
        }
        sum_current_credit_balance += this.loan_account[i]['current_balance'];
        sum_current_credit_limit +=  this.loan_account[i]['credit_limit'];
      }
      this.sums['sum_current_credit_balance'] = sum_current_credit_balance
      this.sums['sum_current_credit_limit'] = sum_current_credit_limit
      
    }
    //convert both deposit_accounts and loan accounts values to float and store it inside component    
  }

}
