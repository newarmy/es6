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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//引入腻子脚本
//require('babel-polyfill');

function testSymbol() {
	var _obj;

	var s = Symbol();
	var type = typeof s === 'undefined' ? 'undefined' : _typeof(s);
	console.log('-------------------------------------');
	console.log(type);
	console.log('-------------------------------------');
	var s1 = Symbol('ddd');
	console.log(s1);
	var obj = {
		toString: function toString() {
			return 'aaa';
		}
	};
	var s2 = Symbol(obj);
	console.log(s2.toString());
	var a = {};
	//Symbol值作为对象属性名时，不能用点运算符
	var mySymbol = Symbol();
	Object.defineProperty(a, mySymbol, { value: 'Hello1' });
	console.log(a[mySymbol]);
	/*
 Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、
 Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，
 有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
 */

	var obj1 = {};
	var a = Symbol('a');
	var b = Symbol('b');

	obj1[a] = 'Hello';
	obj1[b] = 'World';

	var symbols = Object.getOwnPropertySymbols(obj1);
	console.log(symbols);

	var obj2 = (_obj = {}, _defineProperty(_obj, Symbol('my_key'), 1), _defineProperty(_obj, 'enum', 2), _defineProperty(_obj, 'nonEnum', 3), _obj);

	console.log(Reflect.ownKeys(obj2));

	/*
  Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，
  前者会被登记在全局环境中供搜索，后者不会。
  Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，
  而是会先检查给定的key是否已经存在，如果不存在才会新建一个值
 */
	var ss1 = Symbol.for('foo');
	var ss2 = Symbol.for('foo');
	console.log(ss1 === ss2);

	//Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key
	var sb = Symbol.for('FOO');
	var sbkey = Symbol.keyFor(sb);
	console.log(sbkey);

	var sb1 = Symbol('foo');
	var sb1key = Symbol.keyFor(sb1);
	console.log(sb1key);
}
testSymbol();

/***/ })

/******/ });