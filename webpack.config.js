var path = require('path');
module.exports = {
	entry: {
		'symbol': path.resolve(__dirname,'src/symbol.js'),
		'promise': path.resolve(__dirname, 'src/promise.js'),
		'iterator': path.resolve(__dirname, 'src/iterator.js'),
		'generator': path.resolve(__dirname, 'src/generator.js'),
		'asyna1': path.resolve(__dirname, 'src/asyna1.js'),
		'class': path.resolve(__dirname, 'src/class.js'),
		'decorator': path.resolve(__dirname, 'src/decorator.js'),
		'module': path.resolve(__dirname, 'src/module.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	devServer: {//
	  contentBase: path.join(__dirname),//基本路径
	  compress: true,
	  port: 9000//端口
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include:[
					path.resolve(__dirname, 'src')
				],
				exclude: [
					path.resolve(__dirname, 'dist'),
					path.resolve(__dirname, 'node_modules')
				],
				loader: 'babel-loader',
				options: {
					presets:['es2015'],
					plugins: [ 
					   /*动态加载你需要ES6腻子文件*/
					   ["transform-runtime", {
					      "helpers": false, // defaults to true
					      "polyfill": false, // defaults to true
					      "regenerator": true, // defaults to true
					      "moduleName": "babel-runtime" // defaults to "babel-runtime"
					    }
					   ]
					]
				}
			}
		]
	}
	
};