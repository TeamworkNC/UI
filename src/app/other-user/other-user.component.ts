import { Component, OnInit } from '@angular/core';
import {Subject, Subscription, Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleGet} from "src/app/req/peopleGet";
import {OtherUser} from "src/app/other-user";
import {UserFriendsGet} from 'src/app/req/userFriendsGet';
import {LocalStorageService} from "src/app/local-storage-service";
import {FriendInGet} from "src/app/req/friendInGet";
import {AddToFriend} from "src/app/req/addToFriend";
import {AcceptFriend} from "src/app/req/acceptFriend";
import {DeclineToFriend} from "src/app/req/declineToFriend";
import {DeleteFriend} from "src/app/req/deleteFriend";
import {HomeGet} from 'src/app/req/homeGet';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Unban} from "src/app/req/unban";
import {Ban} from "src/app/req/ban";


@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss']
})
export class OtherUserComponent implements OnInit {
userId : number;
friendRequestId: number;
userprofile: OtherUser;
private subscription: Subscription;
friends: any[];
friendsIn: any[];
friendsInUser: any[];
films: any;
  constructor(private activateRoute: ActivatedRoute,
  private api: PeopleGet,
  private api1: UserFriendsGet,
  private api2: FriendInGet,
  private api3: AddToFriend,
  private api4: AcceptFriend,
  private api5: DeclineToFriend,
  private api6: DeleteFriend,
  private api7: HomeGet,
  private api8: Ban,
  private api9: Unban,
  private router: Router,
   public localStorageService: LocalStorageService, private http: HttpClient) {
    this.subscription = new Subscription();
    this.userId = 0;
    this.subscription = this.activateRoute.params.subscribe(params => {
                this.userId = params['id'];
                this.getUserData(this.userId);
              });
    this.getFilms();
  }

  ngOnInit(): void {
  if(this.localStorageService.getItem("userId")){
    this.getUserData(this.userId);
  } else{
    this.router.navigate(
                            ['/home']);
  }
  }
  getFilms(){
           this.api7.getCommand()
               .subscribe((data: any) => {
                 if( data == null){

                 }else{
                 this.films  = data.recommendation;
                 }
               });
               }
  goFilmPage(id : number) {
                      this.router.navigate(
                        ['/film/' + id]);
                    }
  getUserData(userId: number){

        this.api.getCommand(userId)
            .subscribe((data: OtherUser) => {
              if( data == null){
                this.userprofile = {"userId":0, "birthday": "", "description":"", "email": "", "login": "", "logoUrl": "","registrationDate":"", "online" : false, "banned":false};
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
                                         console.log(this.friendsIn.includes(this.userId));
                                         if (this.friendsIn.includes(this.userId+"")){
//                                          console.log("data.all[d]");
                                              for(let d in data.all){
                                                if (data.all[d].userId==this.userId){
                                                  this.friendRequestId=data.all[d].friendRequestId;
                                                }
                                              }
                                         }
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
            acceptFriend(){
                                this.api4.postCommand(this.localStorageService.getItem("userId"), this.friendRequestId)
                                                                     .subscribe((data: any) => {
                                                                         if( data == null){

                                                                          }else{
                                                                                }
                                                                          this.ngOnInit();
                                                                          });
                        }
            declineFriend(){
                                            this.api5.postCommand(this.localStorageService.getItem("userId"), this.friendRequestId)
                                                                                 .subscribe((data: any) => {
                                                                                     if( data == null){

                                                                                      }else{
                                                                                            }
                                                                                      this.ngOnInit();
                                                                                      });
                                    }
            deleteFriend(){
                                                        this.api6.postCommand(this.localStorageService.getItem("userId"), this.userId)
                                                                                             .subscribe((data: any) => {
                                                                                                 if( data == null){

                                                                                                  }else{
                                                                                                        }
                                                                                                  this.ngOnInit();
                                                                                                  });
                                                }
            deleteUser(){
              this.http.delete("https://mac21-portal-backend.herokuapp.com/api/v1/users/" + this.userId ).pipe(map(function (i: any) { return {
                                                                             info: i
                                                                             };})).subscribe((data: any) => {

                                                                                                    if( data == null){

                                                                                                    }else{
                                                                                          this.router.navigate(
                                                                                                ['/friends/' + this.localStorageService.getItem('userId')]);
                                                                                                    }
                                                                                                  });
            }
            ban(){
                                            this.api8.postCommand(this.userId)
                                                                                 .subscribe((data: any) => {
                                                                                     if( data == null){

                                                                                      }else{
                                                                                            }
                                                                                      this.ngOnInit();
                                                                                      });
                                    }
            unban(){
                                                        this.api9.postCommand(this.userId)
                                                                                             .subscribe((data: any) => {
                                                                                                 if( data == null){

                                                                                                  }else{
                                                                                                        }
                                                                                                  this.ngOnInit();
                                                                                                  });
                                                }
}
