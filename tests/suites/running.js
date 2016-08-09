var assert = require('assert');

module.exports = function(getNewTester, noop) {
  var tester = getNewTester();

  tester.plan('passing', noop);

  /* doesn't break easily */

  assert.doesNotThrow(function() {
    tester.run(0);
    tester.runAll();
    tester.runAllInParallel();
  });

  /* returns a promise */

  assert(tester.run(0) instanceof Promise);
  assert(tester.runAll() instanceof Promise);
  assert(tester.runAllInParallel() instanceof Promise);
};
