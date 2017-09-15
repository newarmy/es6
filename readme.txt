1. 怎样加载你需要的腻子文件：
1.1  npm install --save-dev babel-plugin-transform-runtime
1.2  npm install --save babel-runtime

1.3   .babelrc文件中  {
  "plugins": [
    ["transform-runtime", {
      "helpers": false, // defaults to true
      "polyfill": false, // defaults to true
      "regenerator": true, // defaults to true
      "moduleName": "babel-runtime" // defaults to "babel-runtime"
    }]
  ]
} 




In most cases, you should install babel-plugin-transform-runtime as a development dependency (with --save-dev).


Copy
npm install --save-dev babel-plugin-transform-runtime
and babel-runtime as a production dependency (with --save).


Copy
npm install --save babel-runtime
The transformation plugin is typically used only in development, but the runtime itself will be depended on by your deployed/published code. See the examples below for more details.

Usage

Via .babelrc (Recommended)
Add the following line to your .babelrc file:

Without options:


Copy
{
  "plugins": ["transform-runtime"]
}
With options:


Copy
{
  "plugins": [
    ["transform-runtime", {
      "helpers": false, // defaults to true
      "polyfill": false, // defaults to true
      "regenerator": true, // defaults to true
      "moduleName": "babel-runtime" // defaults to "babel-runtime"
    }]
  ]
}



2. 安装webpack服务器
npm install webpack-dev-server --save-dev

启动 服务器  ： node_modules/.bin/webpack-dev-server