import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {User} from 'src/app/user';
import {Autor} from 'src/app/autor';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent implements OnInit {
  user: User;

  constructor(private http: HttpClient, private api: Autor) {
   this.user = {"userId":0};
   }

  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required]);
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Поле обязательно для заполнения';
    }
    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  getErrorMessagePass() {
      if (this.pass.hasError('required')) {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }

  ngOnInit(): void {
  }

  sendUserData(){

      this.api.postCommand("svdvsv","dcsds")
          .subscribe((data: HttpResponse<User>) => {
            if( data.body == null){
              this.user = {"userId":0};
            }else{
            this.user = data.body;
            }
          });
    }
}
