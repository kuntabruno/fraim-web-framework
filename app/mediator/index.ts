import { publish, subscribe, unsubscribe } from 'pubsub-js';

import { IMediator, IMediatorAction } from './mediator.interface';
import { IAppEvent } from '../application-events/app-event.interface';

export class Mediator implements IMediator {
  private _isDebug: boolean;

  constructor(isDebug: boolean = false) {
    this._isDebug = isDebug;
  }

  public publish(e: IAppEvent) {
    this.logToConsole(e, 'PUBLISH');
    publish(e.topic, e.data);
  }

  public subscribe(e: IAppEvent) {
    this.logToConsole(e, 'SUBSCRIBE');
    subscribe(e.topic, e.handler);
  }

  public unsubscribe(e: IAppEvent) {
    this.logToConsole(e, 'UNSUBSCRIBE');
    unsubscribe(e.topic);
  }

  private logToConsole(e: IAppEvent, action: IMediatorAction): void {
    if (this._isDebug === true) {
      switch (action) {
        case 'SUBSCRIBE':
          console.log(new Date().getTime(), action, e.topic, e.data);
          break;
        case 'UNSUBSCRIBE':
          console.log(new Date().getTime(), action, e.topic, e.data);
          break;
        case 'UNSUBSCRIBE':
          console.log(new Date().getTime(), action, e.topic, e.data);
          break;

        default:
          break;
      }
    }
    return;
  }
}
