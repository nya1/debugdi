import { expect } from "./helper";

import { Container } from "inversify";
import { SetupDebugLog } from "../src";
import { DebugLog } from "../src/debug";

describe("IoC setup", () => {
  describe("inversify", () => {
    it("should bind debug log to container with default project name", () => {
      const container = new Container();
      SetupDebugLog(container);

      expect(container.isBound(DebugLog)).to.equal(
        true,
        "debug log should be present in container"
      );

      const debugLogInstance = container.get(DebugLog);
      // will load our package.json
      expect(debugLogInstance.__debugInstance.namespace.startsWith('debugdi:')).to.equal(true, 'debug namespace should start with debugdi:')
    });

    it("should bind debug log to container with custom project name", () => {
      const container = new Container();
      SetupDebugLog(container, {
        projectName: 'testproject'
      });

      const debugLogInstance = container.get(DebugLog);
      expect(debugLogInstance.__debugInstance.namespace.startsWith('testproject:')).to.equal(true);
    });
  });
});
