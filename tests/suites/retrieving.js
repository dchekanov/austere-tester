var assert = require('assert');

module.exports = function(getNewTester, noop) {
  var tester = getNewTester();

  tester.plan('retrieving', noop);

  /* by idx */

  assert(tester.get(0).name == 'retrieving');
  assert(tester.get(0).procedure == noop);

  /* by name */

  assert(tester.get('retrieving').name == 'retrieving');
  assert(tester.get('retrieving').procedure == noop);
};
