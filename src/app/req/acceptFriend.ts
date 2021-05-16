import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class AcceptFriend {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: string, friendRequestId: number): Observable <HttpResponse<any>> {

      return this.http.post<any>(localUrl1 + userId +"/friend_requests/" + friendRequestId + "/accept", {
        observe: 'response', headers: headers
      });
    }
}
