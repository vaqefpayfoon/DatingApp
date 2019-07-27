import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

constructor(private authHttp: AuthHttp) { }
  private mainUrl = 'http://localhost:5000/api/users';
  getUsers(): Observable<User[]> {
    //return this.http.get(this.mainUrl, this.jwt()).map(response => <User[]>response.json()).catch(this.handlerError);
    return this.authHttp.get(this.mainUrl).map(response => <User[]>response.json())
    .catch(this.handlerError);
  }

  getUser(id: number): Observable<User> {
    return this.authHttp.get(this.mainUrl + '/' + id).map(response => <User>response.json())
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

  updateUser(id: number, user: User) {
    return this.authHttp.put(this.mainUrl + '/' + id, user).catch(this.handleError);
  }
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }
  setMainPhoto(userId: number, id: number) {
    return this.authHttp.post(this.mainUrl + '/' + userId + '/photos/' + id + '/setMain', {}).catch(this.handleError);
  }

  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(this.mainUrl + '/' + userId + '/photos/' + id).catch(this.handleError);
  }
}
