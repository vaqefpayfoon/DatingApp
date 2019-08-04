import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ValueComponent } from './value/value.component';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule, TabsModule, BsDatepickerModule, ButtonsModule,
    PaginationModule } from 'ngx-bootstrap';
import { MemberListComponent } from './members/member-list/member-list.component'
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { DatingRoutingModule } from './DatingRouting';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/userOld.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { AuthModule } from './auth/auth.module';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe'
import { ListsResolver } from './_resolvers/list.resolver';
import { MessageResolver } from './_resolvers/message.resolver';
import { MembersMessagesComponent } from './members/members-messages/members-messages.component';
import { JwtModule } from '@auth0/angular-jwt';

export function getAccessToken(): string {
   return localStorage.getItem('token');
 }
 
 export const jwtConfig = {
   tokenGetter: getAccessToken,
   whiteListedDomains: ['localhost:5000']
 };

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ValueComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent, TimeAgoPipe, MembersMessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      DatingRoutingModule,
      AuthModule,
      TabsModule.forRoot(),
      FileUploadModule, ReactiveFormsModule, BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      HttpClientModule,
      JwtModule.forRoot({
      config: jwtConfig
      })
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver, MemberListResolver, MemberEditResolver, PreventUnsavedChanges,
      ListsResolver, MessageResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
