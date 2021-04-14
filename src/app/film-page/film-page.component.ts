import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Subject, Subscription} from 'rxjs';
import {FilmAll} from "src/app/filmAll";
import {ActivatedRoute, Router} from "@angular/router";
import {FilmAllGet} from "src/app/req/filmAllGet";

@Component({
  selector: 'ngbd-rating-events',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {

private subscription: Subscription;
  filmId: number;
  film : FilmAll;
  constructor(private activateRoute: ActivatedRoute, private api: FilmAllGet) {
  this.subscription = new Subscription();
  this.filmId = 0;
  this.film = {
             "id" : 0,
             "logo": "",
             "name" : "",
             "genre": "",
             "producer" : "",
             "actors" : "",
             "rating" : "",
             "ageRestrictions" : "",
             "description" : "",
             "trailerId" : '',
             "imageObject" : [{
                   "image": '',
                   "thumbImage": ''
               }],
               "reviews" : [{
                 "logo" : "",
                 "login": "",
                 "mark": 0,
                 "text": ""
               }
                 ]
             }
  }
  selected = 0;
  hovered = 0;

  readonly = false;
  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(params => {
            this.filmId = params['id'];
            this.getFilmData(this.filmId);
          });
  }

  getFilmData(filmId: number){

      this.api.getCommand(filmId)
          .subscribe((data: FilmAll) => {

            if( data == null){
              this.film;
            }else{
            this.film  = data;
            }
          });
    }

  playerOptions = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;

 mark = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
    textOtz = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

    getErrorMessageMark() {
      if (this.mark.hasError('required') || this.mark.value.trim() == '') {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }

    getErrorMessageText() {
        if (this.textOtz.hasError('required') || this.textOtz.value.trim() == '') {
          return 'Поле обязательно для заполнения';
        }
        return '';
      }

  formatLabel(value: number) {
      return value;
    }
}
