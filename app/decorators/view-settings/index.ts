export function ViewSettings<TFunction extends Function>(templateUrl: string, container: string) {
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
            instance._container = container;
            instance._templateUrl = templateUrl;
            return instance;
        }

        // the new constructor behavior
        const newConstructor = (...args: any[]) => {
            return instantiate(originalConstructor, args);
        };

        // copy prototype so instanceof operator still works
        newConstructor.prototype = originalConstructor.prototype;
        // return new constructor (will override original)
        return newConstructor;
    }
}