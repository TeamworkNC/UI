import {Component, OnInit} from '@angular/core';
import {ChatBotService} from '../../../core/services/chat-bot.service';
import {LocalStorageService} from '../../../../local-storage-service';


interface ChatMessage {
  name: string;
  text: string;
  reply: boolean;
  date: Date;
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

  constructor(
    private readonly chatBotService: ChatBotService,
    private localStorageService: LocalStorageService,
  ) {

    // FIXME
    // if (this.userId == null) {
    //   throw new Error('oops! user is not authorized!');
    // }
  }

  ngOnInit(): void {
  }

  sendMessage(text: string): void {
    this.messages.push(this.createUserMessage(text));

    if (this.getUserId() == null) {
      this.messages.push(this.createBotMessage('oops! not authorized!'));
      return;
    }

    this.chatBotService.sendMessage(this.getUserId(), text).subscribe(response => {
      this.messages.push(this.createBotMessage(response.text));

      if (response.films) {
        for (const film of response.films) {
          this.messages.push(this.createBotMessage(film.filmTitle));
          this.messages.push(this.createBotMessage(film.description));
        }
      }
    });
  }

  private createUserMessage(text: string): ChatMessage {
    return {name: this.USER_NAME, text, reply: true, date: new Date()};
  }

  private createBotMessage(text: string): ChatMessage {
    return {name: this.BOT_NAME, text, reply: false, date: new Date()};
  }

  private getUserId(): number | undefined {
    return Number(this.localStorageService.getItem('userId'));
  }

}
