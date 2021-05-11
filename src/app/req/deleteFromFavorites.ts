import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/users/';//поменять потом

@Injectable({
  providedIn: 'root'
})
export class DeleteFromFavorites {

  constructor(private http: HttpClient) {
  }

  deleteCommand(userId: number, filmId: string): Observable <any> {

    return this.http.delete(localUrl1 + filmId + "/favorite-films/" + userId).pipe(map(function (i: any) { return {
     data : i
     };}));
  }
}
