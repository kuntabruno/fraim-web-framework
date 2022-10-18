import { EventEmitter } from '../event-emitter/index';
import { AppEvent } from '../application-events';
import { Controller } from '../controller';

import { IDispatcher } from './dispatcher.interface';
import { IMediator } from '../mediator/mediator.interface';
import { IRoute } from '../route/route.interface';
import { IController } from '../controller/controller.interface';


export class Dispatcher extends EventEmitter implements IDispatcher {
    private _controllersHashMap: Map<string, IController | undefined>;
    private _currentController: IController | undefined;
    private _currentControllerName: string | null;
    constructor(mediator: IMediator, controllers: IControllerDetails[]) {
        super(mediator);
        this._controllersHashMap = this.getController(controllers);
        this._currentController = undefined;
        this._currentControllerName = null;
    }


    public init() {
        this.subscribeToEvents([
            new AppEvent('app.dispatch', null, (e: any, data: any) => { this.dispatch(data); })
        ]);
    }


    private getController(controllers : IControllerDetails[]) : Map<string, IController | undefined> {
        let hashMapEntry, name, controller, l;
        let hashMap = new Map<string, IController | undefined>();
        l = controllers.length;
        if (l <= 0) {
          this.triggerEvent(
            new AppEvent(
              'app.error',
              'Cannot create an application without at least one contoller.',
              undefined
            )
          );
        }
        for (var i = 0; i < l; i++) {
          controller = controllers[i];
          name = controller.controllerName;
          hashMapEntry = hashMap.get(name);
          if (hashMapEntry !== null && hashMapEntry !== undefined) {
            this.triggerEvent(
              new AppEvent(
                'app.error',
                'Two controller cannot use the same name.',
                undefined
              )
            );
          }
          hashMap.set(name, controller);
        }
        return hashMap;
    }


    private dispatch(route: IRoute) {

        const controller = this._controllersHashMap.get(route.controllerName);

        if (controller === null || controller === undefined) {
            this.triggerEvent(new AppEvent('app.error', `Controller not found: ${route.controllerName}`, undefined));
        }
        // create a controller instance
        const newController : IController = new Controller(this._mediator);
        // action is not available
        var action = newController[`${route.actionName}`];
        if (action === null || action === undefined) {
            this.triggerEvent(new AppEvent(
            "app.error",
            `Action not found in controller: ${route.controllerName} 
            - + ${route.actionName}`,
            undefined));
            }
            // action is available
        else {
            if (this._currentController == null) {
                // initialize controller
                this._currentControllerName = route.controllerName;
                this._currentController = controller;
                if (this._currentController) {
                    this._currentController.init();
                }
                
            } else {
            // dispose previous controller if not needed
            if(this._currentControllerName !== route.controllerName) {
            this._currentController.dispose();
            this._currentControllerName = route.controllerName;
            this._currentController = controller;
            if (this._currentController) {
                this._currentController.init();
            }
            }
        }
        // pass flow from dispatcher to the controller
        this.triggerEvent(new AppEvent(
        `app.controller.${this._currentControllerName}
        .${route.actionName}`,
        route.args,
        undefined
        ));

        
        }
    }
       

    
}