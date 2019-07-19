import { Component, OnInit } from '@angular/core';
import { User } from '../../_model/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }
  users: User[];
  ngOnInit() {
    //this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
         this.users = users;
      }, error => {
        this.alertify.error(error);
      }
    )
  }
}
