import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "src/app/user";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-user-management.herokuapp.com/api/v1/users/login';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class Autor {

  constructor(private http: HttpClient) {
  }

  postCommand(email: string, password: string): Observable <HttpResponse<User>> {
  const body = {
        name: email,
        password : password
      };
    return this.http.post<User>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
