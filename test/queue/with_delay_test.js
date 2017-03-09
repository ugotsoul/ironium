'use strict';
require('../helpers');
const assert      = require('assert');
const Ironium     = require('../..');
const ms          = require('ms');
const TimeKeeper  = require('timekeeper');


describe('Queue with delay', function() {

  const delayedQueue  = Ironium.queue('delayedJob');

  let queuedTime;

  before(function() {
    return delayedQueue.delayJob('delayed', '2m')
      .then(function(job) {
        queuedTime = job.queuedTime;
      });
  });

  before(Ironium.runOnce);

  it('should not process immediately', function() {
    const noProcessedJob = queuedTime + ms('2m') > Date.now();
    assert(noProcessedJob);
  });

  describe('after 1 minute', function() {
    before(function() {
      TimeKeeper.travel(Date.now() + ms('1m'));
    });

    before(Ironium.runOnce);

    it('should not process job', function() {
      const noProcessedJob = queuedTime + ms('2m') > Date.now();
      assert(noProcessedJob);
    });

    after(TimeKeeper.reset);
  });

  describe('after 2 minutes', function() {
    before(function() {
      TimeKeeper.travel(Date.now() + ms('3m'));
    });

    before(Ironium.runOnce);

    it('should process job', function() {
      const hasProcessedJob = Date.now() > queuedTime + ms('2m');
      assert(hasProcessedJob);
    });

    after(TimeKeeper.reset);
  });

});

