import {Component, OnInit} from '@angular/core';
import {ChatBotService} from '../../../core/services/chat-bot.service';
import {CurrentUserService} from '../../../core/services/current-user.service';
import * as mime from 'mime';

interface ChatMessage {
  sender: string;
  reply: boolean;
  type: 'text' | 'file';
  text?: string;
  date: Date;
  files?: any;
}

@Component({
  selector: 'app-recommendation-chat',
  templateUrl: './recommendation-chat.component.html',
  styleUrls: ['./recommendation-chat.component.scss']
})
export class RecommendationChatComponent implements OnInit {

  private readonly USER_NAME = 'user';
  private readonly BOT_NAME = 'bot';

  messages: ChatMessage[] = [];
  userId: number | undefined;
  enabled = false;

  constructor(
    private readonly chatBotService: ChatBotService,
    private readonly currentUserService: CurrentUserService,
  ) {
  }

  ngOnInit(): void {
    this.currentUserService.userId$.subscribe(userId => {
      this.userId = userId;
      // очищаем сообщения
      this.messages = [];
    });
  }

  sendMessage(text: string): void {
    this.messages.push(this.createUserMessage(text));

    if (this.userId == null) {
      const message = this.createBotTextMessage('O нет! чтобы написать мне, вы должны авторизироваться');
      this.messages.push(message);
      return;
    }

    this.chatBotService.sendMessage(this.userId, text).subscribe(response => {
      this.messages.push(this.createBotTextMessage(response.text));

      if (response.films) {
        for (const film of response.films) {
          let filmDescription = film.filmTitle + '\n\n';
          filmDescription += film.description;
          this.messages.push(this.createBotTextMessage(filmDescription));
          this.messages.push(this.createBotImgMessage(film.filmPoster));
          this.messages.push(this.createBotBtnMessage(`https://mac21-ui.herokuapp.com/film/${film.idFilm}`));
        }
      }

      console.log(this.messages);
    });
  }

  private createUserMessage(text: string): ChatMessage {
    return {type: 'text', sender: this.USER_NAME, text, reply: true, date: new Date()};
  }

  private createBotTextMessage(text: string): ChatMessage {
    return {type: 'text', sender: this.BOT_NAME, text, reply: false, date: new Date()};
  }

  private createBotBtnMessage(url: string): ChatMessage {
    return {type: 'text', sender: this.BOT_NAME, text: url, reply: false, date: new Date()};
  }

  private createBotImgMessage(url: string): ChatMessage {
    const ext = url.split('.').pop();
    const filesProp = [{url, type: mime.getType(ext)}];
    return {type: 'file', sender: this.BOT_NAME, reply: false, date: new Date(), files: filesProp};
  }
}
