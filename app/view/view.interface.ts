import { IEventEmitter } from '../event-emitter/event-emitter.interface';

export interface IView extends IEventEmitter {
    init: () => void;
    dispose: () => void;
}

