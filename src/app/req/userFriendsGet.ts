import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class UserFriendsGet {

  constructor(private http: HttpClient) {
  }

  getCommand(userId : string): Observable <any> {

    return this.http.get(localUrl1 + userId + "/friends").pipe(map(function (i: any) { return {
     friends: i
     };}));
  }
}
