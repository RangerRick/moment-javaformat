/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const process = require('process');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = (process.argv.filter((arg) => arg.match(/production/)).length > 0);

module.exports = {
  entry: {
    'moment-javaformat': path.resolve('./src/index'),
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name]' + (isProduction? '.min' : '') + '.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    chunkLoading: false,
    wasmLoading: false
  },
  externals: [
    'moment',
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
  },
  plugins: [
  ]
};

if (!isProduction) {
  // module.exports.plugins.push(new BundleAnalyzerPlugin());
}
