import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "src/app/user";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/public/auth/register';

@Injectable({
  providedIn: 'root'
})
export class Reg {

  constructor(private http: HttpClient) {
  }

  postCommand(login: string, password: string, email : string, date : string): Observable <HttpResponse<User>> {
  const body = {
        login: login,
        password : password,
        email : email,
        birthday : date
      };
    return this.http.post<User>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
