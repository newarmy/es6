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
function* hwgenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

var gIterater = hwgenerator();
for(var v of gIterater) {
	console.log(v);
}
console.log('------------------------------------------------------------------------');

/*
  Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。
  yield语句只能用在 Generator 函数里面，用在其他地方都会报错
*/

function* f() {
	console.log('excuting');
}
var gobj = f();
setTimeout(function() {
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
myIterable[Symbol.iterator] = function* () {
	yield 1;
	yield 2;
	yield 3;
};
var arr = [... myIterable];
console.log(arr);
//---------------------------------------------------------------------------------
/*
* Generator函数执行后，返回一个遍历器对象。
 该对象本身也具有Symbol.iterator属性，执行后返回自身。
*/
function* gen() {

}
var g = gen();
console.log(g[Symbol.iterator]() == g);
//----------------------------------------------------------------------------------

/***
yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，
该参数就会被当作上一个yield语句的返回值。
*/
function* ff() {
	for(var i=0; true; i++) {
		var reset = yield i;
		if(reset) {
			i = -1;
		}
	}
}
var gg = ff();
console.log(gg.next());
console.log(gg.next());
console.log(gg.next(true));
console.log(gg.next());
console.log('---------------------------------------------');
console.log('--------generator传值-----------');
function* foo111(x) {
	var y = 2*(yield (x + 1));
	console.log('y = '+y);
	var z = yield(y/3);
	console.log('z = '+z);
	return (x+y+z);
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
	return function (... args) {
		let go = gf(... args);
		go.next();
		return go;
	}
}

const wrapped = wrapper(function* () {
	console.log(`Fisrt input: $(yield)`);
	return 'DONE';
});

wrapped().next('hello!');
//for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。
/*

一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，
所以上面代码的return语句返回的6，不包括在for...of循环之中。
*/

function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
console.log('----------------------------------------------------');
function* objectEntries(obj) {
	let propKeys = Reflect.ownKeys(obj);
	for(let propkey of propKeys) {
		yield [propkey, obj[propkey]];
	}
}
let jane = {Fisrt: 'jane', last: 'Doe'};
for(let [key, value] of objectEntries(jane)) {
	console.log(key+': '+value);
}


function* objEntry() {
	let propKeys = Object.keys(this);
	for(let pk of propKeys) {
		yield [pk , this[pk]];
	}
}

let xj = {first: 'xinjun', last: 'dong'};
xj[Symbol.iterator] = objEntry;
for(let [k, v] of xj) {
	console.log(k+":"+v);
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

var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('inner', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('outer', e);
}
//throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法。

var gen11 = function* gen11(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g111 = gen11();
console.log(g111.next() );// a
console.log(g111.throw()); // b
console.log(g111.next() )// c

//只要Generator函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历

/**
这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield语句，可以只用一个try...catch代码块来捕获错误。
如果使用回调函数的写法，想要捕获多个错误，
就不得不为每个函数内部写一个错误处理语句，现在只在Generator函数内部写一次catch语句就可以了。

Generator函数体外抛出的错误，可以在函数体内捕获；反过来，
Generator函数体内抛出的错误，也可以被函数体外的catch捕获
**/

function *foo12() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
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

function* ggg() {
	yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
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

function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers()
console.log(g.next()) // { done: false, value: 1 }
console.log(g.next()) // { done: false, value: 2 }
console.log(g.return(7)) // { done: false, value: 4 }
console.log(g.next()) // { done: false, value: 5 }
console.log(g.next()) // { done: true, value: 7 }console.l)og(
/*
上面代码中，调用return方法后，就开始执行finally代码块，
然后等到finally代码块执行完，再执行return方法。
*/

// yield* 语句
/*
如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。
这个就需要用到yield*语句，用来在一个 Generator 函数里面执行另一个 Generator 函数
*/

function* foo1() {
	yield 'a';
	yield 'b';
}
function* bar1() {
	yield 'x';
	yield* foo1();
	yield 'y';
}

//等同于
// 等同于
function* bar2() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar3() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

/**
 从语法角度看，如果yield命令后面跟的是一个遍历器对象，
 需要在yield命令后面加上星号，
 表明它返回的是一个遍历器对象。这被称为yield*语句
*/