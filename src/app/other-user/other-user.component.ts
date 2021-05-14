import { Component, OnInit } from '@angular/core';
import {Subject, Subscription, Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleGet} from "src/app/req/peopleGet";
import {OtherUser} from "src/app/other-user";
import {UserFriendsGet} from 'src/app/req/userFriendsGet';
import {LocalStorageService} from "src/app/local-storage-service";
import {FriendInGet} from "src/app/req/friendInGet";
import {AddToFriend} from "src/app/req/addToFriend";

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss']
})
export class OtherUserComponent implements OnInit {
userId : number;
userprofile: OtherUser;
private subscription: Subscription;
friends: any[];
friendsIn: any[];
friendsInUser: any[];
  constructor(private activateRoute: ActivatedRoute, private api: PeopleGet, private api1: UserFriendsGet, private api2: FriendInGet, private api3: AddToFriend, public localStorageService: LocalStorageService) {
    this.subscription = new Subscription();
    this.userId = 0;
    this.subscription = this.activateRoute.params.subscribe(params => {
                this.userId = params['id'];
                this.getUserData(this.userId);
              });
  }

  ngOnInit(): void {
  this.getUserData(this.userId);
  }
  getUserData(userId: number){

        this.api.getCommand(userId)
            .subscribe((data: OtherUser) => {
              if( data == null){
                this.userprofile = {"userId":0, "birthday": "", "description":"", "email": "", "login": "", "logoUrl": "","registrationDate":"" };
              }else{
              this.userprofile = data;
              }
            });
        this.api1.getCommand(this.localStorageService.getItem("userId"))
                                      .subscribe((data: any) => {
                                        if( data == null){

                                        }else{
                                        this.friends = data.arr;
                                        console.log("this.friends");
                                        console.log(this.friends);
                                        }
                                      });
        this.api2.getCommand(this.localStorageService.getItem("userId"))
                                      .subscribe((data: any) => {
                                         if( data == null){

                                         }else{
                                         this.friendsIn = data.users;
                                         console.log("this.friendsIn");
                                         console.log(this.friendsIn);
                                         }
                                         });

        this.api2.getCommand(userId+'')
                                             .subscribe((data: any) => {
                                                 if( data == null){

                                                  }else{
                                                  this.friendsInUser = data.users;
                                                  console.log("this.friendsInUser");
                                                  console.log(this.friendsInUser);
                                                        }
                                                  });
            }

            addToFriend(){
                    this.api3.postCommand(this.localStorageService.getItem("userId"), this.userId+"")
                                                         .subscribe((data: any) => {
                                                             if( data == null){

                                                              }else{
                                                                    this.ngOnInit();
                                                                    }
                                                              });
            }
}
