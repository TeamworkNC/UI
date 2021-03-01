import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
