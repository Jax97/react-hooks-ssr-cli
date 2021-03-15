const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/server/app.ts'),
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '../dist'),
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
