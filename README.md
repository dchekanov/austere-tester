# austere-tester

A humble tool to aid with testing JavaScript code.

* Works in Node.js and in browsers.
* Runs synchronous and asynchronous tests with configurable timeouts, in series and in parallel.
* Has first-class Promise support.
* Works with any assertion library.
* Provides test execution metrics.
* No magic - no global variables, preserves tested functions context.
* No bloat - zero dependencies, simple API, ~ 100 NCLOC.

## Installation and usage

### Requirements 

The environment must provide a native or shimmed implementation of the following ES6 and ES5 features:

* Promise
* Object.assign
* Array.prototype.find
* Array.prototype.map

For native implementation, it translates to Node.js >= 4.0 and most modern browsers (excluding IE).

Apply your favourite shims to use the module in older environments.

### Installation

```sh
$ npm install austere-tester --save-dev
```

To use in a browser, include `./index.js` via the `script` tag - it will make `AustereTester` available in the global scope.

Alternatively, use [Browserify](http://browserify.org/) or [webpack](https://webpack.github.io/) or other CommonJS bundler.

### Workflow

`austere-tester` is a lightweight utility that helps to run tests.
It does not dictate how you should write and arrange them. 

1. Write down a set of functions that test your code. 
Make them `throw` an `Error` when test is failing - either with a plain `throw new Error('Message');` or with any assertion library.
2. Register those functions with `austere-tester`.
3. Ask it to run registered functions.
4. Check output for errors. 

### Examples

```javascript
// ./examples/basic.js:

// Create an instance of the module:
var AustereTester = require('austere-tester');
var tester = new AustereTester();

// Register a test procedure:
tester.plan('basic test', function() {
  return 'passing';
});

// Run it:
tester.run('basic test');
```

```
$ node examples/basic
[austere-tester] run PASSED in 0 ms - basic test
```

In many cases you can run synchronous tests like the one shown above without using special tools. 

Taming asynchronyous tests is a more complicated task, since you need to put extra efforts to catch errors, 
to handle timeouts, and often to perform operations in a strict order. 

This is where `austere-tester` is most useful.

Async tests can be planned like this:

```javascript
tester.plan('async with callback', function(finished) {
  setTimeout(finished, 100);
});

tester.plan('async with promise', function() {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 100);
  });
});
```

When you need to run a set of tests:

```javascript
// runs all planned tests one by one, FIFO
tester.runAll();

// runs all planned tests in parallel
tester.runAllInParallel();
```

For more examples demonstrating planning and running tests, please see [./examples/complex.js](./examples/complex.js) and API documentation.
 
## API

Described [here](./docs/api.md).

## License

[MIT](./LICENSE)
