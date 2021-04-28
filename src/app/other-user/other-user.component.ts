import { Component, OnInit } from '@angular/core';
import {Subject, Subscription, Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleGet} from "src/app/req/peopleGet";
import {OtherUser} from "src/app/other-user";

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss']
})
export class OtherUserComponent implements OnInit {
userId : number;
userprofile: OtherUser;
private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute, private api: PeopleGet) {
    this.subscription = new Subscription();
    this.userId = 0;
    this.subscription = this.activateRoute.params.subscribe(params => {
                this.userId = params['id'];
                this.getUserData(this.userId);
              });
  }

  ngOnInit(): void {
  }
  getUserData(userId: number){

        this.api.getCommand(userId)
            .subscribe((data: OtherUser) => {
              if( data == null){
                this.userprofile = {"userId":0, "birthday": "", "description":"", "email": "", "login": "", "logoUrl": "","registrationDate":"" };
              }else{
              this.userprofile = data;
              console.log(this.userprofile);
              }
            });}
}
