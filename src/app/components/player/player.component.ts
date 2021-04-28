import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import Hls from 'hls.js';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit {

  @Input()
  public userId: number;

  @Input()
  public creatorId: number;

  @Input()
  public videoUrl: string;

  @Input()
  public sessionId: number;

  @ViewChild('player') playerRef;

  constructor(
    private readonly rxStompService: RxStompService,
    private readonly cd: ChangeDetectorRef,
  ) {
  }


  ngAfterViewInit(): void {
    this.initPlayer();
    this.connectToSession();
    this.cd.detectChanges();
  }


  initPlayer(): void {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.videoUrl);
      hls.attachMedia(this.playerRef?.nativeElement);
    } else {
      alert('hls is not supported');
    }

    if (this.getIsAdmin()) {
      this.playerRef.nativeElement.controls = true;
    }
  }

// ui handlers
  connectToSession(): void {
    console.log('connectToSession');
    const topic = '/topic/sessions/' + this.sessionId;
    console.log(topic);
    this.rxStompService.watch(topic).subscribe(message => {
      this.onMessageReceived(JSON.parse(message.body));
    });
    this.sendMessage({type: 'join'});
  }

  onMessageReceived(message): void {
    console.log('onMessageReceived');
    console.log(message);
    if (message.type === 'join') {
      console.log('join');
      if (this.getIsAdmin()) {
        const status = this.playerRef?.nativeElement.paused ? 'paused' : 'played';
        const data = {type: 'info', status, time: this.playerRef?.nativeElement.currentTime};
        this.sendMessage(data);
      }
    }
    if (message.type === 'status') {
      console.log('status');
      if (!this.getIsAdmin()) {
        const time = message.time;
        const status = message.status;
        console.log(time, status);
        this.playerRef.nativeElement.currentTime = time;
        if (status === 'played') {
          this.playerRef?.nativeElement.play().catch(reason => console.log(reason));
        }
        if (status === 'paused') {
          this.playerRef?.nativeElement.pause();
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

  onPlayVideoButtonClick(): void {
    console.log('onPlayVideoButtonClick');
    if (this.getIsAdmin()) {
      this.playerRef?.nativeElement.play().catch(reason => console.log(reason));
      this.sendMessage({type: 'status', status: 'played', time: this.playerRef?.nativeElement.currentTime});
    }
  }

  onPauseVideoButtonClick(): void {
    console.log('onPauseVideoButtonClick');
    if (this.getIsAdmin()) {
      this.playerRef?.nativeElement.pause();
      this.sendMessage({type: 'status', status: 'paused', time: this.playerRef?.nativeElement.currentTime});
    }
  }

  onVideoTimeSeeked(): void {
    console.log('onVideoTimeUpdate');
    if (this.getIsAdmin()) {
      const status = this.playerRef?.nativeElement.paused ? 'paused' : 'played';
      this.sendMessage({type: 'status', status, time: this.playerRef?.nativeElement.currentTime});
    }
  }

  getIsAdmin(): boolean {
    return this.userId === this.creatorId;
  }
}
