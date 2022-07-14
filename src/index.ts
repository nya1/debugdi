import { Container, decorate, injectable, interfaces } from "inversify";
import { DebugLog } from "./debug";
import { resolve } from "path";
import { readFileSync } from "fs";

export function SetupDebugLog(
  container: Container,
  options?: {
    framework?: "inversify";
    projectName?: string;
  }
) {
  // if project name is not provided as an option load it from the root package.json file
  let projectName = options?.projectName;
  if (!projectName) {
    // load from package.json
    const pathOfPackage = resolve("./package.json");
    const packageJsonLoaded = JSON.parse(
      readFileSync(pathOfPackage).toString()
    );
    if (!packageJsonLoaded?.name) {
      throw new Error(
        `unable to find 'name' in package.json loaded ${pathOfPackage}`
      );
    }
    projectName = packageJsonLoaded.name;
  }

  // TODO support other dependency inversion framework
  try {
    decorate(injectable(), DebugLog);
  } catch (err: any) {
    // forgive duplicate injectable attempts
    // ref https://github.com/inversify/InversifyJS/issues/1042
    if (!err?.message?.includes('Cannot apply @injectable decorator multiple times')) {
      throw err;
    }
  }
    
  container.bind(DebugLog).toDynamicValue((context: interfaces.Context) => {
    // get class name of caller
    // from https://github.com/inversify/InversifyJS/issues/576#issuecomment-367872944
    let className: string = context.currentRequest.parentRequest &&
      context.currentRequest.parentRequest.bindings.length &&
      context.currentRequest.parentRequest.bindings[0].implementationType &&
      (
        context.currentRequest.parentRequest.bindings[0]
          .implementationType as any
      ).name || '';

    return new DebugLog(`${projectName}:${className}`);
  });
}
