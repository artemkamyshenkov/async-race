const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module.css$/,
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/'),
    },
    extensions: ['.ts', '.js', 'json'],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.png',
      template: path.resolve(__dirname, './src/index.html'),
      filename: './index.html',
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
