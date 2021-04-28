import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OtherUser} from "src/app/other-user";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class PeopleGet {

  constructor(private http: HttpClient) {
  }

  getCommand(userId: number): Observable <OtherUser> {
    return this.http.get(localUrl1+userId).pipe(map(function (i: any) { return {
          userId : i.userId,
          login: i.login,
          email: i.email,
          birthday: i.birthday,
          logoUrl: i.logoUrl,
          description: i.description,
          registrationDate: i.registrationDate
    };}));
  }
}
