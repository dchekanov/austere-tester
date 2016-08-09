var assert = require('assert');

module.exports = function(getNewTester, noop) {
  var tester;
  var tests = [];

  /* sync */

  var syncCounter = 0;

  tester = getNewTester();

  tester.plan('increase counter', function() {
    syncCounter++;
  });

  var syncTest = tester
    .run(0)
    .then(function() {
      assert(syncCounter == 1);
    });

  tests.push(syncTest);

  /* async callback */

  tester = getNewTester();

  var callbackCounter = 0;

  tester.plan('increase counter', function(finished) {
    setTimeout(function() {
      callbackCounter++;
      finished();
    }, 10);
  });

  var callbackTest = tester
    .run(0)
    .then(function() {
      assert(callbackCounter == 1);
    });

  tests.push(callbackTest);

  /* async promise */

  tester = getNewTester();

  var promiseCounter = 0;

  tester.plan('increase counter', function() {
    return new Promise(function(resolve) {
      setTimeout(function() {
        promiseCounter++;
        resolve();
      }, 10);
    });
  });

  var promiseTest = tester
    .run(0)
    .then(function() {
      assert(promiseCounter == 1);
    });

  tests.push(promiseTest);

  /* callback timeout */

  tester = getNewTester();

  tester.plan('callback timeout', function(finished) {
    setTimeout(finished, tester.options.timeout + 10);
  });

  var callbackTimeoutTest = tester
    .run(0)
    .then(function() {
      assert.fail(true, false, 'Should have timed out', '==');
    })
    .catch(function(err) {
      // ignore the timeout error
      if (/timeout/i.test(err.message)) return;

      throw err;
    });

  tests.push(callbackTimeoutTest);

  /* promise timeout */

  tester = getNewTester();

  tester.plan('promise timeout', function() {
    return new Promise(function(resolve) {
      setTimeout(resolve, tester.options.timeout + 10);
    });
  });

  var promiseTimeoutTest = tester
    .run(0)
    .then(function() {
      assert.fail(true, false, 'Should have timed out', '==');
    })
    .catch(function(err) {
      // ignore the timeout error
      if (/timeout/i.test(err.message)) return;

      throw err;
    });

  tests.push(promiseTimeoutTest);

  /* custom timeout */

  tester = getNewTester();

  tester.plan('custom timeout', function(finished) {
    setTimeout(finished, 20);
  }, {timeout: 5});

  var customTimeoutTest = tester
    .run(0)
    .then(function() {
      assert.fail(true, false, 'Should have timed out', '==');
    })
    .catch(function(err) {
      // ignore the timeout error
      if (/timeout/i.test(err.message)) return;

      throw err;
    });

  tests.push(customTimeoutTest);

  return Promise.all(tests);
};
