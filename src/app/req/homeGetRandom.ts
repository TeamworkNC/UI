import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilmShort} from "src/app/filmShort";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/films/randomthreefilms';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class HomeGetRandom {

  constructor(private http: HttpClient) {
  }

  getCommand(): Observable <any> {

    return this.http.get(localUrl1 ).pipe(map(function (i: any) { return {
     slider  : i
     };}));
  }
}
