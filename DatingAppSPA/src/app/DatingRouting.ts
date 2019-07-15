import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';

 const appRoutes: Routes= [
     {path: 'home', component: HomeComponent},
     {
       path: '',
       runGuardsAndResolvers: 'always',
       canActivate: [AuthGuard],
       children: [
        {path: 'members', component: MemberListComponent},
        {path: 'list', component: ListsComponent},
        {path: 'message', component: MessagesComponent},
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
