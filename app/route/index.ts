import { IRoute } from "./route.interface";

export class Route implements IRoute {
    public controllerName: string;
    public actionName: string;
    public args: Object[];

    constructor(options: IRoute) {
       if (!options) {
          throw new Error(`Route options are required to create a Route instance`);
       }
       const { controllerName, actionName, args } = options;
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