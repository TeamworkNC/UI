import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from '../../../local-storage-service';
import {CookieService} from 'ngx-cookie';
import {StompService} from './stomp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId$: BehaviorSubject<number | undefined>;
  token$: BehaviorSubject<string | undefined>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly cookieService: CookieService,
    private readonly stompService: StompService,
  ) {
    const userId = Number(this.localStorageService.getItem('userId'));
    const token = this.localStorageService.getItem('token');
    this.userId$ = new BehaviorSubject<any>(userId);
    this.token$ = new BehaviorSubject<any>(token);
  }

  get userId(): number | undefined {
    return this.userId$.value;
  }

  get token(): string | undefined {
    return this.token$.value;
  }

  login(userId: number, token: string): void {
    this.localStorageService.setItem('userId', String(userId));
    this.userId$.next(userId);

    this.localStorageService.setItem('token', token);
    this.cookieService.put('token', token);
    this.token$.next(token);
  }

  logout(): void {
    this.localStorageService.removeItem('userId');
    this.localStorageService.removeItem('token');
    this.cookieService.remove('token');
    this.userId$.next(undefined);
    this.token$.next(undefined);
    this.stompService.dispose();
  }
}
