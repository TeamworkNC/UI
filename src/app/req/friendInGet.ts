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
export class FriendInGet {

  constructor(private http: HttpClient) {
  }

  getCommand(userId : string): Observable <any> {

    return this.http.get(localUrl1 + userId + "/friend_requests").pipe(map(function (i: any) {
    let arr = [];
    for(let u in i){
    arr.push(i[u].userId+"");
    }
    return {
     users: arr,
     all : i
     };}));
  }
}
