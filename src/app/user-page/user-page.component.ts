import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/user';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ProfileInfo} from 'src/app/req/profileInfo';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
user: User;
userId1 : number;
private subscription: Subscription;

  constructor(private http: HttpClient, private api: ProfileInfo, private activateRoute: ActivatedRoute, private router: Router) {
    this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
    this.subscription = new Subscription();
    this.userId1 = 0;
  }

  ngOnInit(): void {
  this.subscription = this.activateRoute.params.subscribe(params => {
        this.userId1 = params['id'];
        this.getUserData(this.userId1);
      });

  }

  getUserData(userId: number){

      this.api.postCommand(userId)
          .subscribe((data: User) => {

            if( data == null){
              this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
            }else{
            this.user = data;
            }
          });
    }
}
