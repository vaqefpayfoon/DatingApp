import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'
import { User } from '../_model/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../_model/authUser';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post<AuthUser>(this.baseUrl + 'auth/login', model,  {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')})
      .map(user => {
      if (user) {
        localStorage.setItem('token', user.tokenString);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
        this.currentUser = user.user;
        this.userToken = user.tokenString;
        if (this.currentUser.photoUrl !== null) {
          this.changeMemberPhoto(this.currentUser.photoUrl);
        } else {
          this.changeMemberPhoto('../../assets/user.png');
        }

      }
    });
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'auth/register', user, {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')});
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

}
