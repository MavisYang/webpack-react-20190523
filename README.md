# webpack-react-20190523

第一次用webpack搭建react,遇到各种坑，不过最终还是好的，能够启用成功了。

启动：`npm start`;
打包：`npm run build`

1. 只有一个webpack.config.js时的script
 ```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
  },
 ```
2. 有三个webpack.js时的script
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
 ```
 
 详细配置可看`webpack.config.js`、`webpack.dev.js`、`webpack.prod.js`文件
