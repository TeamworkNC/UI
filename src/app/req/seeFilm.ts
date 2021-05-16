import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/sessions';

@Injectable({
  providedIn: 'root'
})
export class SeeFilm {

  constructor(private http: HttpClient) {
  }

  postCommand(filmID: number, organizerID: number): Observable <HttpResponse<any>> {
  const body = {
        filmID: filmID,
        organizerID : organizerID
      };
    return this.http.post<any>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
