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
import {RecommendationGet} from 'src/app/req/recommendationGet';
import {SessionsGet} from 'src/app/req/sessionsGet';
import {map} from 'rxjs/operators';
import {NotificationService} from '../features/core/services/notification.service';
import {AcceptFriend} from "src/app/req/acceptFriend";
import {DeclineToFriend} from "src/app/req/declineToFriend";


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
displayedColumns: string[] = [ 'name', 'weight'];
displayedColumnsNotifications: string[] = [ 'text', 'notificationId'];
dataSource;
dataForNotifications;
@ViewChild('MatPaginator1') paginator: MatPaginator;
@ViewChild('MatPaginator2') paginatorRec: MatPaginator;
obs: Observable<any>;
dataSource3: MatTableDataSource<FilmMain>;
obsRec: Observable<any>;
dataSourceRec: MatTableDataSource<FilmMain>;
recFilms : any;

  constructor(private http: HttpClient,
              private _snackBar: MatSnackBar,
              private api: ProfileInfo,
              private api1: Reg,
              private activateRoute: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              public localStorageService: LocalStorageService,
              private api2: RecommendationGet,
              private api3: SessionsGet,
              private notificationService: NotificationService,
  ) {

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
        goOtherUserPage(otherUserId : number){
              if(otherUserId+""==this.localStorageService.getItem("userId")){
               this.router.navigate(
                    ['/user/' + this.localStorageService.getItem('userId')]);
              } else{
              this.router.navigate(
                                          ['/otheruser/'+ otherUserId]);
              }
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
              if(this.localStorageService.getItem("userId") == this.userId1+""){
                this.getUserData(this.userId1);
              } else{
              this.router.navigate(['/home'])
              }});
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
          .subscribe((data: any) => {

            if( data == null){
              this.userprofile = {"userId":0, "birthday": "", "description":"", "email": "", "login": "", "logoUrl": "","registrationDate":"", "favoriteFilms":[] };
            }else{
            this.userprofile = data;
            this.changeDetectorRef.detectChanges();
            this.dataSource3 =  new MatTableDataSource<any>(data.favoriteFilms);
            this.dataSource3.paginator = this.paginator;
            this.obs = this.dataSource3.connect();
            this.localStorageService.setItem("logoUrl", data.logoUrl);
            this.login.setValue(data.login);
            this.email.setValue(data.email);
            this.date.setValue(data.birthday);
            for(let i in data.globalRoles){
            if(data.globalRoles[i].name=="ADMIN"){
            console.log(data.globalRoles[i].name);
            this.localStorageService.setItem("admin", "1");
            break;
              }
             }
             if(!this.localStorageService.getItem("admin")){
             this.localStorageService.setItem("admin", "0");
             }
            }

          });
       this.api2.postCommand(userId)
                .subscribe((data: any) => {

                  if( data == null){

                  }else{
                  this.changeDetectorRef.detectChanges();
                  this.dataSourceRec =  new MatTableDataSource<any>(data.recommendationFilms);
                  this.recFilms=data.recommendationFilms;
                  this.dataSourceRec.paginator = this.paginatorRec;
                  this.obsRec = this.dataSourceRec.connect();
                  }
                });
       this.api3.getCommand(userId)
                       .subscribe((data: any) => {

                         if( data == null){

                         }else{
                            console.log(data);
                            this.dataSource= data.sessionsAll;
                            for( let i in this.dataSource){
                              this.http.get("https://mac21-portal-backend.herokuapp.com/api/v1/films/" + this.dataSource[i].name ).pipe(map(function (i: any) { return {
                                                               filmTitle: i.filmTitle
                                                               };})).subscribe((data: any) => {

                                                                                      if( data == null){

                                                                                      }else{
                                                                                      this.dataSource[i].name=data.filmTitle;
                                                                                      }
                                                                                    });
                            }

                         }
                       });
      this.http.get("https://mac21-portal-backend.herokuapp.com/api/v1/notifications?user_id=" + this.localStorageService.getItem("userId") ).pipe(map(function (i: any) { return {
                                                                     notifications: i
                                                                     };})).subscribe((data: any) => {

                                                                                            if( data == null){

                                                                                            }else{
                                                                                            this.dataForNotifications=data.notifications.reverse();
                                                                                            this.localStorageService.setItem("countOfNotifications", data.notifications.length);
                                                                                            }
                                                                                          });

    }
markAsRead(notificationId : number) {
  console.log(notificationId);
  this.notificationService.deleteNotification(notificationId).subscribe();

}
    goToRoom( roomId : number ){
      console.log(roomId);
      this.router.navigate(['/room/'+roomId]);
    }
    selectedFile: File;
    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
      }

    onUpload() {
      const fd = new FormData();
      fd.append('file', this.selectedFile);
      this.http.post('https://mac21-portal-backend.herokuapp.com/api/v1/users/' + this.localStorageService.getItem("userId") +  '/logo', fd).subscribe(() => {
        this.ngOnInit();
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
