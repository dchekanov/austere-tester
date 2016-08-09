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

For a more complex example demonstrating async tests and serial and parallel running, please see [./examples/complex.js](./examples/complex.js) and API documentation.
 
## API

Described [here](./docs/api.md).

## License

[MIT](./LICENSE)
