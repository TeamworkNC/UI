import {Injectable} from '@angular/core';
import {CurrentUserService} from './current-user.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {HttpClient} from '@angular/common/http';
import {from, Observable, Subject, Subscription} from 'rxjs';
import {concat, map, mergeMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notifications$ = new Subject<any>();
  private notificationHistory = [];

  private notificationSubscription: Subscription;
  private userId;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly rxStompService: RxStompService,
    private readonly http: HttpClient,
  ) {
    this.currentUserService.userId$.subscribe(value => {
      this.userId = value;
      if (value != null) {
        // пользователя авторизаовался
        this.subscribeToNotifications();
      } else {
        // пользователя вышел из акка
        this.unsubscribeFromNotifications();
      }
    });
  }

  public getAllNotifications(): any[] {
    if (this.userId) {
      throw new Error('cant get notifications: user is not authorized');
    }

    return this.notificationHistory;
  }

  public deleteAllNotifications(): Observable<any> {
    return this.http.delete(`https://mac21-portal-backend.herokuapp.com/api/v1/notifications?user_id=${this.userId}`).pipe(
      tap(() => {
        // удаляем историю сообщений
        this.notificationHistory = [];
      })
    );
  }

  public deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`https://mac21-portal-backend.herokuapp.com/api/v1/notifications/${notificationId}`);
  }

  private subscribeToNotifications(): void {
    console.log('subscribeToNotifications');

    this.notificationSubscription = this.getNotificationsFromRest().pipe(
      concat(this.getNotificationsFromWs())
    ).subscribe(notification => {
      this.onNotificationReceived(notification);
    });
  }

  private getNotificationsFromRest(): Observable<any> {
    if (this.userId == null) {
      throw new Error('cant get notifications from rest: user is not authorized');
    }

    return this.http.get(`https://mac21-portal-backend.herokuapp.com/api/v1/notifications?user_id=${this.userId}`).pipe(
      mergeMap((notifications: any[]) => {
        return from(notifications);
      }),
    );
  }

  private getNotificationsFromWs(): Observable<any> {
    if (this.userId == null) {
      throw new Error('cant get notifications from ws: user is not authorized');
    }

    return this.rxStompService.watch(`/topic/users/${this.userId}/notifications`).pipe(
      map(response => response.body),
    );
  }

  private onNotificationReceived(notification: any): void {
    // проверяем, что пользователь все еще авторизован
    if (this.userId) {
      this.notifications$.next(notification);
      this.notificationHistory.push(notification);
    }
  }

  private unsubscribeFromNotifications(): void {
    console.log('unsubscribeFromNotifications');

    this.notificationSubscription.unsubscribe();
    // удаляем все уведомления из истории
    this.notificationHistory = [];
  }

}
