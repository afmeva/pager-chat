const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.dist/',
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
});
