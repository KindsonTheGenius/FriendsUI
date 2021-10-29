import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FriendComponent} from './friend/friend.component';
import {PersonComponent} from './person/person.component';
import {ContactComponent} from './contact/contact.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendComponent},
  {path: '', component: HomeComponent},
  {path: 'person', component: PersonComponent},
  {path: 'contact', component: ContactComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
