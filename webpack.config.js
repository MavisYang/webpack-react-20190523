const path = require('path');
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');//
const miniCssExtractPlugin = require('mini-css-extract-plugin');//CSS 分离成文件
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//代码压缩 配置
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
console.log(miniCssExtractPlugin.loader);

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
    filename: process.env.NODE_EVN !== "production" ? 'static/js/[hash].bundle.js' : 'static/js/[chunkhash].bundle.js',

    // filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    // publicPath: '/static/',//表示资源的发布地址
  },
  module: {
    rules: [{
        test: /\.(css|scss)$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { 
              url: true//要禁用 css-loader 解析 url()
            }
          },
          { 
            loader: 'sass-loader', 
            options: { } 
          },
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
            minimize: true,
            publicPath: '/'
          }
        }]
    }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,//限制打包图片的大小：
            //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
            name: 'static/images/[name].[hash:8].[ext]',//images:图片打包的文件夹；
             //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
            //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
            // publicPath: process.env.NODE_EVN !== "production" ? "" :'/assets/',
            // outputPath: process.env.NODE_EVN !== "production" ? "" : '/assets/'
            publicPath: 'http://localhost:1991'
          }
        },{
          //压缩图片
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
        }]
    }]
  },
  //安装插件
  plugins: [
    // 简单创建 HTML 文件，用于服务器访问
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),//模板文件路径
      inject: true,//插入位置
      minify: true,//压缩代码
    }),
    //清除dist文件
    new cleanPlugin({
      dist: 'dist'
    }),
    //为每个引入 CSS 的 JS 文件创建一个 CSS 文件
    new miniCssExtractPlugin({
      // filename: "[name].css",
      chunkFilename: "static/css/[id].css",
      filename: 'static/css/[name].[contenthash:8].css'
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