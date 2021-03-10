const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/client/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  },
};
