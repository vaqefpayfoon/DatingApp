import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      //console.log('Logged in successfully');
      this.alertify.success('Logged in successfully');
    }, error => {
      //console.log(error);
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    //console.log('Logged out');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
    // const token = localStorage.getItem('token');
    // return !!token;
  }

}
