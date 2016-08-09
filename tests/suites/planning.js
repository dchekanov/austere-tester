var assert = require('assert');

module.exports = function(getNewTester, noop) {
  var tester = getNewTester();

  /* error when no options */

  assert.throws(function() {
    tester.plan();
  });

  assert(tester.tests.length == 0);

  /* error when no procedure */

  assert.throws(function() {
    tester.plan('name');
  });

  assert(tester.tests.length == 0);

  assert.throws(function() {
    tester.plan('name', null);
  });

  assert(tester.tests.length == 0);

  /* procedure */

  tester.plan(noop);

  assert(tester.tests.length == 1);
  assert(tester.tests[0].procedure == noop);

  /* name + procedure */

  tester = getNewTester();

  tester.plan('name', noop);

  assert(tester.tests.length == 1);
  assert(tester.tests[0].name == 'name');
  assert(tester.tests[0].procedure == noop);

  /* error when using the same name twice */

  tester = getNewTester();

  tester.plan('name', noop);

  assert.throws(function() {
    tester.plan('name', noop);
  });

  /* procedure + options */

  tester = getNewTester();

  tester.plan(noop, {timeout: 100});

  assert(tester.tests.length == 1);
  assert(tester.tests[0].procedure == noop);
  assert(tester.tests[0].options.timeout == 100);

  /* name + procedure + options */

  tester = getNewTester();

  tester.plan('name + procedure', noop, {timeout: 100});

  assert(tester.tests.length == 1);
  assert(tester.tests[0].name == 'name + procedure');
  assert(tester.tests[0].procedure == noop);
  assert(tester.tests[0].options.timeout == 100);
};
