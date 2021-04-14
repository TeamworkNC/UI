import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HomeInt} from "src/app/homeInt";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'http://localhost:8080/home';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class HomeGet {

  constructor(private http: HttpClient) {
  }

  getCommand(): Observable <HomeInt> {

    return this.http.get(localUrl1 ).pipe(map(function (i: any) { return {
     novelty: i.novelty,
     recommendation: i.recommendation,
     slider : i.slider
     };}));
  }
}
