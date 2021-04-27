import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserProfile} from "src/app/userprofile";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfo {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: number): Observable <UserProfile> {
    return this.http.get(localUrl1 + "/" + userId ).pipe(map(function (i: any) { return {
    userId: i.userId,
    name : i.login,
    birthday : i.birthday,
    logoUrl: i.logoUrl,
    description: i.description,
    registrationDate : i.registrationDate,
    email: i.email,
    login: i.login
    };}));
  }
}
