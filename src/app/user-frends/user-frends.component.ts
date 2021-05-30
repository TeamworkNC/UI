import { Component, OnInit,ViewChild, ChangeDetectorRef,OnDestroy , Input} from '@angular/core';
import { OtherUserGet } from 'src/app/req/otherUserGet';
import { OtherUser, OtherUserArray } from 'src/app/other-user';
import {Observable} from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {UserFriendsGet} from 'src/app/req/userFriendsGet';
import {LocalStorageService} from "src/app/local-storage-service";
import {FriendInGet} from "src/app/req/friendInGet";
import {UserSearchFriend} from "src/app/req/userSearchFriend";

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
friendsInAll: any[];
dataSource: MatTableDataSource<OtherUser>;
dataSourceFriends: MatTableDataSource<OtherUser>;
dataSourceFriendsIn: MatTableDataSource<OtherUser>;
@Input() userIn: string;
  constructor(private api: OtherUserGet, private api1: UserFriendsGet, private api2: FriendInGet, private api3: UserSearchFriend, private changeDetector: ChangeDetectorRef , public router: Router, public localStorageService: LocalStorageService) {
    this.getOtherUserData();
    this.friendsInAll = [];
  }

  ngOnInit(): void {
      if(this.localStorageService.getItem("userId")){
            this.getOtherUserData();
            this.changeDetector.detectChanges();
      } else{
          this.router.navigate(['/home']);
      }
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
                   this.api2.getCommand(this.localStorageService.getItem("userId"))
                                                              .subscribe((data: any) => {
                                                                if( data == null){
                                                                  this.friendsIn;
                                                                }else{
                                                                this.friendsIn = data.users;
                                                                for(let u in this.friendsIn){

                                                                   for(let o in this.users.users){
                                                                       if (this.users.users[o].userId==this.friendsIn[u] && this.friendsInAll.filter(e => e.userId === this.users.users[o].userId).length ==0){
                                                                       this.friendsInAll.push(this.users.users[o]);
                                                                       }
                                                                   }
                                                                }
                                                                   this.dataSourceFriendsIn= new MatTableDataSource<OtherUser>(this.friendsInAll);
                                                                   this.dataSourceFriendsIn.paginator = this.paginatorFriendsIn;
                                                                   this.obsFriendsIn = this.dataSourceFriendsIn.connect();

                                                                }
                                                              });
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

           }

  goOtherUserPage(otherUserId : number){
        if(otherUserId+""==this.localStorageService.getItem("userId")){
         this.router.navigate(
              ['/user/' + this.localStorageService.getItem('userId')]);
        } else{
        this.router.navigate(
                                    ['/otheruser/'+ otherUserId]);
        }
        }

        searchFriend(){
          this.api3.postCommand(this.userIn)
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
        }

        resetSearch(){
        this.getOtherUserData();
        this.userIn = '';
        }

}
