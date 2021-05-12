import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RecommendationChatMessage} from '../models/recommendation-chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private readonly http: HttpClient) {
  }

  // TODO: rename?
  sendMessage(userId: number, text: string): Observable<RecommendationChatMessage> {
    const data = {
      userId,
      text
    };
    return this.http.post<RecommendationChatMessage>(`https://mac21-portal-backend.herokuapp.com/api/v1/chat-bot`, data);
  }
}
