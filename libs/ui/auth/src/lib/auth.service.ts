import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject({});
  loggedIn: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  async init() {
    try {
      const user = await this.getUser();
      this.user$.next(user);
      this.loggedIn = true;
      return;
    } catch (err) {
      this.router.navigate(['/guest']);
    }
  }

  async getUser() {
    return await this.http.get(`/user`).toPromise();
  }

  login() {
    window.location.replace('/login');
  }

  logout() {
    window.location.replace('/logout');
  }
}
