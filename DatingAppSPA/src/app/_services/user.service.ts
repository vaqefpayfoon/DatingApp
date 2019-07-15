import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

constructor(private authHttp: AuthHttp) { }
  private mainUrl = 'http://localhost:5000/api/users';
  getUser(): Observable<User[]> {
    //return this.http.get(this.mainUrl, this.jwt()).map(response => <User[]>response.json()).catch(this.handlerError);
    return this.authHttp.get(this.mainUrl).map(response => <User[]>response.json())
    .catch(this.handlerError);
  }

  private jwt() {
    let token = localStorage.getItem('token');
    if(token) {
      let _headers = new Headers({'Authorization': 'Bearer ' + token})
      _headers.append('Content-Type','application/json');
      return new RequestOptions({headers: _headers});
    }
  }

  private handlerError(error: any){
    const applicationError = error.headers.get('Application-Error');
    if(applicationError){
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if(serverError){
      for(let key in serverError){
        if(serverError[key]){
          modelStateError += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(modelStateError || 'Server Error');
  }
}
