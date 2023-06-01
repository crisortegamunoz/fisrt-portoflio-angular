import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../../model/User';
import { environment } from '../../../../environments/environment';
import { AuthenticationRequest } from '../../model/autentication-request';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData$: Observable<firebase.User>;
  private user: User;
  private isLogged: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router, private http: HttpClient) { 
      this.userData$ = afAuth.authState;
      this.isLogged = false;
  }

  login(user: User) {
    const { username, password } = user;
    this.user = user;
    return this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }

  public apiLogin(authenticationResponse: AuthenticationRequest) {
    return this.http.post<any>(`${environment.PORTFOLIO_API}/auth/authenticate`, authenticationResponse);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  userLogged(token: string): void {
    if (token && token !== '') {
      this.user.token = token;
      this.isLogged = true;
    }
  }

  isUserLogged(): boolean {
    return this.isLogged;
  }

  getUser(): User {
    return this.user;
  }

  getUserToken(): string {
    return this.user.token;
  }


}
