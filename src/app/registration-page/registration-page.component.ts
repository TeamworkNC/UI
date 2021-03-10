import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {User} from 'src/app/user';
import {Reg} from 'src/app/req/reg';
import {RegistrationData} from 'src/app/registrationData';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {MatDialog, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

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
constructor(private http: HttpClient, private api: Reg, public dialog: MatDialog, private activateRoute: ActivatedRoute, private router: Router) {
  this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
  this.userData = {"firstName": '', "lastName":'', "email":'', "password": ''};
}
noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
firstName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
lastName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
passFirst = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
passSecond = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
getErrorMessageEmail() {
    if (this.email.hasError('required') || this.email.value.trim()=='') {
      return 'Поле обязательно для заполнения';
    }
    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  getErrorMessageFirstName() {
      if (this.firstName.hasError('required') || this.firstName.value.trim()=='') {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }
    getErrorMessageLastName() {
          if (this.lastName.hasError('required') || this.lastName.value.trim()=='') {
            return 'Поле обязательно для заполнения';
          }
          return '';
        }
getErrorMessagePassFirst() {
                   if (this.passFirst.hasError('required') || this.passFirst.value.trim()=='') {
                     return 'Поле обязательно для заполнения';
                   }
                   return '';
                 }

getErrorMessagePassSecond() {
          if (this.passSecond.hasError('required') || this.passSecond.value.trim()=='') {
            return 'Поле обязательно для заполнения';
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

  sendUserData(){
  if (this.passSecond.value!=this.passFirst.value) {
                  this.openDialog();
                }

    if(this.passSecond.value==this.passFirst.value){
    this.api.postCommand(this.firstName.value.trim(),this.lastName.value.trim(),this.passFirst.value,this.email.value.trim())
            .subscribe((data: HttpResponse<User>) => {

              if( data.body == null){
                this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
              }else{
              this.user = data.body;
              }

              if (data.status == 200){
                this.goToProfile();
              }
            });
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
