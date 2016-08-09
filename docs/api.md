<a name="AustereTester"></a>

## AustereTester
**Kind**: global class  

* [AustereTester](#AustereTester)
    * [new AustereTester([options])](#new_AustereTester_new)
    * [.plan(...var_args)](#AustereTester+plan)
    * [.get(id)](#AustereTester+get) ⇒ <code>Object</code> &#124; <code>undefined</code>
    * [.run(id)](#AustereTester+run) ⇒ <code>Promise</code>
    * [.runAll()](#AustereTester+runAll) ⇒ <code>Promise</code>
    * [.runAllInParallel()](#AustereTester+runAllInParallel) ⇒ <code>Promise</code>

<a name="new_AustereTester_new"></a>

### new AustereTester([options])
Creates a new AustereTester instance.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | global settings; can be overridden by a particular test |
| [options.timeout] | <code>number</code> | how long to wait for async tests to finish |
| [options.silent] | <code>boolean</code> | whether to report anything back |
| [options.exitOnError] | <code>boolean</code> | whether to terminate the process on error |
| [options.logPrefix] | <code>string</code> | a prefix to differentiate between the tool messages and other kinds of output |

<a name="AustereTester+plan"></a>

### austereTester.plan(...var_args)
Adds a procedure to the list of planned tests.

**Kind**: instance method of <code>[AustereTester](#AustereTester)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...var_args | <code>string</code> &#124; <code>function</code> &#124; <code>Object</code> | an optional unique name followed by a mandatory test procedure and optional settings override |

**Example**  
```js
// function
tester.plan(function() {});

// a reference to function
tester.plan(functionReference);

// function + options
tester.plan(function() {}, {timeout: 5000});

// name + function
tester.plan('optional name', function() {});

// name + function + options
tester.plan('optional name and settings', function() {}, {timeout: 3000});
```
<a name="AustereTester+get"></a>

### austereTester.get(id) ⇒ <code>Object</code> &#124; <code>undefined</code>
Returns a planned test specified by index or by name.

**Kind**: instance method of <code>[AustereTester](#AustereTester)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> &#124; <code>number</code> | the index (zero-based) or the name of the test |

<a name="AustereTester+run"></a>

### austereTester.run(id) ⇒ <code>Promise</code>
Runs a single test.

**Kind**: instance method of <code>[AustereTester](#AustereTester)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> &#124; <code>number</code> | the index (zero-based) or the name of the test to run |

<a name="AustereTester+runAll"></a>

### austereTester.runAll() ⇒ <code>Promise</code>
Runs all planned tests one by one.

**Kind**: instance method of <code>[AustereTester](#AustereTester)</code>  
<a name="AustereTester+runAllInParallel"></a>

### austereTester.runAllInParallel() ⇒ <code>Promise</code>
Runs all planned tests at the same time.

**Kind**: instance method of <code>[AustereTester](#AustereTester)</code>  
