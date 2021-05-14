import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/friend_requests';

@Injectable({
  providedIn: 'root'
})
export class AddToFriend {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: string, recipientId: string): Observable <HttpResponse<any>> {
  const body = {
        userId: userId,
        recipientId : recipientId
      };
    return this.http.post<any>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
