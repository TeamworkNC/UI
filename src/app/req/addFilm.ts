import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/films';

@Injectable({
  providedIn: 'root'
})
export class AddFilm {

  constructor(private http: HttpClient) {
  }

  postCommand(filmTitle: string, filmTrailer: string, description : string): Observable <HttpResponse<any>> {
  const body =
  {
    //idFilm: 0,
    filmTitle: "string",
    duration: null,
    releaseDate: null,
    filmPoster: null,
    filmTrailer: filmTrailer,
    filmVideo: null,
    filmBudget: null,
    description: description
  }
    return this.http.post<any>(localUrl1, body, {
      observe: 'response', headers: headers
    });
  }
}
