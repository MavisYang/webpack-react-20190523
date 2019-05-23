const merge = require('webpack-merge');//合并配置
const common = require('./webpack.config.js');//引入公共配置

module.exports = merge(common, {
  mode: 'production',//声明是生产环境
  //关于 prod 的配置,
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 1992,
  }
});