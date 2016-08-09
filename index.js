/**
 * Creates a new AustereTester instance.
 * @param {Object} [options] - global settings; can be overridden by a particular test
 * @param {number} [options.timeout] - how long to wait for async tests to finish
 * @param {boolean} [options.silent] - whether to report anything back
 * @param {boolean} [options.exitOnError] - whether to terminate the process on error
 * @param {string} [options.logPrefix] - a prefix to differentiate between the tool messages and other kinds of output
 * @constructor
 */
function AustereTester(options) {
  this.options = Object.assign({
    timeout: 1000,
    exitOnError: true,
    logPrefix: '[austere-tester]'
  }, options);

  this.tests = [];
}

/**
 * Adds a procedure to the list of planned tests.
 * @param {...(string|Function|Object)} var_args - an optional unique name followed by a mandatory test procedure and optional settings override
 * @example
 * // function
 * tester.plan(function() {});
 *
 * // a reference to function
 * tester.plan(functionReference);
 *
 * // function + options
 * tester.plan(function() {}, {timeout: 5000});
 *
 * // name + function
 * tester.plan('optional name', function() {});
 *
 * // name + function + options
 * tester.plan('optional name and settings', function() {}, {timeout: 3000});
 */
AustereTester.prototype.plan = function(var_args) {
  if (!arguments.length || (typeof arguments[0] != 'function' && typeof arguments[1] != 'function')) {
    throw new Error('A function or a function reference was not provided');
  }

  if (typeof arguments[0] == 'string' && this.get(arguments[0])) {
    throw new Error('A test with the "' + arguments[0] + '" name is already registered - pick another');
  }

  this.tests.push({
    name: typeof arguments[0] == 'string' ? arguments[0] : 'test #' + (this.tests.length + 1),
    procedure: typeof arguments[0] == 'string' ? arguments[1] : arguments[0],
    options: typeof arguments[0] == 'string' ? arguments[2] : arguments[1]
  });
};

/**
 * Returns a planned test specified by index or by name.
 * @param {string|number} id - the index (zero-based) or the name of the test
 * @returns {Object|undefined}
 */
AustereTester.prototype.get = function(id) {
  return typeof id == 'number' ? this.tests[id] : this.tests.find(function(el) {
    return el.name === id;
  });
};

/**
 * Runs a single test.
 * @param {string|number} id - the index (zero-based) or the name of the test to run
 * @returns {Promise}
 */
AustereTester.prototype.run = function(id) {
  if (typeof id == 'undefined') throw new Error('Test id was not specified');

  var test = this.get(id);

  if (!test) throw new Error('A test with the specified id was not found');

  var options = Object.assign({}, this.options, test.options);
  var start;
  var end;

  var promise = new Promise(function(resolve, reject) {
    function resolver() {
      // not necessary, but allows the process to exit sooner
      clearTimeout(timeout);
      resolve();
    }

    // capture stack trace here as it will be of little use when captured in setTimeout
    var err = new Error('Timeout: ' + options.timeout + ' ms.');

    var timeout = setTimeout(function() {
      reject(err);
    }, options.timeout);

    start = new Date();

    var result = test.procedure(resolver);

    if (result && result.then) {
      // not resolving with a promise directly so it can be timed out
      result.then(resolver).catch(reject);
    } else {
      if (!test.procedure.length) {
        // setting the resolution timestamp here for synchronous procedures makes execution time calculation more precise
        end = new Date();
        resolver();
      }
    }
  });

  promise
    .then(function() {
      var duration = (end || new Date()) - start;

      if (!options.silent) console.log('%s run PASSED in %d ms - %s', options.logPrefix, duration, test.name);
    })
    .catch(function(err) {
      if (!options.silent) {
        console.error('%s run FAILED - %s', options.logPrefix, test.name);
        console.error(err.stack);
      }

      if (options.exitOnError && process && process.exit) process.exit(1);
    });

  return promise;
};

/**
 * Runs all planned tests one by one.
 * @returns {Promise}
 */
AustereTester.prototype.runAll = function() {
  var instance = this;
  var idx = -1;
  var start = new Date();

  function cycle() {
    idx++;
    if (!instance.get(idx)) return Promise.resolve();

    return instance.run(idx).then(function(result) {
      return cycle();
    });
  }

  return cycle()
    .then(function() {
      if (!instance.options.silent) {
        var duration = new Date() - start;

        console.log('%s runAll PASSED in %d ms', instance.options.logPrefix, duration);
      }
    });
};

/**
 * Runs all planned tests at the same time.
 * @returns {Promise}
 */
AustereTester.prototype.runAllInParallel = function() {
  var instance = this;
  var start = new Date();

  return Promise
    .all(instance.tests.map(function(el) {
      return instance.run(el.name);
    }))
    .then(function() {
      if (!instance.options.silent) {
        var duration = new Date() - start;

        console.log('%s runAllInParallel PASSED in %d ms', instance.options.logPrefix, duration);
      }
    });
};

module.exports = AustereTester;
