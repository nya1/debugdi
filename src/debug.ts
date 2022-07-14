import debug, { Debugger } from "debug";

export class DebugLog {
  public __debugInstance: Debugger;

  constructor(namespace: string) {
    this.__debugInstance = debug(namespace);
  }

  /**
   * create debug log, prefix of the class will be automatically added
   */
  log(formatter: any, ...args: any[]): void {
    this.__debugInstance(formatter, ...args);
  }
}
