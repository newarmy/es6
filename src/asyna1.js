// 异步

function promiseFunc() {
	return new Promise(function(resolve, reject) {
		var ran = Math.random();
		if(ran < .5) {
			setTimeout( function(){
				resolve({state: 'success'})
			}, 1000)
		} else {
			setTimeout( function(){
				reject({state: 'error'})
			}, 1000)
		}
	});
	
}

function* genFun() {
	var res = yield promiseFunc();
	console.log(res.state);
}
var gf = genFun();
var result = gf.next();
result.value.then(function(data) {
	gf.next(data);
}).catch(function(err) {
	gf.next(err);
})

// Trunkify ,Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式
/**
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，
它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。
*/
function thunkify(fn) {
	return function() {
		var args = new Array(arguments.length);
		var ctx = this;

		for(var i = 0 ; i < args.length; ++i) {
			args[i] = arguments[i];
		}

		return function (done) {
			var called;
			args.push( function() {
				if(called) return;
				called = true;
				done.apply(null, arguments);
			});

			try{
				fn.apply(ctx, args);
			}catch(err) {
				done(err);
			}
		};
	}
} 

function f(a, b, cb) {
	var sum = a+b;
	cb(sum);
	cb(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1,2)(print);
/*
你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，
但是 ES6 有了 Generator 函数，Thunk 
函数现在可以用于 Generator 函数的自动流程管理。

Generator 函数可以自动执行。


*/

function* genfunc1() {
	yield 'first';
	yield 'second';
	yield 'third';
}

var g1 = genfunc1();
var res1 = g1.next();
while(!res1.done) {
	console.log(res1.value);
	res1 = g1.next();
}

//-------------------thunk-------------------------------
//generator执行器
function run(fn) {
	var gen = fn();
	function next(data) {
		var res = gen.next(data);
		if(res.done) return;
		res.value(next);
	}

	next();
}
// thunk 函数
function thunk1(x) {
	return function(fn) {
		//模拟异步
		setTimeout(function (){
			fn(x+" thunk");
		}, 2000);
	}
};
//生成器
function *gg() {
	var x = yield thunk1(1);
	console.log('x = '+x);
	var y = yield thunk1(2);
	console.log('y= '+y);
	var z = yield thunk1(3);
	console.log('z = '+z);
}
//执行
run(gg);
//-----------------------------------------------------------------------------

/**
co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。
首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
*/

function co(gen) {
	var ctx = this;

	return new Promise(function(resolve, reject) {
		if(typeof gen === 'function') gen = gen.call(ctx);

		if(!gen || typeof gen.next !== 'function') return resolve(gen);

		onFulfilled();
		function onFulfilled(res) {
			var ret;
			try{
				ret = gen.next(res);
			} catch(e) {
				return reject(e);
			}
			next(ret);
		}

		function next(ret) {
			if(ret.done) {
				return resolve(ret.value);
			}
			var value = toPromise.call(ctx, ret.value);
			if(value && isPromise(value)) return value.then(onFulfilled, onRejected);
			return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, "'+
				String(ret.value)+'"'));
		}
        //
		function toPromise(func) {
			return Promise.resolve(func);
		}

		function isPromise(func) {
            return func instanceof Promise;
		}
		function onRejected(data) {
			reject(data);
		}
	});
}


function genPro(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType= 'json';
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
		xhr.onreadystatechange = handler;

		function handler() {
			if(this.readyState !== 4) {
				return;
			}
			//console.log(this);
			if(this.status === 200) {
				console.log(this.response);
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		}


	})
}

function* genF() {

	var data = yield genPro('./data/data.json');
	console.log(data.state);
	var data1 = yield genPro('./data/data1.json');
	console.log(data1.state);
}

co(genF);