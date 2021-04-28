import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

var headers = new HttpHeaders({
                                  'Content-Type':  'application/json',
                                  'Set-Cookie': 'session=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYxOTQ2OTYxNiwiZXhwIjoxNjE5NDc5NjE2fQ.04HIvGCwKGfM3DAg4nRl3XEhIx-WP30mGymloZ6g79yfdiIhPmKDda8g7HHCmwzf; Max-Age=10000000; Expires=Fri, 20-Aug-2021 14:26:56 GMT; Path=/'
                                });
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class FavouritePost {

  constructor(private http: HttpClient) {
  }

  postCommand(filmId: number, userId: string): Observable <any>{
  const body = filmId;
    return this.http.post(localUrl1+userId+"/favorite-films", body, {
      observe: 'response', headers: headers
    });
  }
}
