import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from '../../../local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  userId$: BehaviorSubject<number | undefined>;
  token$: BehaviorSubject<string | undefined>;

  constructor(private readonly localStorageService: LocalStorageService) {
    const userId = Number(this.localStorageService.getItem('userId'));
    const token = this.localStorageService.getItem('token');
    this.userId$ = new BehaviorSubject<any>(userId);
    this.token$ = new BehaviorSubject<any>(token);
  }

  get userId(): number | undefined {
    return this.userId$.value;
  }

  set userId(userId: number) {
    this.localStorageService.setItem('userId', String(userId));
    this.userId$.next(userId);
  }

  get token(): string | undefined {
    return this.token$.value;
  }

  set token(token: string) {
    this.localStorageService.setItem('token', token);
    this.token$.next(token);
  }

  clear(): void {
    this.localStorageService.removeItem('userId');
    this.localStorageService.removeItem('token');
    this.userId$.next(undefined);
    this.token$.next(undefined);
  }
}
