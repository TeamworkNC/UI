import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {LocalStorageService} from 'src/app/local-storage-service';

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/sessions';

@Injectable({
  providedIn: 'root'
})
export class SessionsGet {

  constructor(private http: HttpClient, public localStorageService: LocalStorageService,) {
  }
   getCommandFilm(filmId: number): Observable <any> {

        return this.http.get("https://mac21-portal-backend.herokuapp.com/api/v1/films/" + filmId).pipe(map(function (i: any) { return {
         title: i.filmTitle
         };}));
      }

  getCommand(userId): Observable <any> {

    return this.http.get(localUrl1).pipe(map(function (i: any) {
    let sessions = [];
    let films = [];
    let sessionsAll = [];
        for(let s in i){
        let title ="";
        if((i[s].organizerID+"") == (userId+"")){
          sessions.push(i[s].sessionID);
          films.push(i[s].filmID);
          sessionsAll.push({"name": i[s].filmID, "session": i[s].sessionID});
        }
        }
    return {
     films : films,
     sessions: sessions,
     sessionsAll: sessionsAll
     };}));
  }
}
