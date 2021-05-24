import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'src/app/local-storage-service';
import {CurrentUserService} from './features/core/services/current-user.service';
import {NotificationService} from './features/core/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MovieAndChill';

  notifications = [];
  userId: number;

  chatIsOpen = false;

  hidden = false;

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
    this.notificationService.notifications$.subscribe(notification => {
      alert(JSON.stringify(notification));
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

  goAddFilmPage(){
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

  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  logoff(): void {
    this.localStorageService.removeItem('userId');
    this.localStorageService.removeItem('logoUrl');
    this.currentUserService.deleteUserId();
    this.goHomePage();
  }

   public setTitle() {
      this.titleService.setTitle(this.title);
    }
}
