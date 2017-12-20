import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        return this.http.post('http://hywang39.pythonanywhere.com/api-token-auth/', ({ username: username, password: password }))
        .map((response: Response) => {
                // login successful if there's a jwt token in the response
                
                let token = response.json() && response.json().token;

                if (token) {
                    // set token property

                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    localStorage.setItem('username', username);
                    
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch(e =>{
                if (e.status != 200){
                    alert('Wrong credentials!');
                    return Observable.throw(new Error(e.status));
                }
            });

    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('username');
        localStorage.removeItem('currentUser');
    }

}

// The authentication for this app follows closely from this link:
// http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial