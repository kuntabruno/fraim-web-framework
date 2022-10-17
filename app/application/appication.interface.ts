export interface IAppSettings {
    isDebug: boolean;
    defaultController: string;
    defaultAction: string;
    controllers: Array<IControllerDetails>;
    onErrorHandler: (o: Object) => void;
}

export interface IControllerDetails {
    controllerName: string;
    controller : { new(...args : any[]): IController ;};
}