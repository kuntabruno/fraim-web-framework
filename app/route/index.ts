import { IRoute } from "./route.interface";

export class Route implements IRoute {
    public controllerName: string;
    public actionName: string;
    public args: Object[];

    constructor(controllerName: string, actionName: string, args: Object[]) {
       this.controllerName = controllerName;
       this.actionName = actionName;
       this.args = args;
    }

    public serialize(): string {
        const stringArgs = this.args.map((arg) => arg.toString()).join("/");
        const string = `${this.controllerName}/${this.actionName}/${stringArgs}`;
        return string; 
    }
}