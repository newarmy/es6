/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(4);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(2)))

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = [hwgenerator, f, gen, ff, foo111, foo, objectEntries, objEntry, foo12, ggg, numbers, foo1, bar1, bar2, bar3].map(_regenerator2.default.mark);

//引入腻子脚本
//require('babel-polyfill');
//import 'babel-polyfill';
//import 'transform-runtime';
//import 'babel-regenerator-runtime';

//Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同
//Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态

/*
 Generator 函数是一个普通函数，但是有两个特征。
 一是，function关键字与函数名之间有一个星号；
 二是，函数体内部使用yield语句，定义不同的内部状态

 Generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，
 调用Generator函数后，该函数并不执行，
 返回的也不是函数运行结果，而是一个指向内部状态的指针对象，
 也就是上一章介绍的遍历器对象（Iterator Object）。


 Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。



调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。
以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，
是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束

yield: 函数暂停执行，下一次再从该位置继续向后执行，
return: 语句不具备位置记忆的功能

*/
function hwgenerator() {
  return _regenerator2.default.wrap(function hwgenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello';

        case 2:
          _context.next = 4;
          return 'world';

        case 4:
          return _context.abrupt('return', 'ending');

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var gIterater = hwgenerator();
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = gIterater[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var v = _step.value;

    console.log(v);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

console.log('------------------------------------------------------------------------');

/*
  Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。
  yield语句只能用在 Generator 函数里面，用在其他地方都会报错
*/

function f() {
  return _regenerator2.default.wrap(function f$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('excuting');

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}
var gobj = f();
setTimeout(function () {
  gobj.next();
});
console.log('------------------------------------------------------------------------');

/*
  yield语句如果用在一个表达式之中，必须放在圆括号里面
  function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}

yield语句用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
*/

// 由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，
//从而使得该对象具有Iterator接口。

var myIterable = {};
myIterable[Symbol.iterator] = _regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return 1;

        case 2:
          _context3.next = 4;
          return 2;

        case 4:
          _context3.next = 6;
          return 3;

        case 6:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee, this);
});
var arr = [].concat(_toConsumableArray(myIterable));
console.log(arr);
//---------------------------------------------------------------------------------
/*
* Generator函数执行后，返回一个遍历器对象。
 该对象本身也具有Symbol.iterator属性，执行后返回自身。
*/
function gen() {
  return _regenerator2.default.wrap(function gen$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[2], this);
}
var g = gen();
console.log(g[Symbol.iterator]() == g);
//----------------------------------------------------------------------------------

/***
yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，
该参数就会被当作上一个yield语句的返回值。
*/
function ff() {
  var i, reset;
  return _regenerator2.default.wrap(function ff$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          i = 0;

        case 1:
          if (false) {
            _context5.next = 9;
            break;
          }

          _context5.next = 4;
          return i;

        case 4:
          reset = _context5.sent;

          if (reset) {
            i = -1;
          }

        case 6:
          i++;
          _context5.next = 1;
          break;

        case 9:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[3], this);
}
var gg = ff();
console.log(gg.next());
console.log(gg.next());
console.log(gg.next(true));
console.log(gg.next());
console.log('---------------------------------------------');
console.log('--------generator传值-----------');
function foo111(x) {
  var y, z;
  return _regenerator2.default.wrap(function foo111$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return x + 1;

        case 2:
          _context6.t0 = _context6.sent;
          y = 2 * _context6.t0;

          console.log('y = ' + y);
          _context6.next = 7;
          return y / 3;

        case 7:
          z = _context6.sent;

          console.log('z = ' + z);
          return _context6.abrupt('return', x + y + z);

        case 10:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[4], this);
}
var gnr = foo111(5);
//console.log(gnr);
console.log(gnr.next());
console.log(gnr.next(2));
console.log(gnr.next(3));
console.log(gnr.next(4));
console.log('--------generator传值-----------');
/*
*由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。
V8引擎直接忽略第一次使用next方法时的参数，
只有从第二次使用next方法开始，参数才是有效的。从语义上讲，
第一个next方法用来启动遍历器对象，所以不用带有参数。
*/

function wrapper(gf) {
  return function () {
    var go = gf.apply(undefined, arguments);
    go.next();
    return go;
  };
}

var wrapped = wrapper(_regenerator2.default.mark(function _callee2() {
  return _regenerator2.default.wrap(function _callee2$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log('Fisrt input: $(yield)');
          return _context7.abrupt('return', 'DONE');

        case 2:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee2, this);
}));

wrapped().next('hello!');
//for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。
/*

一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，
所以上面代码的return语句返回的6，不包括在for...of循环之中。
*/

function foo() {
  return _regenerator2.default.wrap(function foo$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return 1;

        case 2:
          _context8.next = 4;
          return 2;

        case 4:
          _context8.next = 6;
          return 3;

        case 6:
          _context8.next = 8;
          return 4;

        case 8:
          _context8.next = 10;
          return 5;

        case 10:
          return _context8.abrupt('return', 6);

        case 11:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked[5], this);
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = foo()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _v2 = _step2.value;

    console.log(_v2);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

console.log('----------------------------------------------------');
function objectEntries(obj) {
  var propKeys, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, propkey;

  return _regenerator2.default.wrap(function objectEntries$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          propKeys = Reflect.ownKeys(obj);
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context9.prev = 4;
          _iterator3 = propKeys[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context9.next = 13;
            break;
          }

          propkey = _step3.value;
          _context9.next = 10;
          return [propkey, obj[propkey]];

        case 10:
          _iteratorNormalCompletion3 = true;
          _context9.next = 6;
          break;

        case 13:
          _context9.next = 19;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9['catch'](4);
          _didIteratorError3 = true;
          _iteratorError3 = _context9.t0;

        case 19:
          _context9.prev = 19;
          _context9.prev = 20;

          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }

        case 22:
          _context9.prev = 22;

          if (!_didIteratorError3) {
            _context9.next = 25;
            break;
          }

          throw _iteratorError3;

        case 25:
          return _context9.finish(22);

        case 26:
          return _context9.finish(19);

        case 27:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked[6], this, [[4, 15, 19, 27], [20,, 22, 26]]);
}
var jane = { Fisrt: 'jane', last: 'Doe' };
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = objectEntries(jane)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _step4$value = _slicedToArray(_step4.value, 2),
        key = _step4$value[0],
        value = _step4$value[1];

    console.log(key + ': ' + value);
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4.return) {
      _iterator4.return();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

function objEntry() {
  var propKeys, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, pk;

  return _regenerator2.default.wrap(function objEntry$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          propKeys = Object.keys(this);
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context10.prev = 4;
          _iterator5 = propKeys[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
            _context10.next = 13;
            break;
          }

          pk = _step5.value;
          _context10.next = 10;
          return [pk, this[pk]];

        case 10:
          _iteratorNormalCompletion5 = true;
          _context10.next = 6;
          break;

        case 13:
          _context10.next = 19;
          break;

        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10['catch'](4);
          _didIteratorError5 = true;
          _iteratorError5 = _context10.t0;

        case 19:
          _context10.prev = 19;
          _context10.prev = 20;

          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }

        case 22:
          _context10.prev = 22;

          if (!_didIteratorError5) {
            _context10.next = 25;
            break;
          }

          throw _iteratorError5;

        case 25:
          return _context10.finish(22);

        case 26:
          return _context10.finish(19);

        case 27:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked[7], this, [[4, 15, 19, 27], [20,, 22, 26]]);
}

var xj = { first: 'xinjun', last: 'dong' };
xj[Symbol.iterator] = objEntry;
var _iteratorNormalCompletion6 = true;
var _didIteratorError6 = false;
var _iteratorError6 = undefined;

try {
  for (var _iterator6 = xj[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
    var _step6$value = _slicedToArray(_step6.value, 2),
        k = _step6$value[0],
        _v3 = _step6$value[1];

    console.log(k + ":" + _v3);
  }
} catch (err) {
  _didIteratorError6 = true;
  _iteratorError6 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion6 && _iterator6.return) {
      _iterator6.return();
    }
  } finally {
    if (_didIteratorError6) {
      throw _iteratorError6;
    }
  }
}

console.log('----------------------------------------------------------');

/**

除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，
都是遍历器接口。这意味着，它们都可以将Generator函数返回的Iterator对象，作为参数。
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
*/

//Generator函数返回的遍历器对象，都有一个throw方法，
//可以在函数体外抛出错误，然后在Generator函数体内捕获。

var g = _regenerator2.default.mark(function g() {
  return _regenerator2.default.wrap(function g$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return;

        case 3:
          _context11.next = 8;
          break;

        case 5:
          _context11.prev = 5;
          _context11.t0 = _context11['catch'](0);

          console.log('inner', _context11.t0);

        case 8:
        case 'end':
          return _context11.stop();
      }
    }
  }, g, this, [[0, 5]]);
});

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('outer', e);
}
//throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法。

var gen11 = _regenerator2.default.mark(function gen11() {
  return _regenerator2.default.wrap(function gen11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return console.log('a');

        case 3:
          _context12.next = 7;
          break;

        case 5:
          _context12.prev = 5;
          _context12.t0 = _context12['catch'](0);

        case 7:
          _context12.next = 9;
          return console.log('b');

        case 9:
          _context12.next = 11;
          return console.log('c');

        case 11:
        case 'end':
          return _context12.stop();
      }
    }
  }, gen11, this, [[0, 5]]);
});

var g111 = gen11();
console.log(g111.next()); // a
console.log(g111.throw()); // b
console.log(g111.next()); // c

//只要Generator函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历

/**
这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield语句，可以只用一个try...catch代码块来捕获错误。
如果使用回调函数的写法，想要捕获多个错误，
就不得不为每个函数内部写一个错误处理语句，现在只在Generator函数内部写一次catch语句就可以了。

Generator函数体外抛出的错误，可以在函数体内捕获；反过来，
Generator函数体内抛出的错误，也可以被函数体外的catch捕获
**/

function foo12() {
  var x, y;
  return _regenerator2.default.wrap(function foo12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return 3;

        case 2:
          x = _context13.sent;
          y = x.toUpperCase();
          _context13.next = 6;
          return y;

        case 6:
        case 'end':
          return _context13.stop();
      }
    }
  }, _marked[8], this);
}

var it = foo12();

var d = it.next(); // { value:3, done:false }
console.log(d);
try {
  var dd = it.next(80);
  console.log(dd);
} catch (err) {
  console.log(err.message);
}

//  

//旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，
//将返回一个value属性等于undefined、done属性等于true的对象，
//即JavaScript引擎认为这个Generator已经运行结束了。

function ggg() {
  return _regenerator2.default.wrap(function ggg$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return 1;

        case 2:
          console.log('throwing an exception');
          throw new Error('generator broke!');

        case 6:
          _context14.next = 8;
          return 3;

        case 8:
        case 'end':
          return _context14.stop();
      }
    }
  }, _marked[9], this);
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('first next excuting', v);
  } catch (err) {
    console.log(' catch 1', v);
  }
  try {
    v = generator.next();
    console.log('second next excuting', v);
  } catch (err) {
    console.log('catch 2', v);
  }
  try {
    v = generator.next();
    console.log('third next excuting', v);
  } catch (err) {
    console.log('catch 3', v);
  }
  console.log('caller done');
}

log(ggg());

/**
Generator.prototype.return()
Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，
并且终结遍历Generator函数。
如果return方法调用时，不提供参数，则返回值的value属性为undefined。

如果Generator函数内部有try...finally代码块，
那么return方法会推迟到finally代码块执行完再执行。
*/

function numbers() {
  return _regenerator2.default.wrap(function numbers$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return 1;

        case 2:
          _context15.prev = 2;
          _context15.next = 5;
          return 2;

        case 5:
          _context15.next = 7;
          return 3;

        case 7:
          _context15.prev = 7;
          _context15.next = 10;
          return 4;

        case 10:
          _context15.next = 12;
          return 5;

        case 12:
          return _context15.finish(7);

        case 13:
          _context15.next = 15;
          return 6;

        case 15:
        case 'end':
          return _context15.stop();
      }
    }
  }, _marked[10], this, [[2,, 7, 13]]);
}
var g = numbers();
console.log(g.next()); // { done: false, value: 1 }
console.log(g.next()); // { done: false, value: 2 }
console.log(g.return(7)); // { done: false, value: 4 }
console.log(g.next()); // { done: false, value: 5 }
console.log(g.next()); // { done: true, value: 7 }console.l)og(
/*
上面代码中，调用return方法后，就开始执行finally代码块，
然后等到finally代码块执行完，再执行return方法。
*/

// yield* 语句
/*
如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
这个就需要用到yield*语句，用来在一个 Generator 函数里面执行另一个 Generator 函数
*/

function foo1() {
  return _regenerator2.default.wrap(function foo1$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return 'a';

        case 2:
          _context16.next = 4;
          return 'b';

        case 4:
        case 'end':
          return _context16.stop();
      }
    }
  }, _marked[11], this);
}
function bar1() {
  return _regenerator2.default.wrap(function bar1$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return 'x';

        case 2:
          return _context17.delegateYield(foo1(), 't0', 3);

        case 3:
          _context17.next = 5;
          return 'y';

        case 5:
        case 'end':
          return _context17.stop();
      }
    }
  }, _marked[12], this);
}

//等同于
// 等同于
function bar2() {
  return _regenerator2.default.wrap(function bar2$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return 'x';

        case 2:
          _context18.next = 4;
          return 'a';

        case 4:
          _context18.next = 6;
          return 'b';

        case 6:
          _context18.next = 8;
          return 'y';

        case 8:
        case 'end':
          return _context18.stop();
      }
    }
  }, _marked[13], this);
}

// 等同于
function bar3() {
  var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _v;

  return _regenerator2.default.wrap(function bar3$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return 'x';

        case 2:
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context19.prev = 5;
          _iterator7 = foo()[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
            _context19.next = 14;
            break;
          }

          _v = _step7.value;
          _context19.next = 11;
          return _v;

        case 11:
          _iteratorNormalCompletion7 = true;
          _context19.next = 7;
          break;

        case 14:
          _context19.next = 20;
          break;

        case 16:
          _context19.prev = 16;
          _context19.t0 = _context19['catch'](5);
          _didIteratorError7 = true;
          _iteratorError7 = _context19.t0;

        case 20:
          _context19.prev = 20;
          _context19.prev = 21;

          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }

        case 23:
          _context19.prev = 23;

          if (!_didIteratorError7) {
            _context19.next = 26;
            break;
          }

          throw _iteratorError7;

        case 26:
          return _context19.finish(23);

        case 27:
          return _context19.finish(20);

        case 28:
          _context19.next = 30;
          return 'y';

        case 30:
        case 'end':
          return _context19.stop();
      }
    }
  }, _marked[14], this, [[5, 16, 20, 28], [21,, 23, 27]]);
}

/**
 从语法角度看，如果yield命令后面跟的是一个遍历器对象，
 需要在yield命令后面加上星号，
 表明它返回的是一个遍历器对象。这被称为yield*语句
*/

/***/ })
/******/ ]);