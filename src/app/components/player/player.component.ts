import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Player} from '@vime/angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @ViewChild('player') player!: Player;

  @Input()
  public userId!: number;

  @Input()
  public creatorId!: number;

  @Input()
  public videoUrl!: string;

  @Input()
  public sessionId!: number;

  playerDisplayed = false;
  playerHasControls = false;

  constructor(
    private readonly rxStompService: RxStompService) {
  }

  ngOnInit(): void {
    this.initPlayer();
    this.connectToSession();
    this.sendMessage({type: 'join'});
  }

  initPlayer(): void {
    this.playerHasControls = this.getIsAdmin();
  }

  connectToSession(): void {
    console.log('connectToSession');
    const topic = '/topic/sessions/' + this.sessionId;
    console.log(topic);
    this.rxStompService.watch(topic).subscribe(message => {
      this.onMessageReceived(JSON.parse(message.body));
    });
  }

  onMessageReceived(message): void {
    console.log('onMessageReceived');
    console.log(message);
    if (message.type === 'join') {
      console.log('join');
      if (this.getIsAdmin()) {
        const status = this.player.paused ? 'paused' : 'played';
        const data = {type: 'info', status, time: this.player.currentTime};
        this.sendMessage(data);
      }
    }
    if (message.type === 'status') {
      console.log('status');
      if (!this.getIsAdmin()) {
        const time = message.time;
        const status = message.status;
        console.log(time, status);
        this.player.currentTime = time;
        if (status === 'played') {
          this.player.play().catch(reason => console.log(reason));
        }
        if (status === 'paused') {
          this.player.pause();
        }
      }
    }
  }

  sendMessage(message): void {
    console.log('sendMessage');
    console.log(message);
    const topic = '/topic/sessions/' + this.sessionId;
    this.rxStompService.publish({destination: topic, body: JSON.stringify(message)});
  }

  getIsAdmin(): boolean {
    return this.userId === this.creatorId;
  }

  // ui handlers
  onPlayVideoButtonClick(): void {
    console.log('onPlayVideoButtonClick');
    if (this.getIsAdmin()) {
      this.player.play().catch(reason => console.log(reason));
      this.sendMessage({type: 'status', status: 'played', time: this.player.currentTime});
    }
  }

  onPausedChange(event: CustomEvent<boolean>): void {
    if (event.detail) {
      this.onVideoPaused();
    }
  }

  onVideoPaused(): void {
    console.log('onVideoPaused');
    if (this.getIsAdmin()) {
      this.player.pause()
        .then(() => {
          this.sendMessage({type: 'status', status: 'paused', time: this.player.currentTime});
        });
    }
  }

  onVideoTimeSeeked(): void {
    console.log('onVideoTimeSeeked');
    if (this.getIsAdmin()) {
      const status = this.player.paused ? 'paused' : 'played';
      this.sendMessage({type: 'status', status, time: this.player.currentTime});
    }
  }

  onPlaybackReady(): void {
    this.playerDisplayed = true;
  }
}
