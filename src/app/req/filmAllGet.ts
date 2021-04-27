import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilmAll} from "src/app/filmAll";
import {map} from "rxjs/operators";

var headers = new HttpHeaders();
headers.append('Content-Type', 'application/json; charset=utf-8');
headers.append('Set-Cookie', 'session=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYxOTQ2OTYxNiwiZXhwIjoxNjE5NDc5NjE2fQ.04HIvGCwKGfM3DAg4nRl3XEhIx-WP30mGymloZ6g79yfdiIhPmKDda8g7HHCmwzf; Max-Age=10000000; Expires=Fri, 20-Aug-2021 14:26:56 GMT; Path=/');
const localUrl1 = 'https://mac21-portal-backend.herokuapp.com/api/v1/films/full/%7BfilmId%7D?filmId=';//поменять потом
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Set-Cookie': 'session=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYxOTQ2OTYxNiwiZXhwIjoxNjE5NDc5NjE2fQ.04HIvGCwKGfM3DAg4nRl3XEhIx-WP30mGymloZ6g79yfdiIhPmKDda8g7HHCmwzf; Max-Age=10000000; Expires=Fri, 20-Aug-2021 14:26:56 GMT; Path=/'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FilmAllGet {

  constructor(private http: HttpClient) {
  }

  getCommand(filmId: number): Observable <FilmAll> {

    return this.http.get(localUrl1 + filmId , httpOptions ).pipe(map(function (i: any) {
    let producers = "";
    for (let pr in i.producers){
     producers = producers + i.producers[pr].staff_first_name + " " + i.producers[pr].staff_last_name + ", ";
    }
    let genre = "";
    for (let gr in i.genres){
     genre = genre + i.genres[gr].genre_title + ", ";
    }
    let actors = "";
    for (let ac in i.actors){
         actors = actors + i.actors[ac].staff_first_name + " " + i.actors[ac].staff_last_name+ ", ";
        }
    let rating = i.rating+"";
    let carusel = [];
    for (let o in i.screenshots){
    let imageObject = {"image":"", "thumbImage":""};
    imageObject.image = i.screenshots[o].screenshot;
    imageObject.thumbImage = i.screenshots[o].screenshot;
    carusel.push(imageObject);
    }

   let reviews = [];
   for(let r in i.reviews){
      let reviewObject = {"mark": 0, "text": "" };
      reviewObject.mark =i.reviews[r].rating_film;
      reviewObject.text =i.reviews[r].review;
      reviews.push(reviewObject);
   }
   console.log(reviews);

    return {
     id: i.id_film,
     logo: i.film_poster,
     name : i.film_title,
     genre : genre[0].toUpperCase() + genre.slice(1).substr(0, genre.length - 3),
     producer: producers.substr(0, producers.length - 2),
     description: i.description,
     actors: actors.substr(0, actors.length - 2),
     rating : rating.substr(0,4),
     ageRestrictions : i.ageLimit.title,
     trailerId : i.film_trailer,
     imageObject : carusel,
     reviews : reviews
     };}));
  }
}



