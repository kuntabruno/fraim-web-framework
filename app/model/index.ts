import { EventEmitter } from "../event-emitter";
import { IMediator } from "../mediator/mediator.interface";
import { IModel } from "./model.interface";

export class Model extends EventEmitter implements IModel {

    // the values of _serviceUrl must be set using the ModelSettings decorator
    private _serviceUrl : string;
    
    constructor(mediator: IMediator) {
       super(mediator);
    }
   
    // Must be implemented by derived classes
    init() {
      throw new Error(`Model.prototype.init is abstract and must be implemented`);
    }

    // Must be implemented by derived classes
    dispose() {
      throw new Error(`Model.prototype.dispose is abstract and must be implemented`);
    }

    sendRequest(method: string, data?: any): Promise<any> {
       return fetch(this._serviceUrl, {
        method,
        body: JSON.stringify(data)
       });
    }

    protected get(data?: any) {
       return this.sendRequest("GET",data);
    }

    protected post(data: any = {}) {
       return this.sendRequest("POST",data);
    }

    protected put(data: any = {}) {
       return this.sendRequest("PUT", data);
    }

    protected delete(data: any = {}) {
       return this.sendRequest("DELETE", data);
    }
}