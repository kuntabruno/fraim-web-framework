import { AppEvent } from '../application-events';
import { EventEmitter } from '../event-emitter';
import { Route } from '../route';

import { IMediator } from '../mediator/mediator.interface';
import { IRouter } from './router.interface';

export class Router extends EventEmitter implements IRouter {
  private _defaultController: string;
  private _defaultAction: string;

  constructor(
    mediator: IMediator,
    defaultController: string = `home`,
    defaultAction: string = `index`
  ) {
    super(mediator);
    this._defaultController = defaultController;
    this._defaultAction = defaultAction;
  }

  public init() {
    // observe URL changes by users
    window.onhashchange = () => {
      const route = this.getRoute();
      this.onRouteChange(route);
    };
    // be able to trigger URL changes
    this.subscribeToEvents([
      // used to trigger routing on app start
      new AppEvent('app.initialize', null, (e: any, data?: any) => {
        this.onRouteChange(this.getRoute());
      }),
      // used to trigger URL changes from other components
      new AppEvent('app.route', null, (e: any, data?: any) => {
        this.setRoute(data);
      }),
    ]);
  }

  // Encapsulates reading the URL
  private getRoute() {
    var h = window.location.hash;
    return this.parseRoute(h);
  }
  // Encapsulates writting the URL
  private setRoute(route: Route) {
    var s = route.serialize();
    window.location.hash = s;
  }

  // Encapsulates parsing an URL
  private parseRoute(hash: string) {
    let comp, controller, action, args, i;
    if (hash[hash.length - 1] === '/') {
      hash = hash.substring(0, hash.length - 1);
    }
    comp = hash.replace('#', '').split('/');
    controller = comp[0] || this._defaultController;
    action = comp[1] || this._defaultAction;
    args = [];
    for (i = 2; i < comp.length; i++) {
      args.push(comp[i]);
    }
    return new Route(controller, action, args);
  }
  // Pass control to the Dispatcher via the Mediator
  private onRouteChange(route: Route) {
    this.triggerEvent(new AppEvent('app.dispatch', route, undefined));
  }
}
