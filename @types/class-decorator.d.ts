declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
