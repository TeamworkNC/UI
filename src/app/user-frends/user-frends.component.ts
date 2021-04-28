import { Component, OnInit,ViewChild, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { OtherUserGet } from 'src/app/req/otherUserGet';
import { OtherUser, OtherUserArray } from 'src/app/other-user';
import {Observable} from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-frends',
  templateUrl: './user-frends.component.html',
  styleUrls: ['./user-frends.component.scss']
})
export class UserFrendsComponent implements OnInit {
@ViewChild(MatPaginator) paginator: MatPaginator;
obs: Observable<any>;
users: OtherUserArray;
dataSource: MatTableDataSource<OtherUser>;
  constructor(private api: OtherUserGet, private changeDetector: ChangeDetectorRef , public router: Router) {
    this.getOtherUserData();
  }

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  getOtherUserData(){
             this.api.getCommand()
                 .subscribe((data: OtherUserArray) => {
                   if( data == null){
                     this.users;
                   }else{
                   this.users = data;
                   console.log(this.users);
                   this.dataSource= new MatTableDataSource<OtherUser>(this.users.users);
                   this.dataSource.paginator = this.paginator;
                   this.obs = this.dataSource.connect();
                   }
                 });
           }

  goOtherUserPage(otherUserId : number){
                        this.router.navigate(
                            ['/otheruser/'+ otherUserId]);
        }

}
