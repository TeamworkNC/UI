import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from './configs/my-rx-stomp.config';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './token.interseptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
