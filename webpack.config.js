const path = require('path');
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');//
const miniCssExtractPlugin = require('mini-css-extract-plugin');//CSS 分离成文件
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//代码压缩 配置
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  // 进入
  entry: {
    index: './src/index.js'
  },
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.[hash].js',
    // filename: '[name].[contenthash].js',
    // filename: 'main.[chunkhash].js',//ChunkHash只能用于生产。
    // chunkFilename: 'main.[name].bundle.js',//动态导入
    filename: process.env.NODE_EVN !== "production" ? 'main.[hash].js' : 'main.[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: [
        miniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { url: false }
        },
        { loader: 'sass-loader', options: {} },
      ]
      // 不提取css时的写法
      // use: [
      //   // process.env.NODE_EVN !== "production" ? "style-loader" : miniCssExtractPlugin.loader, // 将 JS 字符串生成为 style 节点
      //   // "css-loader", // 将 CSS 转化成 CommonJS 模块
      //   // "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
      // ]
    }, {
      test: /\.(jsx|js)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            "es2015", "react"
          ]
        }
      },
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
        options: {
          minimize: true
        }
      }]
    },]
  },
  //安装插件
  plugins: [
    // 简单创建 HTML 文件，用于服务器访问
    new htmlPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: true,
      minify: true,//压缩代码
    }),
    //清除dist文件
    new cleanPlugin({
      dist: 'dist'
    }),
    //为每个引入 CSS 的 JS 文件创建一个 CSS 文件
    new miniCssExtractPlugin({
      // filename: "[name].css",
      // chunkFilename: "[id].css",
      filename: '[name].[contenthash:8].css'
    }),
    // 自动加载模块，而不必到处 import 或 require
    new webpack.ProvidePlugin({
      _: "lodash",
      $: "jquery"    //在全局下添加$变量，不需要再次引入
    }),
    // 热替换
    new webpack.HashedModuleIdsPlugin(),
  ],
  //分离出第三方库、自定义公共模块、webpack运行文件
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: "all",
        }
      }
    },
    minimizer: [
      new uglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new optimizeCSSAssetsPlugin({})
    ]
  },
  devtool: 'source-map',//设置source map选项
  //设置webpack本地服务器的配置
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器
    host: 'localhost',
    compress: true,
    port: 1990,//监听端口
    inline: true,//设置为true，当源文件改变的时候会自动刷新
    hot: true,//允许热加载
    //historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
  }
}