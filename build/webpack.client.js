const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/client/index.tsx'),
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.join(__dirname, '../dist/assets'),
    publicPath: '/',
  },
  // 不会正常exit，导致run-parrell一直等待
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  // },
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
  plugins: [
    new HtmlWebpackPlugin({
      output: 'index.html',
      template: path.join(__dirname, '../src/client/template/index.html'),
    }),
  ],
};
