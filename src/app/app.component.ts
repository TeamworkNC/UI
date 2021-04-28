import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "src/app/local-storage-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app111';

  constructor(public router: Router, public localStorageService: LocalStorageService) {
  }

  goHomePage() {
    this.router.navigate(
      ['/home']);
  }

  goUserPage() {
    this.router.navigate(
      ['/user/' + this.localStorageService.getItem("userId")]);
  }

  goCatalogPage() {
            this.router.navigate(
              ['/catalog']);
          }

  goRegistrationPage() {
              this.router.navigate(
                ['/registration']);
            }
  goAuthorizationPage() {
                this.router.navigate(
                  ['/authorization']);
              }
  goRoomPage(){
                  this.router.navigate(
                      ['/room/'+1]);
  }

  goFriendsPage(){
                    this.router.navigate(
                        ['/friends/'+ this.localStorageService.getItem("userId")]);
    }

  goOtherUserPage(){
                      this.router.navigate(
                          ['/otheruser/'+1]);
      }

  chatIsOpen = false;

    openChat(): void {
      this.chatIsOpen = true;
    }

    closeChat(): void {
      this.chatIsOpen = false;
    }
   hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  logoff(){
    this.localStorageService.removeItem("userId");
    this.localStorageService.removeItem("logoUrl");
    this.goHomePage();
  }

}
