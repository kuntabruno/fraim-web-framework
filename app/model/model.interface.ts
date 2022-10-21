import { IEventEmitter } from '../event-emitter/event-emitter.interface';

export interface IModel extends IEventEmitter {
    init: () => void;
    dispose: () => void;
}
