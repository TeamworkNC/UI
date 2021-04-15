import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatalogInt} from "src/app/catalogInt";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'http://localhost:8080/catalog';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class UserSearchFilm {

  constructor(private http: HttpClient) {
  }

  postCommand(filters: string[], search : string): Observable <CatalogInt> {

  const body = {
          filters: filters,
          search : search
        };

    return this.http.post(localUrl1, body, {
                                         observe: 'response', headers: headers
                                       } ).pipe(map(function (i: any) {
                                       return {
                                               films: i.body.films,
                                               filters: i.body.filters
                                               };}));
  }
}
