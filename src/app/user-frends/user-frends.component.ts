import { Component, OnInit,ViewChild, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { OtherUserGet } from 'src/app/req/otherUserGet';
import { OtherUser, OtherUserArray } from 'src/app/other-user';
import {Observable} from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {UserFriendsGet} from 'src/app/req/userFriendsGet';
import {LocalStorageService} from "src/app/local-storage-service";
import {FriendInGet} from "src/app/req/friendInGet";

@Component({
  selector: 'app-user-frends',
  templateUrl: './user-frends.component.html',
  styleUrls: ['./user-frends.component.scss']
})
export class UserFrendsComponent implements OnInit {
@ViewChild('MatPaginator2') paginator: MatPaginator;
@ViewChild('MatPaginator1') paginatorFriends: MatPaginator;
@ViewChild('MatPaginator3') paginatorFriendsIn: MatPaginator;
obs: Observable<any>;
obsFriends: Observable<any>;
obsFriendsIn: Observable<any>;
users: OtherUserArray;
friends: OtherUserArray;
friendsIn: [];
friendsInAll: OtherUser[];
dataSource: MatTableDataSource<OtherUser>;
dataSourceFriends: MatTableDataSource<OtherUser>;
dataSourceFriendsIn: MatTableDataSource<OtherUser>;
  constructor(private api: OtherUserGet, private api1: UserFriendsGet, private api2: FriendInGet, private changeDetector: ChangeDetectorRef , public router: Router, public localStorageService: LocalStorageService) {
    this.getOtherUserData();
    this.friendsInAll = [];
  }

  ngOnInit(): void {
      this.getOtherUserData();
      this.changeDetector.detectChanges();
  }

  getOtherUserData(){
             this.api.getCommand()
                 .subscribe((data: OtherUserArray) => {
                   if( data == null){
                     this.users;
                   }else{
                   this.users = data;
                   this.dataSource= new MatTableDataSource<OtherUser>(this.users.users);
                   this.dataSource.paginator = this.paginator;
                   this.obs = this.dataSource.connect();
                   }
                 });

             this.api1.getCommand(this.localStorageService.getItem("userId"))
                              .subscribe((data: any) => {
                                if( data == null){
                                  this.friends;
                                }else{
                                this.friends = data;
                                this.dataSourceFriends= new MatTableDataSource<OtherUser>(this.friends.users);
                                this.dataSourceFriends.paginator = this.paginatorFriends;
                                this.obsFriends = this.dataSourceFriends.connect();
                                }
                              });
             this.api2.getCommand(this.localStorageService.getItem("userId"))
                                           .subscribe((data: any) => {
                                             if( data == null){
                                               this.friendsIn;
                                             }else{
                                             this.friendsIn = data.users;
                                             for(let u in this.friendsIn){

                                                for(let o in this.users.users){
                                                    if (this.users.users[o].userId==this.friendsIn[u]){
                                                    this.friendsInAll.push(new OtherUser(this.users.users[o].userId, this.users.users[o].login, this.users.users[o].email, this.users.users[o].birthday, this.users.users[o].logoUrl, this.users.users[o].description, this.users.users[o].registrationDate));
                                                    }
                                                }
                                             }
                                             //console.log(this.friendsInAll);
                                                this.dataSourceFriendsIn= new MatTableDataSource<OtherUser>(this.friendsInAll);
                                                this.dataSourceFriends.paginator = this.paginatorFriendsIn;
                                                this.obsFriendsIn = this.dataSourceFriendsIn.connect();
                                             }
                                           });
           }

  goOtherUserPage(otherUserId : number){
                        this.router.navigate(
                            ['/otheruser/'+ otherUserId]);
        }

}
