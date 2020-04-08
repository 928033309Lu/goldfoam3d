const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return merge(baseWebpackConfig(env), {
    devtool: false,
    plugins: [
      new CopyWebpackPlugin([{
        from: '../public',
        ignore: [
          //发布时不包含指定目录   
          'templates/**',
          'vendors-dev/**',
        ],
        to: ''
      }]),
    ],
  })
}