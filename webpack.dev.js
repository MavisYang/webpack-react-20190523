const merge = require('webpack-merge');//合并配置
const common = require('./webpack.config.js');//引入公共配置

module.exports = merge(common, {
  mode: 'development',//声明是开发环境
  //关于 dev 的配置
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 1991,
  }
})

