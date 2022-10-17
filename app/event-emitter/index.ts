import { IEventEmitter } from './event-emitter.interface';
import { IAppEvent } from '../application-events/app-event.interface';
import { IMediator } from '../mediator/mediator.interface';

export class EventEmitter implements IEventEmitter {
  protected _mediator: IMediator;
  protected _events: Array<IAppEvent>;
  constructor(mediator: IMediator) {
    this._mediator = mediator;
  }

  public triggerEvent(event: IAppEvent) {
    this._mediator.publish(event);
  }

  public subscribeToEvents(events: IAppEvent[]) {
    this._events = events;
    for (let i = 0; i < this._events.length; i++) {
      this._mediator.subscribe(this._events[i]);
    }
  }

  public unsubscribeToEvents(events: IAppEvent[]) {
     for (let i = 0; i < this._events.length; i++) {
        const event = this._events[i];
        this._mediator.unsubscribe(event);
     }
  }

}
