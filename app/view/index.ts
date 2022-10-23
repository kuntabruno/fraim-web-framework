import { TemplateDelegate, compile } from 'handlebars';

import { EventEmitter } from '../event-emitter';
import { Model } from '../model';

import { IMediator } from '../mediator/mediator.interface';
import { IView } from './view.interface';

export class View extends EventEmitter implements IView {
  /**
   * @note _container value must be set using the ViewSettings decorator
   */
  protected _container: string;

  /**
   * @note _templateUrl value must be set using the ViewSettings decorator
   */
  private _templateUrl: string;
  private _templateDelegate: TemplateDelegate;

  constructor(mediator: IMediator) {
    super(mediator);
  }

  public init() {
    throw new Error(
      'View.prototype.initialize() is abstract and must implemented.'
    );
  }

  public dispose() {
    throw new Error(
      'View.prototype.dispose() is abstract and must implemented.'
    );
  }

  /**
   * @note This method must be implemented by their derived classes
   */
  bindDomEvents() {
    throw new Error(
      `View.prototype.bindDomEvents() is abstract and must implemented`
    );
  }

  /**
   * @note This method must be implemented by their derived classes
   */
  unbindDomEvents() {
    throw new Error(
      `View.prototype.unbindDomEvents() is abstract and must implemented`
    );
  }

  /**
   * 
   * @returns Promise<string>
   */
  private loadTemplate(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${this._templateUrl}`, {
                method: 'GET'
            });
            const htmlText = await response.text();
            resolve(htmlText);
        } catch (e) {
            reject(e);
        }
    });
  }

  private compileTemplate(source: string): Promise<HandlebarsTemplateDelegate<any>> {
      return new Promise((resolve, reject) => {
        try {
            const template = compile(source);
            resolve(template);
        } catch (e) {
            reject(e);
        } 
      });
  }

  private getTemplate() {
    return new Promise(async (resolve, reject) => {
       if (this._templateDelegate === null || this._templateDelegate === undefined) {
          try {
            const source = await this.loadTemplate();
            const template = await this.compileTemplate(source);
            this._templateDelegate = template;
            resolve(this._templateDelegate);
          } catch (e) {
            reject(e);
          }
       } else {
          resolve(this._templateDelegate);
       }
    });
  }

  protected renderTemplate(model: Model) {
    return new Promise(async (resolve, reject) => {
        try {
            // Generate HTML and append to the DOM 
            const html = this._templateDelegate(model);
            //$(this._container).html();
            // pass model to resolve so it can be used by
            // subviews and DOM event initializer
            resolve(model)
        } catch (e) {
            reject(e);
        }
    });
  }
}
