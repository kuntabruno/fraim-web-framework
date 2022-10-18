import { IEventEmitter } from '../event-emitter/event-emitter.interface';

export interface IDispatcher extends IEventEmitter {
  init: () => void;
}
