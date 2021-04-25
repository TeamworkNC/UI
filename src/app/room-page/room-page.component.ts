import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import Hls from 'hls.js';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements AfterViewInit {

  @ViewChild('player') playerRef;
  playerLoaded = false;
  private videoUrl = 'https://moviescontainerhls.s3-us-west-2.amazonaws.com/sintelsintelhls.m3u8';
  private sessionId = 1;
  private isAdmin;

  constructor(private readonly rxStompService: RxStompService) {
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init(): void {
    this.initPlayer();
  }

  initPlayer(): void {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.videoUrl);
      hls.attachMedia(this.playerRef?.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => this.playerRef?.nativeElement.play());
      this.playerLoaded = true;
    } else {
      alert('hls is not supported');
    }
  }

// ui handlers
  onConnectAsGuestButtonClick(): void {
    console.log('onConnectAsGuestButtonClick');
    // this.userId = userIdInputRef.value;
    this.isAdmin = false;
    this.connectToSession();
  }

  onConnectAsAdminButtonClick(): void {
    console.log('onConnectAsGuestButtonClick');
    // this.userId = userIdInputRef.value;
    this.isAdmin = true;
    this.connectToSession();
  }

  onPlayVideoButtonClick(): void {
    console.log('onPlayVideoButtonClick');
    if (this.isAdmin) {
      this.playerRef?.nativeElement.play().catch(reason => console.log(reason));
      this.sendMessage({type: 'status', status: 'played', time: this.playerRef?.nativeElement.currentTime});
    }
  }

  onPauseVideoButtonClick(): void {
    console.log('onPauseVideoButtonClick');
    if (this.isAdmin) {
      this.playerRef?.nativeElement.pause();
      this.sendMessage({type: 'status', status: 'paused', time: this.playerRef?.nativeElement.currentTime});
    }
  }

  onVideoTimeSeeked(): void {
    console.log('onVideoTimeUpdate');
    if (this.isAdmin) {
      const status = this.playerRef?.nativeElement.paused ? 'paused' : 'played';
      this.sendMessage({type: 'status', status, time: this.playerRef?.nativeElement.currentTime});
    }
  }

// logic
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
      if (this.isAdmin) {
        const status = this.playerRef?.nativeElement.paused ? 'paused' : 'played';
        const data = {type: 'info', status, time: this.playerRef?.nativeElement.currentTime};
        this.sendMessage(data);
      }
    }
    if (message.type === 'status') {
      console.log('status');
      if (!this.isAdmin) {
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
}
