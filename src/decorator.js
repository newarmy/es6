//修饰器（Decorator）是一个函数，用来修改类的行为
//修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码

import {mixins} from './mixes';

const Foo = {
	foo() {console.log('foo')}
};

/*@mixins(Foo)
class MyClass(){}

let obj = new MyClass();

obj.foo();*/