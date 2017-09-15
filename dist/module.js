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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mod = __webpack_require__(6);

var res = (0, _mod.sum)(_mod.a, 2); /**
                                    需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
                                    // 报错
                                    export 1;
                                    
                                    // 报错
                                    var m = 1;
                                    export m;
                                    
                                    // 写法一
                                    export var m = 1;
                                    
                                    // 写法二
                                    var m = 1;
                                    export {m};
                                    
                                    // 写法三
                                    var n = 1;
                                    export {n as m};
                                    
                                    
                                    export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
                                    
                                    export var foo = 'bar';
                                    setTimeout(() => foo = 'baz', 500);
                                    上面代码输出变量foo，值为bar，500毫秒之后变成baz。
                                    这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新
                                    
                                    
                                    export命令可以出现在模块的任何位置，只要处于模块顶层就可以。
                                    如果处于块级作用域内，就会报错，下一节的import命令也是如此
                                    这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
                                    
                                    
                                    import命令具有提升效果，会提升到整个模块的头部，首先执行。
                                    
                                    foo();
                                    import { foo } from 'my_module';
                                    
                                    上面的代码不会报错，因为import的执行早于foo的调用。
                                    这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。
                                    由于import是静态执行，所以不能使用表达式和变量
                                    如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
                                    import语句是 Singleton 模式。
                                    
                                    import * as circle from './circle';
                                    
                                    console.log('圆面积：' + circle.area(4));
                                    console.log('圆周长：' + circle.circumference(14));
                                    注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的
                                    ，所以不允许运行时改变。下面的写法都是不允许的。
                                    
                                    
                                    
                                    import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，也会加载指定的模块。
                                    另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
                                    
                                    import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
                                    
                                    */

console.log(res);

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sum = sum;
var a = exports.a = 10;
function sum(x, y) {
	return x + y;
}

/***/ })

/******/ });