import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from 'src/app/user';
import {Reg} from 'src/app/reg';
import {RegistrationData} from 'src/app/registrationData';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

user: User;
userData: RegistrationData;
constructor(private http: HttpClient, private api: Reg) {
  this.user = {"userId":0};
  this.userData = {"firstName": '', "lastName":'', "email":'', "password": ''};
}
email = new FormControl('', [Validators.required, Validators.email]);
firstName = new FormControl('', [Validators.required]);
lastName = new FormControl('', [Validators.required]);
passFirst = new FormControl('', [Validators.required]);
passSecond = new FormControl('', [Validators.required]);
getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Поле обязательно для заполнения';
    }
    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  getErrorMessageFirstName() {
      if (this.firstName.hasError('required')) {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }
    getErrorMessageLastName() {
          if (this.lastName.hasError('required')) {
            return 'Поле обязательно для заполнения';
          }
          return '';
        }
getErrorMessagePassFirst() {
                   if (this.passFirst.hasError('required')) {
                     return 'Поле обязательно для заполнения';
                   }
                   return '';
                 }

getErrorMessagePassSecond() {
          if (this.passSecond.hasError('required')) {
            return 'Поле обязательно для заполнения';
          }
          return '';
        }

  ngOnInit(): void {
  }

  sendUserData(){

    this.api.postCommand("svdvsv","dcsds","sdcsds","sdcsds")
        .subscribe((data: HttpResponse<User>) => {

          if( data.body == null){
            this.user = {"userId":0};
          }else{
          this.user = data.body;
          }
        });
  }
}
