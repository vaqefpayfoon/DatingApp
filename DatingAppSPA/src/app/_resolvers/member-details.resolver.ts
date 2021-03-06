import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { User } from '../_model/User';
import { UserService } from '../_services/userOld.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({ providedIn: 'root' })
export class MemberDetailResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router, private alterify: AlertifyService){}
  resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User {
    return this.userService.getUser(route.params['id']).catch(error => {
      this.alterify.error('problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null)
    });
  }
}
