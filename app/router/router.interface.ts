import { IEventEmitter } from "../event-emitter/event-emitter.interface";

export interface IRouter extends IEventEmitter {
   init: () => void;
}