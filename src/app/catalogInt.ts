import {GenreInt} from "src/app/genreInt";

import {FilmShort} from 'src/app/filmShort';
export class CatalogInt {
films: FilmShort[];
filters: GenreInt[];
constructor() {
this.films = [];
this.filters = [];
}
}
