export function ModelSettings<TFunction extends Function>(serviceUrl: string) {
  return function (target: TFunction) {
    // save a reference to the original constructor
    const originalConstructor = target;

    // a utility function to generate an instances of a class
    function instantiate(constructor: any, args: any[]) {
      const c: any = function () {
        return new constructor(...args);
      };
      c.prototype = constructor.prototype;
      const instance = new c();
      instance._serviceUrl = serviceUrl;
      return instance;
    }
    // the new constructor behaviour
    const newConstructor: any = function (...args: any[]) {
      return instantiate(originalConstructor, args);
    };
    // copy prototype so intanceof operator still works
    newConstructor.prototype = originalConstructor.prototype;
    // return new constructor (will override original)
    return newConstructor;
  };
}
