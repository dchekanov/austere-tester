// Create an instance of the module:

var AustereTester = require('../index');
var tester = new AustereTester();

// Register test procedures directly:

tester.plan('test #1 with optional name', function() {
  return 'PASSING';
});

// Or define them first and then register:

var passingAsyncCallback = function(finished) {
  setTimeout(finished, 100);
};

var passingAsyncPromise = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 100);
  });
};

tester.plan(passingAsyncCallback);

// with options
tester.plan(passingAsyncPromise, {timeout: 500});

// Run:

console.log('--- in series: ');

// run all tests in series
tester.runAll()
  .then(function() {
    console.log('--- in parallel: ');
    // run all tests in parallel
    return tester.runAllInParallel();
  })
  .then(function() {
    console.log('--- one, failing: ');
    // make it fail by lowering the timeout setting
    tester.plan('lowered timeout', passingAsyncPromise, {timeout: 5});
    // run one test
    return tester.run('lowered timeout');
  });
