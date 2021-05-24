import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Message} from './message.model';
import {from, Observable} from 'rxjs';
import {concat, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @Input()
  public chatId: number;
  @Input()
  public userId: number;
  inputMessageForm = new FormControl();

  @ViewChild('messagesContainer')
  messagesContainerRef: ElementRef;

  messages: any[] = [];
  private readonly apiUrl = 'https://mac21-portal-backend.herokuapp.com/api/v1/';

  needScroll = false;

  constructor(
    private readonly rxStompService: RxStompService,
    private readonly http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getMessagesFromRest().pipe(
      concat(this.getMessagesFromWs())
    ).subscribe(message => {
      this.onMessageReceived(message);
    });
  }

  ngAfterViewChecked(): void {
    if (this.needScroll) {
      this.scrollToBottom();
      this.needScroll = false;
    }
  }

  getMessagesFromRest(): Observable<Message> {
    if (this.userId == null) {
      throw new Error('cant get messages from rest: user is not authorized');
    }

    return this.http.get<Message[]>(this.apiUrl + 'chats/' + this.chatId + '/messages').pipe(
      mergeMap((messages: Message[]) => {
        return from(messages);
      }),
    );
  }

  getMessagesFromWs(): Observable<Message> {
    if (this.userId == null) {
      throw new Error('cant get messages from ws: user is not authorized');
    }

    return this.rxStompService.watch('/topic/chats/' + this.chatId + '/messages').pipe(
      map(value => JSON.parse(value.body))
    ) as unknown as Observable<Message>;
  }

  scrollToBottom(): void {
    try {
      this.messagesContainerRef.nativeElement.scrollTop = this.messagesContainerRef.nativeElement.scrollHeight;
    } catch (err) {
    }
  }


  onSend(): void {
    const topic = '/app/messages/send';
    const text = this.inputMessageForm.value;
    const data = {
      chatId: this.chatId,
      userId: this.userId,
      text,
    };
    console.log(data);
    this.rxStompService.publish({destination: topic, body: JSON.stringify(data)});
    this.inputMessageForm.setValue('');
  }

  private onMessageReceived(message: Message): void {
    this.http.get<any>(`${this.apiUrl}users/${message.userId}`).subscribe(user => {
      this.messages.push({text: message.text, username: user.login});
      this.needScroll = true;
    });
  }
}
