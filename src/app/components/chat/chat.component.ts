import {Component, Input, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {HttpClient} from '@angular/common/http';
import {Message} from './message.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  public chatId: number;
  @Input()
  public userId: number;
  inputMessageForm = new FormControl();
  messages: Message[];
  private readonly apiUrl = 'https://mac21-portal-backend.herokuapp.com/api/v1/';

  constructor(
    private readonly rxStompService: RxStompService,
    private readonly http: HttpClient,
  ) {
  }

  async ngOnInit(): Promise<any> {
    this.messages = await this.loadMessages();
    console.log(this.messages);
    this.rxStompService.watch('/topic/chats/' + this.chatId + '/messages').subscribe(value => {
      const message = JSON.parse(value.body);
      console.log(message);
      this.messages.push(message);
    });
  }

  loadMessages(): Promise<Message[]> {
    return this.http.get<Message[]>(this.apiUrl + 'chats/' + this.chatId + '/messages').toPromise();
  }

  onSendButtonClick(): void {
    const topic = '/app/messages/send';
    const text = this.inputMessageForm.value;
    const data = {
      chatId: this.chatId,
      userId: this.userId,
      text,
    };
    this.rxStompService.publish({destination: topic, body: JSON.stringify(data)});
    this.inputMessageForm.setValue('');
  }
}
