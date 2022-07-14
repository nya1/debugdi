import 'reflect-metadata';

import { Container, inject, injectable } from 'inversify';
import { SetupDebugLog } from '../src';
import { DebugLog } from '../src/debug';

// init
const container = new Container();
SetupDebugLog(container);

// no class (direct)
const debug = container.get(DebugLog);
debug.log('testing direct log here (no class)')


// using a class
@injectable()
class LoremIpsumService {
  constructor(@inject(DebugLog) private debug: DebugLog) { }
  
  hello() {
    this.debug.log('called within a class!');
  }
}
container.bind(LoremIpsumService).toSelf();
const loremIpsumServ = container.get(LoremIpsumService);

loremIpsumServ.hello();

