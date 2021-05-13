import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserProfile} from 'src/app/userprofile';
import {User} from 'src/app/user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProfileInfo} from 'src/app/req/profileInfo';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Reg} from 'src/app/req/reg';
import {MatTableDataSource} from '@angular/material/table';
import {FilmMain} from 'src/app/filmMain';
import {MatPaginator} from '@angular/material/paginator';
import {LocalStorageService} from 'src/app/local-storage-service';
import {MatSnackBar} from '@angular/material/snack-bar';

const ELEMENT_DATA1: FilmMain[] = [
  {filmId: 1, filmName: 'Омерзительная восьмерка', filmRate: 7.2, filmImg: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/0bf728af-ce48-4c0e-9da3-f20ee81bc276/960x960', filmAge: 18},
  {filmId: 2, filmName: 'Земля кочевников', filmRate: 7.3, filmImg: 'http://kinohod.ru/o/c3/59/c359170a-76e0-11eb-941e-f50022a07b64.jfif', filmAge: 16},
  {filmId: 3, filmName: 'Мавританец', filmRate: 6.0, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1777765/d5ed4630-56b3-4a09-a4e4-9f76e105c56e/600x900', filmAge: 18},
  {filmId: 4, filmName: 'Любовное настроение', filmRate: 8.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1773646/b6161447-8412-4486-82e4-f2be8bd8d616/600x900', filmAge: 18},
  {filmId: 5, filmName: 'Паразиты', filmRate: 9.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1599028/bbe02758-fec4-498f-a128-347ad15dc76c/600x900', filmAge: 18},
  {filmId: 6, filmName: 'Нечто', filmRate: 7.4, filmImg: 'https://upload.wikimedia.org/wikipedia/ru/c/c0/The_thing.jpg', filmAge: 18},
];

const ELEMENT_DATA2: FilmMain[] = [
  {filmId: 1, filmName: 'Омерзительная восьмерка', filmRate: 7.2, filmImg: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/0bf728af-ce48-4c0e-9da3-f20ee81bc276/960x960', filmAge: 18},
  {filmId: 2, filmName: 'Земля кочевников', filmRate: 7.3, filmImg: 'http://kinohod.ru/o/c3/59/c359170a-76e0-11eb-941e-f50022a07b64.jfif', filmAge: 16},
  {filmId: 3, filmName: 'Мавританец', filmRate: 6.0, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1777765/d5ed4630-56b3-4a09-a4e4-9f76e105c56e/600x900', filmAge: 18},
  {filmId: 4, filmName: 'Любовное настроение', filmRate: 8.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1773646/b6161447-8412-4486-82e4-f2be8bd8d616/600x900', filmAge: 18},
  {filmId: 5, filmName: 'Паразиты', filmRate: 9.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1599028/bbe02758-fec4-498f-a128-347ad15dc76c/600x900', filmAge: 18},
];

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: "ivan123", name: 'Омерзительная восьмерка', weight: 1},
  {position: "dima2", name: 'Helium', weight: 2},
];

const ELEMENT_DATA3: PeriodicElement[] = [
  {position: "ivan123", name: 'Пошли смотреть фильм "Омерзительная восьмерка"', weight: 1},
  {position: "dima2", name: 'Пошли смотреть фильм "Helium"', weight: 2},
];

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
userprofile: UserProfile;
user: User;
userId1 : number;
private subscription: Subscription;
displayedColumns: string[] = ['position', 'name', 'weight'];
dataSource1 = ELEMENT_DATA1;
dataSource2 = ELEMENT_DATA2;
dataSource = ELEMENT_DATA;
dataForNotifications = ELEMENT_DATA3;
@ViewChild('MatPaginator1') paginator: MatPaginator;
@ViewChild('MatPaginator2') paginatorRec: MatPaginator;
obs: Observable<any>;
dataSource3: MatTableDataSource<FilmMain>;
obsRec: Observable<any>;
dataSourceRec: MatTableDataSource<FilmMain> = new MatTableDataSource<FilmMain>(this.dataSource2);
  constructor(private http: HttpClient,private _snackBar: MatSnackBar, private api: ProfileInfo, private api1: Reg, private activateRoute: ActivatedRoute,  public dialog: MatDialog,  private router: Router, private changeDetectorRef: ChangeDetectorRef, public localStorageService: LocalStorageService) {

  }
  date = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
  login = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passFirst = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passSecond = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passOld = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

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
  getErrorMessagePassOld() {
              if (this.passOld.hasError('required') || this.passOld.value.trim()=='') {
                return 'Поле обязательно для заполнения';
              }
              return '';
            }
  durationInSeconds = 5;
  changePass(){

     if (this.passSecond.value!=this.passFirst.value) {
                      this.openDialog();
                    }

        if(this.passSecond.value==this.passFirst.value){
        let body = {
                oldPassword: this.passOld.value,
                newPassword : this.passFirst.value
              };
        this.http.put("https://mac21-portal-backend.herokuapp.com/api/v1/users/" + this.userId1 + "/password", body, {
                      observe: 'response'
                    }).subscribe((data: any) => {
                    this._snackBar.openFromComponent(ChangePass , {
                                                           duration: this.durationInSeconds * 1000,
                                                         });
                },
                (err) => {this.failRegistrationDialog();}
                );
          }
  }

  ngOnInit(): void {
      this.subscription = new Subscription();
        this.userId1 = 0;

        this.subscription = this.activateRoute.params.subscribe(params => {
                this.userId1 = params['id'];
                this.getUserData(this.userId1);
              });
        this.userprofile = {
                birthday: "",
                description: "",
                email: "",
                login: "",
                logoUrl: "",
                registrationDate : "",
                userId: this.userId1,
                favoriteFilms:[]
            }
  }
  ngOnDestroy() {
      if (this.dataSource3) {
        this.dataSource3.disconnect();
      }
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
    let body = {
      "login": this.login.value,
      "email": this.email.value,
      "birthday": this.date.value
    };
    this.http.put("https://mac21-portal-backend.herokuapp.com/api/v1/users/" + this.userId1, body, {
                          observe: 'response'
                        }).subscribe((data: HttpResponse<any>) => {
                        console.log(data.status);
              if (data.status == 200){
              this._snackBar.openFromComponent(ChangeData, {
                                                                         duration: this.durationInSeconds * 1000,
                                                                       });
                this.ngOnInit();
              }
            },
            (err) => {this.failRegistrationDialog();}
            );
    }

    goFilmPage(filmId: number) {
                        this.router.navigate(
                          ['/film/'+ filmId]);
                      }

    goToProfile() {
            this.router.navigate(
              ['/user', this.userId1]);
          }
  getUserData(userId: number){

      this.api.postCommand(userId)
          .subscribe((data: UserProfile) => {

            if( data == null){
              this.userprofile = {"userId":0, "birthday": "", "description":"", "email": "", "login": "", "logoUrl": "","registrationDate":"", "favoriteFilms":[] };
            }else{
            this.userprofile = data;
            this.changeDetectorRef.detectChanges();
            this.dataSource3 =  new MatTableDataSource<any>(data.favoriteFilms);
            this.dataSource3.paginator = this.paginator;
            this.obs = this.dataSource3.connect();
            this.dataSourceRec.paginator = this.paginatorRec;
            this.obsRec = this.dataSourceRec.connect();
            this.localStorageService.setItem("logoUrl", data.logoUrl);
            this.login.setValue(data.login);
            this.email.setValue(data.email);
            this.date.setValue(data.birthday);
            }
          });
    }

    goToRoom( roomId : number ){
      console.log(roomId);
    }
    selectedFile: File;
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
      }

    onUpload() {
      const fd = new FormData();
      fd.append('file', this.selectedFile);
      this.http.post('https://mac21-portal-backend.herokuapp.com/api/v1/users/1/logo', fd).subscribe(() => {
        // TODO reload page
      });
    }

    hidePass = false;

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
  selector: 'failChangeInfo',
  templateUrl: 'failChangeInfo.html',
})
export class FailRegistration {
constructor(public dialogRef: MatDialogRef<FailRegistration>) {
  }
close(){
   this.dialogRef.close(true);
}
}

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar-component.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class ChangePass {
}

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-userdata-change.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class ChangeData {
}
