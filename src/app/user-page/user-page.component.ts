import { Component, OnInit } from '@angular/core';
import {UserInfo} from 'src/app/userInfo';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ProfileInfo} from 'src/app/profileInfo';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
userInfo: UserInfo;

  constructor(private http: HttpClient, private api: ProfileInfo) {
    this.userInfo = {"userName":''};
  }

  ngOnInit(): void {
  }

  getUserData(){

      this.api.postCommand(123)
          .subscribe((data: HttpResponse<UserInfo>) => {

            if( data.body == null){
              this.userInfo = {"userName":""};
            }else{
            this.userInfo = data.body;
            }
          });
    }
}
