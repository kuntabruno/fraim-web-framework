import { IAppEvent } from "../application-events/app-event.interface";

export interface IEventEmitter {
    triggerEvent: (event : IAppEvent) => void;
    subscribeToEvents: (events : Array<IAppEvent>) => void;
    unsubscribeToEvents: (events : Array<IAppEvent>) => void;
}