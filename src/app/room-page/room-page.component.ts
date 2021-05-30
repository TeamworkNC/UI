import {Component, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../local-storage-service';
import {Session} from './session.model';
import {Film} from './film.model';
import {MatDialog} from '@angular/material/dialog';
import {InviteFriendsDialog} from './components/invite-friends/invite-friends.dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {

  sessionId: number;
  userId: number;

  session: Session;
  film: Film;

  playerDisabled = true;
  chatDisabled = true;

  constructor(
    private readonly rxStompService: RxStompService,
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly localStorageService: LocalStorageService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {
    this.sessionId = Number(route.snapshot.params.id);
    this.userId = Number(localStorageService.getItem('userId'));
  }

  async ngOnInit(): Promise<any> {
    if (this.localStorageService.getItem('userId')){
      this.session = await this.loadSessionInfo(this.sessionId);
      console.log(this.session);
      this.film = await this.loadFilmInfo(this.session.filmID);
      console.log(this.film);

      this.playerDisabled = false;
      this.chatDisabled = false;
    } else{
      this.router.navigate(['/home']);
    }
  }

  loadSessionInfo(sessionId: number): Promise<Session> {
    const url = 'https://mac21-portal-backend.herokuapp.com/api/v1/sessions/' + sessionId;
    return this.http.get<Session>(url).toPromise();
  }

  loadFilmInfo(filmId: number): Promise<Film> {
    const url = 'https://mac21-portal-backend.herokuapp.com/api/v1/films/' + filmId;
    return this.http.get<Film>(url).toPromise();
  }

  onInviteFriendButtonClick(): void {
    const dialogRef = this.dialog.open(InviteFriendsDialog, {
      // height: '400px',
      // width: '600px',
      data: {sessionId: this.sessionId, userId: this.userId},
    });
  }
}

