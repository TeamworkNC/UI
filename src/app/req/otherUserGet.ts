import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OtherUser, OtherUserArray} from "src/app/other-user";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class OtherUserGet {

  constructor(private http: HttpClient) {
  }

  getCommand(): Observable <OtherUserArray> {
    return this.http.get(localUrl1).pipe(map(function (i: any) { return {
      users: i
    };}));
  }
}
