import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserProfile} from "src/app/userprofile";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/recommendations/film?userId=';

@Injectable({
  providedIn: 'root'
})
export class RecommendationGet {

  constructor(private http: HttpClient) {
  }

  postCommand(userId: number): Observable <any> {
    return this.http.get(localUrl1 + userId ).pipe(map(function (i: any) { return {
    recommendationFilms : i
    };}));
  }
}
