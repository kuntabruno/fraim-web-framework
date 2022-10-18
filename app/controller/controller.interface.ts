import { IEventEmitter } from '../event-emitter/event-emitter.interface';

export interface IController extends IEventEmitter {
  init: () => void;
  dispose: () => void;
}
