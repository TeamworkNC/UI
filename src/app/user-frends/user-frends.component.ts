import { Component, OnInit,ViewChild, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { OtherUserGet } from 'src/app/req/otherUserGet';
import { OtherUser, OtherUserArray } from 'src/app/other-user';
import {Observable} from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {UserFriendsGet} from 'src/app/req/userFriendsGet';
import {LocalStorageService} from "src/app/local-storage-service";

@Component({
  selector: 'app-user-frends',
  templateUrl: './user-frends.component.html',
  styleUrls: ['./user-frends.component.scss']
})
export class UserFrendsComponent implements OnInit {
@ViewChild(MatPaginator) paginator: MatPaginator;
obs: Observable<any>;
users: OtherUserArray;
friends: OtherUserArray;
dataSource: MatTableDataSource<OtherUser>;
  constructor(private api: OtherUserGet, private api1: UserFriendsGet, private changeDetector: ChangeDetectorRef , public router: Router, public localStorageService: LocalStorageService) {
    this.getOtherUserData();
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
                                this.friends = data.friends;
                                }
                              });
           }

  goOtherUserPage(otherUserId : number){
                        this.router.navigate(
                            ['/otheruser/'+ otherUserId]);
        }

}
