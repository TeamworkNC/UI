import {Component, OnInit} from '@angular/core';
import {ChatBotService} from '../../../core/services/chat-bot.service';


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

  messages: ChatMessage[] = [];
  private readonly USER_ID = 0;
  private readonly USER_NAME = 'user';
  private readonly BOT_NAME = 'bot';

  constructor(
    private readonly chatBotService: ChatBotService
  ) {
  }

  ngOnInit(): void {
  }

  sendMessage(text: string): void {
    this.messages.push(this.createUserMessage(text));

    this.chatBotService.sendMessage(text, this.USER_ID).subscribe(response => {
      this.messages.push(this.createBotMessage(response.text));

      if (response.films) {
        for (const film of response.films) {
          this.messages.push(this.createBotMessage(film.name));
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
}
