import { expect } from "./helper";

import { Container, inject, injectable } from "inversify";
import { SetupDebugLog } from "../src";
import { DebugLog } from "../src/debug";
import sinon from 'sinon'

describe("DebugLog tests", () => {
  it('should log without class prefix', () => {
    const container = new Container();
    SetupDebugLog(container);

    const debug = container.get(DebugLog);

    const spy = sinon.stub(debug, '__debugInstance');

    debug.log("hello1");

    expect(spy).to.have.been.calledOnceWith("hello1");
    expect(debug.__debugInstance.namespace).to.be.equal('debugdi:');
  });

  it('should log with arguments and class prefix', () => {
    const container = new Container();
    SetupDebugLog(container);

    // create example class
    @injectable()
    class TestService {
      constructor(@inject(DebugLog) public debug: DebugLog) { }
      callme() {
        this.debug.log("all fine", { test: 1 }, "ok");
      }
    }
    container.bind(TestService).toSelf();

    const testServiceInstance = container.get(TestService);
    // stub
    const spy = sinon.stub(testServiceInstance.debug, '__debugInstance');
    // call example function    
    testServiceInstance.callme();

    expect(spy).to.have.been.calledOnceWith("all fine", { test: 1 }, "ok");
    expect(testServiceInstance.debug.__debugInstance.namespace).to.be.equal('debugdi:TestService');
  });
});
