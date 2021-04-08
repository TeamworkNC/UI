import {ImgKarusel} from 'src/app/imgKarusel';
import {Review} from 'src/app/review';

export class FilmAll{
      id: number;
      logo: string;
      name : string;
      genre: string;
      producer : string;
      actors: string;
      rating: string;
      ageRestrictions : string;
      description : string;
      trailerId : string;
      imageObject : ImgKarusel[];
      reviews : Review[];
    constructor() {
       this.id = 0;
       this.logo = '';
       this.name = '';
       this.genre = '';
       this.producer = '';
       this.actors = '';
       this.rating = '';
       this.ageRestrictions = '';
       this.description = '';
       this.trailerId = '';
       this.imageObject = [];
       this.reviews = [];
    }
}
