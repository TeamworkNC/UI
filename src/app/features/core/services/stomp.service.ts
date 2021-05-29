import {Injectable} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from '../configs/my-rx-stomp.config';

@Injectable({
  providedIn: 'root'
})
export class StompService {

  constructor(private readonly rxStompService: RxStompService) {
  }

  public init(): void {
    const stompConfig: InjectableRxStompConfig = Object.assign({}, myRxStompConfig, {
      // connectHeaders: {
      //   access_token: sessionStorage.getItem('token')
      // },
      beforeConnect: () => {
        console.log('init stomp client');
      }
    });
    this.rxStompService.configure(stompConfig);
    this.rxStompService.activate();
  }

  public dispose(): void {
    this.rxStompService.deactivate().then(r => console.log('dispose stomp client'));
  }
}
