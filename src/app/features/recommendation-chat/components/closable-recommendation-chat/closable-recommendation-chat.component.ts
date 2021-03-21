import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-closable-recommendation-chat',
  templateUrl: './closable-recommendation-chat.component.html',
  styleUrls: ['./closable-recommendation-chat.component.scss']
})
export class ClosableRecommendationChatComponent implements OnInit {

  @Output()
  public closeChat = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  CloseChatClickHandler(): void {
    this.closeChat.emit();
  }

}
