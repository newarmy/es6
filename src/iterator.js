//引入腻子脚本
//require('babel-polyfill');


/**
遍历器（Iterator）就是这样一种机制。它是一种接口，
为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署Iterator接口，
就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，
 就是返回一个包含value和done两个属性的对象。
 其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
*/

//模拟next方法
function makeIterator(arr) {
	var nextIndex = 0;
	 
	 return {
	 	next: function() {
	 		return nextIndex < arr.length ? {value: arr[nextIndex++], done: false} : {value: undefined, done: true};
	 	}

	 }
}

var it = makeIterator(['a', 'b']);

console.log(it.next());
console.log(it.next());
console.log(it.next());

/**
ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，
或者说，一个数据结构只要具有Symbol.iterator属性，
就可以认为是“可遍历的”（iterable）。
*/


/*
一个对象如果要有可被for...of循环调用的Iterator接口，
就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）
*/
class RangeIterator{
	constructor(start, stop) {
		this.value = start;
		this.stop = stop;
	}

	[Symbol.iterator]() {
		return this;
	}

	next() {
		var value = this.value;
		if(value < this.stop) {
			this.value++;
			return {done: false, value: value};
		} else {
			return {done: true, value:undefined};
		}
	}
}

function range(start, stop) {

	return new RangeIterator(start, stop);
}

for(var v of range(0, 5)) {
	console.log(v);
}


/*
对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，
就是Symbol.iterator方法直接引用数组的Iterator接口。

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
*/
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}


/*普通对象部署数组的Symbol.iterator方法，并无效果*/

let iterable1 = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable1) {
  console.log(item); // undefined, undefined, undefined
}


//调用Iterator接口的场合

//(1) 解构赋值   对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
let [first, ...rest] = set;
console.log(x, y, first, rest);
//(2)扩展运算符（...）也会调用默认的iterator接口。
//只要某个数据结构部署了Iterator接口，就可以对它使用扩展运算符，将其转为数组

// 例一
var str1 = 'hello';
[...str1] //  ['h','e','l','l','o']

// 例二
let arr1 = ['b', 'c'];
['a', ...arr1, 'd']
// ['a', 'b', 'c', 'd']

console.log( [...str1]);
console.log(...arr1);
//(3)yield*  yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

let genetator = function* () {
	yield 1;
	yield* [2,3,4];
	yield 5;
};
var iterator1 = genetator();

console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());

//(4)其他场合
/*for...of
Array.from()
Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
Promise.all()
Promise.race()*/


//子符串是一个类似数组的对象，也原生具有Iterator接口

//Symbol.iterator方法的最简单实现，还是使用下一章要介绍的Generator函数。

function test22() {

	var myIterable = {};

	myIterable[Symbol.iterator] = function* () {
	  yield 1;
	  yield 2;
	  yield 3;
	};
	[...myIterable] // [1, 2, 3]

	// 或者采用下面的简洁写法

	let obj = {
	  * [Symbol.iterator]() {
	    yield 'hello';
	    yield 'world';
	  }
	};

	for (let x of obj) {
	  console.log(x);
	}
}
test22();

/**
 遍历器对象的三个方法：
  next
  return :
   return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），
   就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
   return方法必须返回一个对象，这是Generator规格决定的。
  throw: throw方法主要是配合Generator函数使用，一般的遍历器对象用不到这个方法
*/


//for...of循环，作为遍历所有数据结构的统一的方法。
/*
一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，
就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

for...of循环可以使用的范围包括数组、Set 和 Map 结构、
某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。


JavaScript原有的for...in循环，只能获得对象的键名，不能直接获取键值。
ES6提供for...of循环，允许遍历获得键值。
*/

/*
有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，
键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
keys() 返回一个遍历器对象，用来遍历所有的键名。
values() 返回一个遍历器对象，用来遍历所有的键值。

并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。


Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。

for (var key of Object.keys(someObject)) {
  console.log(key + ': ' + someObject[key]);
}

另一个方法是使用 Generator 函数将对象重新包装一下
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}

*/