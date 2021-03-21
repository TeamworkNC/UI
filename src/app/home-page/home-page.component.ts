import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FilmMain} from 'src/app/filmMain';

const ELEMENT_DATA: FilmMain[] = [
  {filmId: 1, filmName: 'Омерзительная восьмерка', filmRate: 7.2, filmImg: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/0bf728af-ce48-4c0e-9da3-f20ee81bc276/960x960', filmAge: 18},
  {filmId: 2, filmName: 'Земля кочевников', filmRate: 7.3, filmImg: 'http://kinohod.ru/o/c3/59/c359170a-76e0-11eb-941e-f50022a07b64.jfif', filmAge: 16},
  {filmId: 3, filmName: 'Мавританец', filmRate: 6.0, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1777765/d5ed4630-56b3-4a09-a4e4-9f76e105c56e/600x900', filmAge: 18},
  {filmId: 4, filmName: 'Любовное настроение', filmRate: 8.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1773646/b6161447-8412-4486-82e4-f2be8bd8d616/600x900', filmAge: 18},
  {filmId: 5, filmName: 'Паразиты', filmRate: 9.2, filmImg: 'http://avatars.mds.yandex.net/get-kinopoisk-image/1599028/bbe02758-fec4-498f-a128-347ad15dc76c/600x900', filmAge: 18},
  {filmId: 6, filmName: 'Нечто', filmRate: 7.4, filmImg: 'https://upload.wikimedia.org/wikipedia/ru/c/c0/The_thing.jpg', filmAge: 18},
];
const ELEMENT_DATA1: FilmMain[] = [
  {filmId: 1, filmName: 'Омерзительная восьмерка', filmRate: 7.2, filmImg: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/0bf728af-ce48-4c0e-9da3-f20ee81bc276/960x960', filmAge: 18},
  {filmId: 2, filmName: 'Земля кочевников', filmRate: 7.3, filmImg: 'http://kinohod.ru/o/c3/59/c359170a-76e0-11eb-941e-f50022a07b64.jfif', filmAge: 16},
];
@Component({
  selector: 'ngb-carousel-basic',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
dataSource = ELEMENT_DATA;
dataSource1 = ELEMENT_DATA1;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goFilmPage() {
                    this.router.navigate(
                      ['/film']);
                  }

}
