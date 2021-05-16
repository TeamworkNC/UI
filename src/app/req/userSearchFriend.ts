import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {OtherUser, OtherUserArray} from "src/app/other-user";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/se/searchUser?search=';

@Injectable({
  providedIn: 'root'
})
export class UserSearchFriend {

  constructor(private http: HttpClient) {
  }

  postCommand(search: string): Observable <OtherUserArray>{

    return this.http.post<any>(localUrl1+search, {
      observe: 'response', headers: headers
    }).pipe(map(function (i: any) { return {
            users: i
          };}));;
  }
}
