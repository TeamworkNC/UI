import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from 'src/app/user';
import {Autor} from 'src/app/req/autor';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LocalStorageService} from 'src/app/local-storage-service';
import {CurrentUserService} from '../features/core/services/current-user.service';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {
  user: any;
  hidePass = true;

  constructor(
    private http: HttpClient,
    private api: Autor,
    private activateRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public localStorageService: LocalStorageService,
    public currentUserService: CurrentUserService,
  ) {
    if(this.localStorageService.getItem("userId") ){
    this.router.navigate(
                  ['/user', this.localStorageService.getItem("userId")]);}
    else{
      this.user = {'userId': 0};
    }
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }

  login = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pass = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  getErrorMessageLogin() {
    if (this.login.hasError('required') || this.login.value.trim() == '') {
      return 'Поле обязательно для заполнения';
    }
    return this.login.hasError('login') ? 'Некорректный login' : '';
  }

  getErrorMessagePass() {
      if (this.pass.hasError('required') || this.pass.value.trim() == '') {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }

  ngOnInit(): void {
  if(this.localStorageService.getItem("userId") ){
      this.router.navigate(
                    ['/user', this.localStorageService.getItem("userId")]);}

  }

  goToProfile() {
      this.router.navigate(
        ['/user', this.user.userId]);
    }
   goToForgotPassPage() {
        this.router.navigate(
          ['/forgotpass']);
      }

    failRegistrationDialog(){
      this.dialog.open(FailLogin);
      }


  sendUserData(){

      this.api.postCommand( this.login.value.trim(), this.pass.value)
          .subscribe((data: HttpResponse<User>) => {
            if( data.body == null){
              this.user = {"userId":0};
            }else{
            this.user = data.body;
            }
            if (data.status == 200) {
              this.goToProfile();
              this.currentUserService.userId = this.user.userId;
              this.currentUserService.token = this.user.token; // not user
              console.log(data.headers.keys());
            }
          },

            (err) => {this.failRegistrationDialog();}
          );
    }
}

@Component({
  selector: 'failLogin',
  templateUrl: 'failLogin.html',
})
export class FailLogin {
constructor(public dialogRef: MatDialogRef<FailLogin>) {
  }
close(){
   this.dialogRef.close(true);
}
}
