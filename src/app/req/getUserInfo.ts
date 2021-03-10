import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course} from './course';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {User} from "src/app/user";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'http://localhost:8080/cmview';

@Injectable({
  providedIn: 'root'
})
export class GetInstruction1 {

  constructor(private http: HttpClient) {
  }

  getInst(userId: number): Observable<User> {

    return this.http.get(localUrl1 + "/" + userId ).pipe(map(function (user: any) {
      return { user : user};
    }));
  }
}
