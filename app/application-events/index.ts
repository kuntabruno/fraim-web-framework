import { IAppEvent } from './app-event.interface';

export class AppEvent implements IAppEvent {
   public guid: string;
   public topic: string;
   public data: any;
   public handler: (e: any, data: any) => void;

   constructor(topic: string, data: any, handler: (e: any, data: any) => void) {
     this.topic = topic;
     this.data = data;
     this.handler = handler;
   }
}