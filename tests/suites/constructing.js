var assert = require('assert');
var AustereTester = require('../../index');

module.exports = function() {
  /* passed options are remembered */

  assert(new AustereTester({k: 'v'}).options.k == 'v');
};
