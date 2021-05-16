import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatalogInt} from "src/app/catalogInt";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/se/searchFilm?search=';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class UserSearchFilm {

  constructor(private http: HttpClient) {
  }

  postCommand(idgenres: number[], search : string, idages: number[]): Observable <any> {

  let genres = [];
  let ages = [];
  if(idgenres){
    genres = idgenres;
  }
  if(idages){
      genres = idages;
    }
  const body = {
          idgenres: genres,
          idproducers: [],
          idages: ages
        };

    return this.http.post(localUrl1+search, body, {
                                         observe: 'response', headers: headers
                                       } ).pipe(map(function (i: any) {
                                       return {
                                               films: i.body
                                               };}));
  }
}
