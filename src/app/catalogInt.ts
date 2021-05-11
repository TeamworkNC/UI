import {GenreInt} from "src/app/genreInt";
import {AgeLimitsInt} from "src/app/ageLimitsInt";
import {FilmShort} from 'src/app/filmShort';
export class CatalogInt {
films: FilmShort[];
filters: GenreInt[];
ageLimits: AgeLimitsInt[];
constructor() {
this.films = [];
this.filters = [];
this.ageLimits = [];
}
}
