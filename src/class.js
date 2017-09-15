//类的所有方法都定义在类的prototype属性上面。
//类的内部所有定义的方法，都是不可枚举的
//constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
//constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

class Point{
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return '(' + this.x + ', ' + this.y + ')';
	}
}
Object.assign(Point.prototype, {
	setValue(v) {
		return 'set value = '+v;
	}
});

let p = new Point(2,3);
console.log(p);
console.log(p.toString());
console.log(p.setValue(10));
console.log(p.constuctor === Point.prototype.constuctor);
console.log(Object.keys(Point.prototype));
console.log(Object.getOwnPropertyNames(Point.prototype));
console.log('--------------------------------------------------------');
//采用Class表达式，可以写出立即执行的Class。

let person = new class {
	constructor(name) {
		this.name = name;
	}
	sayName() {
		console.log(this.name);
	}
}('zhang san');
person.sayName();
//私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。
//还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

const bar = Symbol('bar');
const snaf = Symbol('snaf');

class myClass{
	foo(a) {
		this[bar](a);
	}
	[bar](b) {
		return this[snaf] = b;
	}
} 

let mc = new myClass();
mc.foo(10);
console.log(mc);
console.log(mc[snaf]);

//子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，
//而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
/*
ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），
然后再用子类的构造函数修改this。
另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，
否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
*/
class ColorPoint extends Point{
	constructor(x, y, color){
		super(x,y);
		this.color = color;
	}
	toString(){
		return super.toString()+", "+this.color;
	}
}
var cp = new ColorPoint(2,3,'red');
console.log(cp.toString());

//如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。

class Foo{
	//rest运算符 rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组
	constructor(...args) {
		this.args = args;
	}
	*[Symbol.iterator](){
		for(let arg of this.args){
			yield arg;
		}
	}
}

for(let xx of new Foo('hello', 'world')) {
	console.log(xx);
}

function test (...a) {
	return a;
}
console.log(test('a', 'b'));
console.log(test(['a', 'b']));
//扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值
console.log(...['a', 'b']);

//static method

class Foo1 {
  static classMethod() {
    return 'hello';
  }
}

console.log(Foo1.classMethod()); // 'hello'

//var foo1 = new Foo1();
//foo1.classMethod()

//目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。
class Foo {
}

Foo.prop = 1;
Foo.prop // 1

//目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
class Foo {
 // #a;
  //#b;
  //#sum() { return #a + #b; }
  //printSum() { console.log(#sum()); }
  //constructor(a, b) { #a = a; #b = b; }
}

/*new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，
（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，
new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
Class内部调用new.target，返回当前Class。
需要注意的是，子类继承父类时，new.target会返回子类。
*/

//Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}