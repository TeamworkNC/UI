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
export class CatalogGet {

  constructor(private http: HttpClient) {
  }

  getCommand(): Observable <CatalogInt> {

    return this.http.get(localUrl1 ).pipe(map(function (i: any) { return {
     films: i.films,
     filters: i.filters
     };}));
  }
}
