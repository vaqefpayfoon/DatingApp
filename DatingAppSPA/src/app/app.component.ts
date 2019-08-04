import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from './_model/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  //jwtHelper: JwtHelper = new JwtHelper();
  constructor(private authService: AuthService, private jwtServiceHelper: JwtHelperService){}
  user: User;
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtServiceHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
