export interface IRoute {
    controllerName: string;
    actionName: string;
    args: Object[];
    serialize(): string;
}