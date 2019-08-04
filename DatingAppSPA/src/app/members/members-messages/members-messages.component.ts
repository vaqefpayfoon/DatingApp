import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_model/message';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/userOld.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-members-messages',
  templateUrl: './members-messages.component.html',
  styleUrls: ['./members-messages.component.css']
})
export class MembersMessagesComponent implements OnInit {

  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId)
    .do(messages => {
      _.each(messages, (message: Message) => {
        if (message.isRead === false && message.recipientId === currentUserId) {
          this.userService.markAsRead(currentUserId, message.id);
        }
      });
    })
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
