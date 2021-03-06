const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/server/utils/ssr.tsx'),
  target: 'node',
  output: {
    filename: 'ssr.js',
    path: path.join(__dirname, '../dist/utils'),
    // 要打包成commonjs的格式，给服务端引用
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  },
  externals: [nodeExternals()],
};
