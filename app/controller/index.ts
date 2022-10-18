import { EventEmitter } from '../event-emitter';
import { IController } from './controller.interface';
import { IMediator } from '../mediator/mediator.interface';

export class Controller extends EventEmitter implements IController {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    public init() {
       throw new Error(`Controller.prototype.init() is abstract and should be implemented`);
    }

    public dispose() {
       throw new Error(`Controller.prototype.dispose() is abstract and should be implemented`);
    }
}
