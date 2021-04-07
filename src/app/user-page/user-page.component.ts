import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/user';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ProfileInfo} from 'src/app/req/profileInfo';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {Reg} from 'src/app/req/reg';
import {MatTableModule} from '@angular/material/table';
import {FilmMain} from 'src/app/filmMain';

const ELEMENT_DATA1: FilmMain[] = [
  {filmId: 1, filmName: 'Омерзительная восьмерка', filmRate: 7.2, filmImg: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/0bf728af-ce48-4c0e-9da3-f20ee81bc276/960x960', filmAge: 18},
  {filmId: 2, filmName: 'Земля кочевников', filmRate: 7.3, filmImg: 'http://kinohod.ru/o/c3/59/c359170a-76e0-11eb-941e-f50022a07b64.jfif', filmAge: 16},
  {filmId: 3, filmName: 'Мавританец', filmRate: 6.0, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1777765/d5ed4630-56b3-4a09-a4e4-9f76e105c56e/600x900', filmAge: 18},
  {filmId: 4, filmName: 'Любовное настроение', filmRate: 8.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1773646/b6161447-8412-4486-82e4-f2be8bd8d616/600x900', filmAge: 18},
  {filmId: 5, filmName: 'Паразиты', filmRate: 9.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1599028/bbe02758-fec4-498f-a128-347ad15dc76c/600x900', filmAge: 18},
  {filmId: 6, filmName: 'Нечто', filmRate: 7.4, filmImg: 'https://upload.wikimedia.org/wikipedia/ru/c/c0/The_thing.jpg', filmAge: 18},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
user: User;
userId1 : number;
private subscription: Subscription;
displayedColumns: string[] = ['position', 'name', 'weight'];
dataSource1 = ELEMENT_DATA1;
dataSource = ELEMENT_DATA;
  constructor(private http: HttpClient, private api: ProfileInfo, private api1: Reg, private activateRoute: ActivatedRoute,  public dialog: MatDialog,  private router: Router) {
    this.user = {"userId":0};
    this.subscription = new Subscription();
    this.userId1 = 0;
  }
  date = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
  login = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passFirst = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passSecond = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

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
                     return '';
                   }

  getErrorMessagePassSecond() {
            if (this.passSecond.hasError('required') || this.passSecond.value.trim()=='') {
              return 'Поле обязательно для заполнения';
            }
            return '';
          }

  ngOnInit(): void {
  this.subscription = this.activateRoute.params.subscribe(params => {
        this.userId1 = params['id'];
        this.getUserData(this.userId1);
      });

  }
openDialog(){
    this.dialog.open(NotEq);
  }

  failRegistrationDialog(){
    this.dialog.open(FailRegistration);
    }

  noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

sendUserData(){
  if (this.passSecond.value!=this.passFirst.value) {
                  this.openDialog();
                }

    if(this.passSecond.value==this.passFirst.value){
    this.api1.postCommand(this.login.value.trim(),this.email.value.trim(),this.passFirst.value, this.date.value)
            .subscribe((data: HttpResponse<User>) => {

              if( data.body == null){
                this.user = {"userId":0};
              }else{
              this.user = data.body;
              }

              if (data.status == 200){
                this.goToProfile();
              }
            },
            (err) => {this.failRegistrationDialog();}
            );
      }
    }

    goFilmPage() {
                        this.router.navigate(
                          ['/film']);
                      }

    goToProfile() {
            this.router.navigate(
              ['/user', this.user.userId]);
          }
  getUserData(userId: number){

      this.api.postCommand(userId)
          .subscribe((data: User) => {

            if( data == null){
              this.user = {"userId":0};
            }else{
            this.user = data;
            }
          });
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
