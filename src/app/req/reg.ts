import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "src/app/user";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/test';

@Injectable({
  providedIn: 'root'
})
export class Reg {

  constructor(private http: HttpClient) {
  }

  postCommand(firstName: string, lastName: string, password: string, email : string): Observable <HttpResponse<User>> {
  const body = {
        firstName: firstName,
        lastName: lastName,
        password : password,
        email : email
      };
    return this.http.post<User>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
