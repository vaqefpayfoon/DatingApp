import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/list.resolver';
import { MessageResolver } from './_resolvers/message.resolver';

 const appRoutes: Routes= [
     {path: 'home', component: HomeComponent},
     {
       path: '',
       runGuardsAndResolvers: 'always',
       canActivate: [AuthGuard],
       children: [
        {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
        {path: 'members/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanges] },
        {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
        { path: 'messages', component: MessagesComponent, resolve: {messages: MessageResolver}},
        { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
       ]
     },
     {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class DatingRoutingModule {}
