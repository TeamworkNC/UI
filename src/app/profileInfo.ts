import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from "src/app/userInfo";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/test1';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class ProfileInfo {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: number): Observable <HttpResponse<UserInfo>> {
  const body = {
        userId: userId
      };
    return this.http.post<UserInfo>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
