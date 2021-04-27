import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from 'src/app/user';
import {Reg} from 'src/app/req/reg';
import {RegistrationData} from 'src/app/registrationData';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {MatDialog, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {LocalStorageService} from "src/app/local-storage-service";
import * as _moment from "moment";
const moment = _moment;
var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
export const ISO_FORMAT = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
                        {provide: MAT_DATE_FORMATS, useValue: ISO_FORMAT},],
})
export class RegistrationPageComponent implements OnInit {

user: User;
userData: RegistrationData;
hidePass = true;
constructor(private http: HttpClient, private api: Reg, public dialog: MatDialog, private activateRoute: ActivatedRoute, private router: Router,public localStorageService: LocalStorageService) {
  this.user = {"userId":0};
  this.userData = {"firstName": '', "lastName":'', "email":'', "password": ''};
}
noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
date = new FormControl(moment());

email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
login = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
passFirst = new FormControl('', [Validators.required, this.noWhitespaceValidator, Validators.pattern("^.{5,}$")]);
passSecond = new FormControl('', [Validators.required, this.noWhitespaceValidator, Validators.pattern("^.{5,}$")]);
getErrorMessageEmail() {
    if (this.email.hasError('required') || this.email.value.trim()=='') {
      return 'Поле обязательно для заполнения';
    }
    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  getErrorMessageLogin() {
      if (this.login.hasError('required') || this.login.value.trim()=='') {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }

getErrorMessagePassFirst() {
                   if (this.passFirst.hasError('required') || this.passFirst.value.trim()=='') {
                     return 'Поле обязательно для заполнения';
                   }
                   else if (this.passFirst.invalid){
                   return 'Пароль должен содержать не менее 5 символов';
                   }
                   return '';
                 }

getErrorMessagePassSecond() {
          if (this.passSecond.hasError('required') || this.passSecond.value.trim()=='') {
            return 'Поле обязательно для заполнения';
          }
          else if (this.passSecond.invalid){
                             return 'Пароль должен содержать не менее 5 символов';
                             }
          return '';
        }

  ngOnInit(): void {
  }

  goToProfile() {
        this.router.navigate(
          ['/user', this.user.userId]);
      }

  openDialog(){
    this.dialog.open(NotEq);
  }

  failRegistrationDialog(){
  this.dialog.open(FailRegistration);
  }


  sendUserData(){
  if (this.passSecond.value!=this.passFirst.value) {
                  this.openDialog();
                }

    if(this.passSecond.value==this.passFirst.value){
    this.api.postCommand(this.login.value.trim(), this.passFirst.value,this.email.value.trim(), this.date.value)
            .subscribe((data: HttpResponse<User>) => {

              if( data.body == null){
                this.user = {"userId":0};
              }else{
              this.user = data.body;
              }

              if (data.status == 200){
                this.localStorageService.setItem("userId",  this.user.userId+"");
                this.goToProfile();
              }
            },
            (err) => {this.failRegistrationDialog();}
            );
      }
    }

}


@Component({
  selector: 'notEquals',
  templateUrl: 'notEquals.html',
})
export class NotEq {
constructor(public dialogRef: MatDialogRef<NotEq>) {
  }
close(){
   this.dialogRef.close(true);
}
}


@Component({
  selector: 'failRegistration',
  templateUrl: 'failRegistration.html',
})
export class FailRegistration {
constructor(public dialogRef: MatDialogRef<FailRegistration>) {
  }
close(){
   this.dialogRef.close(true);
}
}
