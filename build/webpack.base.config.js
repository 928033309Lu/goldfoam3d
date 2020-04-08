const path = require('path');


const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const envConfig = require('./env.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


// const {
//   BundleAnalyzerPlugin
// } = require('webpack-bundle-analyzer');
module.exports = (env) => {
  return {
    mode: env === "production" ? 'production' : 'development',
    context: __dirname,
    entry: {
      // app: ['babel-polyfill', '../src/index.js']
      app: '../src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: env === 'local' ? '/' : '/map3d/' // 修改后需要更新build/env.config.js中PUBLIC_PATH设置
    },
    node: {
      // Resolve node module use of fs
      fs: 'empty'
    },
    resolve: {
      alias: {
        '@': path.resolve('src'),
      }
    },
    module: {
      rules: [{
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.less$/,
          use: ['vue-style-loader', 'style-loader', 'css-loader', 'less-loader', {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, env === 'local' ? '../src/assets/style/local-variable.less' : '../src/assets/style/public-variable.less'), // 环境变量修改publicPath
                path.resolve(__dirname, '../src/assets/style/variable.less'),
              ]
            }
          }]
        }, {
          test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
          use: ['url-loader']
        }, {
          test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }, {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
        // ,{
        //   test: /\.js$/,
        //   exclude: /(node_modules|bower_components)/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env'],
        //     }
        //   }
        // }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: '../src/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env': envConfig[env]
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerPort: 8000
      // })
    ],
  }
};