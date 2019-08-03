import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../_model/pagination';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private authHttp: AuthHttp) { }
  private mainUrl = 'http://localhost:5000/api/users';
  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParam?: string) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (likesParam === 'Likers') {
      queryString += 'Likers=true&';
    }

    if (likesParam === 'Likees') {
      queryString += 'Likees=true&';
    }

    if (userParams != null) {
      queryString +=
        'minAge=' + userParams.minAge +
        '&maxAge=' + userParams.maxAge +
        '&gender=' + userParams.gender +
        '&orderBy=' + userParams.orderBy;
    }
    return this.authHttp
      .get(this.baseUrl + 'users' + queryString)
      .map((response: Response) => {
        paginatedResult.result = response.json();
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }

        return paginatedResult;
      })
      .catch(this.handleError);
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
    if (error.status === 400) {
      return Observable.throw(error._body);
    }
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
  sendLike(id: number, recipientId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + id +  '/like/' + recipientId, {}).catch(this.handleError);
  }
}
