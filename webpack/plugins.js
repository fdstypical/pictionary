const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const htmlPluginConfig = {
  filename: 'index.html',
  hash: true,
};

const plugins = {
  production: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      ...htmlPluginConfig,
      template: path.resolve(__dirname, '/public/template.html'),
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      compressionOptions: { level: 6 },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  development: [
    new HtmlWebpackPlugin({
      ...htmlPluginConfig,
      template: path.resolve(__dirname, '/public/template.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
};

module.exports = { plugins };
