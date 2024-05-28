import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authurl = 'http://localhost:8099/auth/login'
  private registerurl = 'http://localhost:8099/auth/register'

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,private router: Router) { }

  register(username: string, password: string,email:string,firstName:string,lastName:string): Observable<any> {
    return this.http.post<any>(this.registerurl, { username, password,email,firstName,lastName });
  }

  login(username: string, password: string): Observable<string> {
    this.loggedIn.next(true);
    return this.http.post<string>(this.authurl, { username, password });
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  

  logout() {
    alert('Logout successful');
    this.loggedIn.next(false);
    this.router.navigate(['/dashboard']);
  }
}