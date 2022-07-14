# debugdi

debug log package built for Inversify (dependency injection framework), **automatically** prefix your debug logs with the project name and class name

Example:

```ts
// package.json name "server"
// class TestService ...
debug.log('hello')
```

Logs (with DEBUG=server:*):

```
server:TestService hello
```

## Install

```bash
yarn add debugdi
```

## Usage

In your class inject the `DebugLog` class and call the log method, internally it's using the [debug](https://www.npmjs.com/package/debug) module so you need to enable the debug logs via the env variable `DEBUG=<project name>:*`

Example

```ts
export class TestService {
  constructor(@inject(DebugLog) private debug: DebugLog) {}

  myMethod(username: string) {
    this.debug.log(`hello ${username}`);
  }
}

// log output:
// <project name>:TestService hello <dynamic>
```
