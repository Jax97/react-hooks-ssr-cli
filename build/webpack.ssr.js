const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/server/utils/ssr.tsx'),
  target: 'node',
  output: {
    filename: 'ssr.bundle.js',
    path: path.join(__dirname, '../dist/assets/scripts'),
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
