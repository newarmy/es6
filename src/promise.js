//引入腻子脚本
//require('babel-polyfill');

/*
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件
（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，
从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
*/

/*
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，
无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署Promise更好的选择。
*/

function timeout(ms) {
	return new Promise((resolve, reject) => {
		var rand = Math.random();
		if(rand < .5) {
			setTimeout(reject, ms, 'error');
		} else {
			setTimeout(resolve, ms, 'done');
		}
		
	})
}
timeout(1000).then((value) => {
	console.log(value);
}, (value)=> {
	console.log(value);
});
console.log('Promise新建后立即执行, then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行');
let promise = new Promise(function(resolve,reject) {
	console.log('Promise');
	resolve();
});
promise.then(function() {
	console.log('Resolved');
});
console.log('Hi!');
//----------------------------------------------------------------------
function loadImageAsync(url) {
	return new Promise(function(resolve, reject) {

		var image = new Image();
		image.onload = function() {
			resolve(image);
		};
		image.onerror = function() {
			reject(new Error('Could not load iimage at '+url))
		};

		image.src = url;
	});
}

loadImageAsync('https://www.baidu.com/img/bd_logo11.png').then(function(v) {
	console.log('finished '+v.src);
}, (e)=>{
	console.log(e.message);
})
//-----------------------------------------------------------------------------------

/*reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，
还可能是另一个Promise实例，
表示异步操作的结果有可能是一个值，也有可能是另一个异步操作*/

var getJSON = function(url) {
	var promise = new Promise((resolve, reject) => {
		var client = new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = handler;
		client.responseType = 'json';
		client.setRequestHeader('Accept', 'application/json');
		client.send();

		function handler() {
			if(this.readyState !== 4) {
				return;
			}
			if (this.state === 200) {
				resolve(this.response);
			} else{
				reject(new Error(this.statusText));
			}
		}
	});

	return promise;
}

getJSON('/data/posts.json').then(function(json) {
	console.log(json);
}, function(err) {
	console.log(err)
});

// ------------------------------------------------------------------
/*
注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。
如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；
如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行
*/

var p1 = new Promise(function (resolve, reject) {
	var r = Math.random();
	console.log('-----------'+r+'-----------');
	if(r < .5) {
       setTimeout(() => reject(new Error('fail')), 3000)
	} else {
       setTimeout(() => resolve('success'), 3000)
	}
  
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2.then(result => console.log(result)).catch(error => console.log(error));



//----------------------------------------------------------------------------
/*
  promise.prototype.then()
  then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
  因此可以采用链式写法，即then方法后面再调用另一个then方法。
  Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
  then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
  Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
  也就是说，错误总是会被下一个catch语句捕获;
  一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法;

  需要注意的是，catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法或catch方法。
*/

//------------------------------------------------------------------------------
/*
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});

Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例;
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

var p = Promise.race([p1, p2, p3]);



有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用;
Promise.resolve方法的参数分成四种情况:
（1）参数是一个Promise实例

如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

（2）参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。
（3）参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。

var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});

（4）不带有任何参数

Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。
需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”
（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，
console.log(’one‘)则是立即执行，因此最先输出。


Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
*/


//--------------------------------------------------------------

/*
done()
Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，
都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，
总是处于回调链的尾端，保证抛出任何可能出现的错误。

asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
它的实现代码相当简单。

Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
从上面代码可见，done方法的使用，可以像then方法那样用，提供Fulfilled和Rejected状态的回调函数，
也可以不提供任何参数。但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。
*/

//---------------------------------------------------------------------

/*

finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，
它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

下面是一个例子，服务器使用Promise处理请求，然后使用finally方法关掉服务器。

server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
它的实现也很简单。

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
上面代码中，不管前面的Promise是fulfilled还是rejected，都会执行回调函数callback。
*/