/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const process = require('process');

const isProduction = (process.argv.filter((arg) => arg.match(/production/)).length > 0);

module.exports = {
  entry: {
    'moment-javaformat': path.resolve('./src/index'),
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name]' + (isProduction? '.min' : '') + '.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [
    'moment-timezone',
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  }
};
