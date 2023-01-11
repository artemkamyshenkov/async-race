const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8000,
    open: true,
    historyApiFallback: true,
  },
};
