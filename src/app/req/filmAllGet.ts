import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilmAll} from "src/app/filmAll";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'http://localhost:8080/test1';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class FilmAllGet {

  constructor(private http: HttpClient) {
  }

  getCommand(filmId: number): Observable <FilmAll> {

    return this.http.get(localUrl1 + "/" + filmId ).pipe(map(function (i: any) { return {
     id: i.id,
     logo: i.logo,
     name : i.name,
     genre : i.genre,
     producer: i.producer,
     description: i.description,
     actors: i.actors ,
     rating : i.rating,
     ageRestrictions : i.ageRestrictions,
     trailerId : i.trailerId,
     imageObject : i.imageObject,
     reviews : i.reviews
     };}));
  }
}



