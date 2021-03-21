import {Film} from './film.model';

export class RecommendationChatMessage {
  text: string;
  films?: Film[];


  constructor(text: string, films: Film[]) {
    this.text = text;
    this.films = films;
  }
}
