import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class DeleteFriend {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: string, friendId: number): Observable <HttpResponse<any>> {

      return this.http.delete<any>(localUrl1 + userId +"/friends/" + friendId, {
        observe: 'response', headers: headers
      });
    }
}
