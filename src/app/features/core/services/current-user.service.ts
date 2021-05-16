import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from '../../../local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  userId$: BehaviorSubject<number | undefined>;

  constructor(private readonly localStorageService: LocalStorageService) {
    const userId = Number(this.localStorageService.getItem('userId'));
    this.userId$ = new BehaviorSubject<any>(userId);
  }

  getUserId(userId: number): number | undefined {
    return this.userId$.value;
  }

  setUserId(userId: number): void {
    this.localStorageService.setItem('userId', String(userId));
    return this.userId$.next(userId);
  }

  deleteUserId(): void {
    this.localStorageService.removeItem('userId');
    return this.userId$.next(undefined);
  }
}
