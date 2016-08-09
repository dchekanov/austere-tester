// Create an instance of the module:
var AustereTester = require('../index');
var tester = new AustereTester();

// Register a test procedure:
tester.plan('basic test', function() {
  return 'passing';
});

// Run it:
tester.run('basic test');
