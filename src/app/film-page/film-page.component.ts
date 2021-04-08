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

film1 = {
id : 5,
logo: "http://avatars.mds.yandex.net/get-kinopoisk-image/4303601/880fabac-7893-4a4e-a11c-966de84b1e9d/600x900",
name : "Земля кочевников",
genre: "Драмма",
producer : "Хлои Чжао",
actors: "Фрэнсис МакДорманд, Дэвид Стрэтэйрн, Линда Мэй , Шарлин Свэнки , Боб Уэллс",
rating: "7.0",
ageRestrictions : "18",
description : "Ферн (Фрэнсис МакДорманд) остается без работы и без дома, когда во время экономического кризиса закрывается единственная фабрика в её небольшом городке. Единственный выход для Ферн - погрузить свой небогатый скарб в фургон и стать одной из племени современных кочевников, путешествующих от штата к штату в поисках сезонного заработка. В фильме снялись настоящие кочевники – Линда Мэй, Шарлин Свэнки и Боб Уэллс, которые стали для Ферн наставниками и товарищами в бесконечном путешествии по просторам США.",
trailerId : 'D0lJAv9WCSA',
imageObject : [{
      image: 'https://api.kinoart.ru/storage/post/1999/regular_detail_picture-0b858bb02ffe94a7227e9c629278b35b.jpg',
      thumbImage: 'https://api.kinoart.ru/storage/post/1999/regular_detail_picture-0b858bb02ffe94a7227e9c629278b35b.jpg'
  }, {
      image: 'https://resizer.mail.ru/p/41ad0fd6-c0e3-54c6-9e2a-117c5ad1f042/AAACCLtzTj_WCGjzL5mCWwtjY04A8VXuZwXzy4Wprib0spKiMzXMFO1uVd9IRTZlkfhcss5JK8-v0k2ZwV0jcaCfRg8.jpg',
      thumbImage: 'https://resizer.mail.ru/p/41ad0fd6-c0e3-54c6-9e2a-117c5ad1f042/AAACCLtzTj_WCGjzL5mCWwtjY04A8VXuZwXzy4Wprib0spKiMzXMFO1uVd9IRTZlkfhcss5JK8-v0k2ZwV0jcaCfRg8.jpg'
  }, {
      image: 'https://resizer.mail.ru/p/41650291-02e9-5555-bf84-1299a08b12d2/AAACLwISyjIIPihnQlD9b_xXTD5dGUdZALQkO7F05aO4irflj7PJGFU5xau0pq50-kFQBAjd_3g2BIMTXBHwg3GbiO0.jpg',
      thumbImage: 'https://resizer.mail.ru/p/41650291-02e9-5555-bf84-1299a08b12d2/AAACLwISyjIIPihnQlD9b_xXTD5dGUdZALQkO7F05aO4irflj7PJGFU5xau0pq50-kFQBAjd_3g2BIMTXBHwg3GbiO0.jpg',
  },{
      image: 'https://resizer.mail.ru/p/7882b045-fd10-5ea5-aba6-417a3cbc245e/AAACeMJnasi5ltGZm2yVR57LFMy8MtirIn6mJSCVLBAdMrfLEE2g6I2K1dHEOUmLa_1AtxvDUDoP7xRNUHDborMcgow.jpg',
      thumbImage: 'https://resizer.mail.ru/p/7882b045-fd10-5ea5-aba6-417a3cbc245e/AAACeMJnasi5ltGZm2yVR57LFMy8MtirIn6mJSCVLBAdMrfLEE2g6I2K1dHEOUmLa_1AtxvDUDoP7xRNUHDborMcgow.jpg',
  }, {
      image: 'https://resizer.mail.ru/p/3ce77a16-15de-5885-abfd-2d3da5a30bf8/AAACBbm3gNtv4nLllFzetiPDys44XxDcrrguV4TSdd1ytMewutL74nUsu7ayEw3536CFTdfxgknm98ft_BNhvvlpCPA.jpg',
      thumbImage: 'https://resizer.mail.ru/p/3ce77a16-15de-5885-abfd-2d3da5a30bf8/AAACBbm3gNtv4nLllFzetiPDys44XxDcrrguV4TSdd1ytMewutL74nUsu7ayEw3536CFTdfxgknm98ft_BNhvvlpCPA.jpg'
  }],
  reviews : [{
    logo : "https://lh3.googleusercontent.com/proxy/YyY1kU2iJNAeohPgn7sYDUNG78DFvWLY-rBAPpbxcuyjuZAQDHggTyTwtkqt-JewDY71L1C-9w",
    login: "Test",
    mark: 10,
    text: ` Test`
  },
  {
      logo : "https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/678x380",
      login: "Shiba Inu1",
      mark: 3,
      text: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`
    }
    ]
}
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
