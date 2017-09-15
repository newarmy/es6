//引入腻子脚本
//require('babel-polyfill');

function testSymbol() {
	let s = Symbol();
	var type = typeof s;
	console.log('-------------------------------------');
	console.log(type);
	console.log('-------------------------------------');
	let s1 = Symbol('ddd');
	console.log(s1);
	let obj = {
		toString() {
			return 'aaa'
		}
	}
	let s2 = Symbol(obj);
	console.log(s2.toString())
	var a = {};
	//Symbol值作为对象属性名时，不能用点运算符
	var mySymbol = Symbol();
	Object.defineProperty(a, mySymbol, {value: 'Hello1'} );
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

	let obj2 = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

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
