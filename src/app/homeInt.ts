import {FilmShort} from 'src/app/filmShort';
import {FilmSlider} from 'src/app/filmSlider';

export class HomeInt{
novelty : FilmShort[];
recommendation: FilmShort[];
slider: FilmSlider[];
constructor() {
  this.novelty = [];
  this.recommendation = [];
  this.slider = [];
}
}
