/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const process = require('process');
const nodeExternals = require('webpack-node-externals');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = (process.argv.filter((arg) => arg.match(/production/)).length > 0);
const suffix = isProduction? '.min.js' : '.js';

const generalConfig = {
  entry: {
    'moment-javaformat': path.resolve('./src/index'),
  },
  output: {
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
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

if (isProduction) {
  generalConfig.devtool = 'cheap-module-source-map';
} else {
  // generalConfig.plugins.push(new BundleAnalyzerPlugin());
}

const browserConfig = {
  target: 'web',
  output: {
    filename: `[name]${suffix}`,
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
  },
};

const nodeConfig = {
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: `node${suffix}`,
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};

module.exports = [
  Object.assign({}, generalConfig, browserConfig),
  Object.assign({}, generalConfig, nodeConfig),
];
