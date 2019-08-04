import { Resolve, Router } from '@angular/router';
import { User } from '../_model/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/userOld.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, 
        private alterify: AlertifyService) {}
    resolve
}