import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenreInt} from "src/app/genreInt";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/genres';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class GenresGet {

  constructor(private http: HttpClient) {
  }

  getCommand(): Observable <any> {

    return this.http.get(localUrl1 ).pipe(map(function (i: any) { return {
     genres  : i
     };}));
  }
}
