var assert = require('assert');

module.exports = function(getNewTester, noop) {
  var tester;
  var tests = [];

  /* execution */

  var counter = 0;

  function increaseCounter() {
    counter++;
  }

  tester = getNewTester();

  tester.plan('increase counter 1', increaseCounter);
  tester.plan('increase counter 2', increaseCounter);
  tester.plan('increase counter 3', increaseCounter);

  var execTest = tester
    .runAllInParallel()
    .then(function() {
      assert(counter == 3);
    });

  tests.push(execTest);

  /* order */

  /* sync */

  var syncInvocations = [];

  tester = getNewTester();

  tester.plan('invoke 1', function() {
    syncInvocations.push(1);
  });

  tester.plan('invoke 2', function() {
    syncInvocations.push(2);
  });

  var syncTest = tester
    .runAllInParallel()
    .then(function() {
      assert(syncInvocations.length == 2);
      assert(syncInvocations[0] == 1);
      assert(syncInvocations[1] == 2);
    });

  tests.push(syncTest);

  /* async callback */

  var callbackInvocations = [];

  tester = getNewTester();

  tester.plan('invoke 1', function(finished) {
    setTimeout(function() {
      callbackInvocations.push(1);
      finished();
    }, 10);
  });

  tester.plan('invoke 2', function() {
    callbackInvocations.push(2);
  });

  var callbackTest = tester
    .runAllInParallel()
    .then(function() {
      assert(callbackInvocations.length == 2);
      assert(callbackInvocations[0] == 2);
      assert(callbackInvocations[1] == 1);
    });

  tests.push(callbackTest);

  /* async promise */

  var promiseInvocations = [];

  tester = getNewTester();

  tester.plan('invoke 1', function(finished) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        promiseInvocations.push(1);
        resolve();
      }, 10);
    });
  });

  tester.plan('invoke 2', function() {
    return new Promise(function(resolve) {
      promiseInvocations.push(2);
      resolve();
    });
  });

  var promiseTest = tester
    .runAllInParallel()
    .then(function() {
      assert(promiseInvocations.length == 2);
      assert(promiseInvocations[0] == 2);
      assert(promiseInvocations[1] == 1);
    });

  tests.push(promiseTest);

  return Promise.all(tests);
};
