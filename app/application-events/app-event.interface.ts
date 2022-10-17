export interface IAppEvent {
    topic: string;
    data: any;
    handler: (e: any, data: any) => void;
}