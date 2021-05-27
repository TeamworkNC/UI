import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'src/app/local-storage-service';
import {CurrentUserService} from './features/core/services/current-user.service';
import {NotificationService} from './features/core/services/notification.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MovieAndChill';

  userId: number;

  notifications = [];
  chatIsOpen = false;

  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
    private currentUserService: CurrentUserService,
    private notificationService: NotificationService,
    private titleService: Title
  ) {
    this.setTitle();
  }

  ngOnInit(): void {
    this.currentUserService.userId$.subscribe(userId => {
      this.userId = userId;
    });

    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      console.log(notifications);
      this.setTitle();
    });

    // если надо удалять нотификации
    // this.notificationService.deleteAllNotifications();
  }

  openChat(): void {
    this.chatIsOpen = true;
  }

  closeChat(): void {
    this.chatIsOpen = false;
  }


  goHomePage(): void {
    this.router.navigate(
      ['/home']);
  }

  goAddFilmPage(): void {
    this.router.navigate(
      ['/addfilm']);
  }

  goUserPage(): void {
    this.router.navigate(
      ['/user/' + this.localStorageService.getItem('userId')]);
  }

  goCatalogPage(): void {
    this.router.navigate(
      ['/catalog']);
  }

  goRegistrationPage(): void {
    this.router.navigate(
      ['/registration']);
  }

  goAuthorizationPage(): void {
    this.router.navigate(
      ['/authorization']);
  }

  goRoomPage(): void {
    this.router.navigate(
      ['/room/' + 1]);
  }

  goFriendsPage(): void {
    this.router.navigate(
      ['/friends/' + this.localStorageService.getItem('userId')]);
  }

  goOtherUserPage(): void {
    this.router.navigate(
      ['/otheruser/' + 1]);
  }

  logoff(): void {
    this.localStorageService.removeItem('userId');
    this.localStorageService.removeItem('logoUrl');
    this.localStorageService.removeItem('admin');
    this.currentUserService.clear();
    this.goHomePage();
  }

  public setTitle(): void {
    this.titleService.setTitle(this.title);
  }
}
