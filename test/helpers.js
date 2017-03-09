// Test mode: no delay when failed jobs returned to queue.
process.env.NODE_ENV = 'test';

const Bluebird  = require('bluebird');
const Ironium   = require('..');


Bluebird.config({
  warnings:        false,
  longStackTraces: true
});


before(Ironium.purgeQueues);
after(Ironium.purgeQueues);


function reset() {
  Ironium.stop();
  Ironium.configure({});
  return Bluebird.delay(50);
}


module.exports = { reset };
