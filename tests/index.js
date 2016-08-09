var getNewTester = require('./fixtures/get-new-tester');

var suites = [
  require('./suites/constructing'),
  require('./suites/planning'),
  require('./suites/retrieving'),
  require('./suites/running'),
  require('./suites/running.one'),
  require('./suites/running.all.serial'),
  require('./suites/running.all.parallel')
];

var suitesRun = suites.map(function(suite) {
  return suite(getNewTester, new Function());
});

Promise
  .all(suitesRun)
  .then(function() {
    console.log('All tests passed');
    if (process && process.exit) process.exit(0);
  })
  .catch(function(err) {
    console.error(err.stack);
    if (process && process.exit) process.exit(1);
  });
