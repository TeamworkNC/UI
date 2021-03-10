import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "src/app/user";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/test';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class ProfileInfo {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: number): Observable <User> {

    return this.http.get(localUrl1 + "/" + userId ).pipe(map(function (i: any) { return { userId: i.userId,
    name : i.name, birthday : i.birthday, logoUrl: i.logoUrl, description: i.description,  registrationDate : i.registrationDate};}));
  }
}
