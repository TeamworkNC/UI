import {Component} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../local-storage-service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent {

  videoUrl = 'https://moviescontainerhls.s3-us-west-2.amazonaws.com/sintelsintelhls.m3u8';
  sessionId = 1;
  creatorId = 20;
  chatId = 1;
  userId = 5;

  playerDisabled = true;
  chatDisabled = true;

  constructor(
    private readonly rxStompService: RxStompService,
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.sessionId = route.snapshot.params.id;
    // this.userId = Number(localStorageService.getItem('userId'));
    this.playerDisabled = false;
    this.chatDisabled = false;
  }


}

