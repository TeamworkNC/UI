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
noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
  pass = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  getErrorMessageEmail() {
    if (this.email.hasError('required') || this.email.value.trim() == '') {
      return 'Поле обязательно для заполнения';
    }
    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  getErrorMessagePass() {
      if (this.pass.hasError('required') || this.pass.value.trim() == '') {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }

  ngOnInit(): void {
  }

  sendUserData(){

      this.api.postCommand( this.email.value.trim(), this.pass.value)
          .subscribe((data: HttpResponse<User>) => {
            if( data.body == null){
              this.user = {"userId":0};
            }else{
            this.user = data.body;
            }
          });
    }
}
