var AustereTester = require('../../index');

module.exports = function() {
  return new AustereTester({
    // keep console clean
    silent: true,
    // reduce timeout when running in Node.js to speed up testing
    timeout: typeof window == 'undefined' ? 50 : 1000,
    // handle errors
    exitOnError: false
  });
};
