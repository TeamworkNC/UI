import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecommendationChatComponent} from './components/recommendation-chat/recommendation-chat.component';
import {NbChatModule, NbIconModule} from '@nebular/theme';
import {ClosableRecommendationChatComponent} from './components/closable-recommendation-chat/closable-recommendation-chat.component';
import {RecommendationChatOpenButtonComponent} from './components/recommendation-chat-open-button/recommendation-chat-open-button.component';


@NgModule({
  declarations: [
    RecommendationChatComponent,
    ClosableRecommendationChatComponent,
    RecommendationChatOpenButtonComponent,
  ],
  exports: [
    RecommendationChatComponent,
    ClosableRecommendationChatComponent,
    RecommendationChatOpenButtonComponent,
  ],
  imports: [
    CommonModule,
    NbChatModule,
    NbIconModule
  ]
})
export class RecommendationChatModule {
}
