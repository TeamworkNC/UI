import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilmAll} from "src/app/filmAll";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
headers.append('Set-Cookie', 'session=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYxOTQ2OTYxNiwiZXhwIjoxNjE5NDc5NjE2fQ.04HIvGCwKGfM3DAg4nRl3XEhIx-WP30mGymloZ6g79yfdiIhPmKDda8g7HHCmwzf; Max-Age=10000000; Expires=Fri, 20-Aug-2021 14:26:56 GMT; Path=/');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/films/full/%7BfilmId%7D?filmId=';//поменять потом
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Set-Cookie': 'session=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYxOTQ2OTYxNiwiZXhwIjoxNjE5NDc5NjE2fQ.04HIvGCwKGfM3DAg4nRl3XEhIx-WP30mGymloZ6g79yfdiIhPmKDda8g7HHCmwzf; Max-Age=10000000; Expires=Fri, 20-Aug-2021 14:26:56 GMT; Path=/'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FilmAllGet {

  constructor(private http: HttpClient) {
  }

  getCommand(filmId: number): Observable <FilmAll> {

    return this.http.get(localUrl1 + filmId , httpOptions ).pipe(map(function (i: any) { return {
     id: i.id_film,
     logo: i.film_poster,
     name : i.film_title,
     genre : i.genres,
     producer: i.producers,
     description: i.description,
     actors: i.actors ,
     rating : i.rating,
     ageRestrictions : i.ageLimit.title,
     trailerId : i.film_trailer,
     imageObject : i.screenshots,
     reviews : i.reviews
     };}));
  }
}



