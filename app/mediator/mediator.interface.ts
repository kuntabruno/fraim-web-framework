import { IAppEvent } from '../application-events/app-event.interface';

export interface IMediator {
    publish: (e: IAppEvent) => void;
    subscribe: (e: IAppEvent) => void;
    unsubscribe: (e: IAppEvent) => void;
}


export type IMediatorAction = 'SUBSCRIBE' | 'UNSUBSCRIBE' | 'PUBLISH';