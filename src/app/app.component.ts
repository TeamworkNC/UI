import { Component } from '@angular/core';
import {Router} from "@angular/router";
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app111';
 connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity",
            "timeout" : 10000,
            "transports" : ['websocket', 'polling', 'flashsocket']
        };
  constructor( public router: Router) {

    }

  goHomePage() {
      this.router.navigate(
        ['/home']);
    }

  goUserPage() {
          this.router.navigate(
            ['/user/'+1]); //убрать
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

  goFilmPage() {
                  this.router.navigate(
                    ['/film/'+1]);
                }
  goRoomPage(){
                  this.router.navigate(
                      ['/room/'+1]);
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

}
