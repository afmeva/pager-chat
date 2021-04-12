const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  output: {
    clean: true,
    publicPath: '/',
    filename: '[name].[chunkhash:8].chunk.js',
    assetModuleFilename: '[name]',
  },
});
