import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
