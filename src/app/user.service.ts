import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthenticationService } from './authentication.service';
import { Customer } from './customer';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUser(username:string): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.authenticationService.token,
            'Content-Type':'application/x-www-form-urlencoded',

        });
        let options = new RequestOptions({headers: headers });

        // get users from api
        return this.http.get('http://hywang39.pythonanywhere.com/users/' + username , options)
            .map((response: Response) => response.json());
    }

    getUsers(): Observable<any> {

        return this.http.get('http://hywang39.pythonanywhere.com/users/')
            .map((response) => response.json());
    }
}