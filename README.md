<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# forEachRightAsync

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Invoke a function once for each element in a collection, iterating from right to left.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="installation">

## Installation

```bash
npm install @stdlib/utils-async-for-each-right
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var forEachRightAsync = require( '@stdlib/utils-async-for-each-right' );
```

#### forEachRightAsync( collection, \[options,] fcn, done )

Invokes a function once for each element in a `collection`, iterating from right to left.

```javascript
function onDuration( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next();
    }
}

function done( error ) {
    if ( error ) {
        throw error;
    }
}

var arr = [ 1000, 2500, 3000 ];

forEachRightAsync( arr, onDuration, done );
/* =>
    1000
    2500
    3000
*/
```

The function accepts the following `options`:

-   **limit**: the maximum number of pending invocations at any one time. Default: `infinity`.
-   **series**: boolean indicating whether to sequentially invoke `fcn` for each `collection` element. If `true`, the function sets `options.limit=1`. Default: `false`.
-   **thisArg**: the execution context for `fcn`.

By default, all elements are processed concurrently, which means that the function does **not** guarantee completion order. To process each `collection` element sequentially, set the `series` option to `true`.

```javascript
function onDuration( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next();
    }
}

function done( error ) {
    if ( error ) {
        throw error;
    }
}

var arr = [ 1000, 2500, 3000 ];

var opts = {
    'series': true
};

forEachRightAsync( arr, opts, onDuration, done );
/* =>
    3000
    2500
    1000
*/
```

To limit the maximum number of pending function invocations, set the `limit` option.

```javascript
function onDuration( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next();
    }
}

function done( error ) {
    if ( error ) {
        throw error;
    }
}

var arr = [ 1000, 2500, 3000 ];

var opts = {
    'limit': 2
};

forEachRightAsync( arr, opts, onDuration, done );
/* =>
    2500
    3000
    1000
*/
```

To set the execution context of `fcn`, set the `thisArg` option.

```javascript
function onDuration( value, next ) {
    this.count += 1;
    setTimeout( onTimeout, value );
    function onTimeout() {
        next();
    }
}

var arr = [ 1000, 2500, 3000 ];

var context = {
    'count': 0
};

var opts = {
    'thisArg': context
};

forEachRightAsync( arr, opts, onDuration, done );

function done( error ) {
    if ( error ) {
        throw error;
    }
    console.log( context.count );
    // => 3
}
```

When invoked, `fcn` is provided a maximum of four arguments:

-   **value**: collection value.
-   **index**: collection index.
-   **collection**: the input `collection`.
-   **next**: a callback which should be called once `fcn` has finished processing a collection `value`.

The actual number of provided arguments depends on function `length`. If `fcn` accepts two arguments, `fcn` is provided `value` and `next`. If `fcn` accepts three arguments, `fcn` is provided `value`, `index`, and `next`. For every other `fcn` signature, `fcn` is provided all four arguments.

```javascript
function onDuration( value, i, collection, next ) {
    console.log( 'collection: %s. %d: %d', collection.join( ',' ), i, value );
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next();
    }
}

function done( error ) {
    if ( error ) {
        throw error;
    }
}

var arr = [ 1000, 2500, 3000 ];

forEachRightAsync( arr, onDuration, done );
/* =>
    collection: 3000,2500,1000. 2: 3000
    collection: 3000,2500,1000. 1: 2500
    collection: 3000,2500,1000. 0: 1000
    1000
    2500
    3000
*/
```

#### forEachRightAsync.factory( \[options,] fcn )

Returns a `function` which invokes a function once for each element in a `collection`, iterating from right to left.

```javascript
function onDuration( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next();
    }
}

function done( error ) {
    if ( error ) {
        throw error;
    }
}

var f = forEachRightAsync.factory( onDuration );

var arr1 = [ 1000, 2500, 3000 ];

f( arr1, done );
/* =>
    1000
    2500
    3000
*/

var arr2 = [ 100, 250, 300 ];

f( arr2, done );
/* =>
    100
    250
    300
*/
```

The function accepts the same `options` as `forEachRightAsync()`.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   A `collection` may be either an [`Array`][mdn-array], [`Typed Array`][mdn-typed-array], or an array-like [`Object`][mdn-object] (excluding `strings` and `functions`).
-   If a provided function calls the `next` callback with a truthy `error` argument, the function suspends execution and immediately calls the `done` callback for subsequent `error` handling.
-   The function does **not** support dynamic `collection` resizing.
-   The function does **not** skip `undefined` elements.
-   **Neither** `forEachRightAsync` nor the function returned by the `factory` method **guarantee** asynchronous execution. To guarantee asynchrony, wrap the `done` callback in a function which either executes at the end of the current stack (e.g., `nextTick`) or during a subsequent turn of the event loop (e.g., `setImmediate`, `setTimeout`).

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs-read-file' );
var forEachRightAsync = require( '@stdlib/utils-async-for-each-right' );

var files = [
    resolve( __dirname, 'package.json' ),
    resolve( __dirname, 'README.md' )
];

function done( error ) {
    if ( error ) {
        throw error;
    }
    console.log( 'Successfully read all files.' );
}

function read( file, next ) {
    var opts = {
        'encoding': 'utf8'
    };
    readFile( file, opts, onFile );

    function onFile( error ) {
        if ( error ) {
            error = new Error( 'unable to read file: '+file );
            return next( error );
        }
        console.log( 'Successfully read file: %s', file );
        next();
    }
}

forEachRightAsync( files, read, done );
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/utils-async/for-each`][@stdlib/utils/async/for-each]</span><span class="delimiter">: </span><span class="description">invoke a function once for each element in a collection.</span>
-   <span class="package-name">[`@stdlib/utils-for-each-right`][@stdlib/utils/for-each-right]</span><span class="delimiter">: </span><span class="description">invoke a function for each element in a collection, iterating from right to left.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/utils-async-for-each-right.svg
[npm-url]: https://npmjs.org/package/@stdlib/utils-async-for-each-right

[test-image]: https://github.com/stdlib-js/utils-async-for-each-right/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/utils-async-for-each-right/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/utils-async-for-each-right/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/utils-async-for-each-right?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/utils-async-for-each-right.svg
[dependencies-url]: https://david-dm.org/stdlib-js/utils-async-for-each-right/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/utils-async-for-each-right/tree/deno
[deno-readme]: https://github.com/stdlib-js/utils-async-for-each-right/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/utils-async-for-each-right/tree/umd
[umd-readme]: https://github.com/stdlib-js/utils-async-for-each-right/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/utils-async-for-each-right/tree/esm
[esm-readme]: https://github.com/stdlib-js/utils-async-for-each-right/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/utils-async-for-each-right/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/utils-async-for-each-right/main/LICENSE

[mdn-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[mdn-object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

<!-- <related-links> -->

[@stdlib/utils/async/for-each]: https://github.com/stdlib-js/utils-async-for-each

[@stdlib/utils/for-each-right]: https://github.com/stdlib-js/utils-for-each-right

<!-- </related-links> -->

</section>

<!-- /.links -->
