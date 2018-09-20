/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    // Generating HTML
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
    }),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // Optimize/Minimize CSS assets
    new OptimizeCssAssetsPlugin(),
    // Show the relative path of the module to be displayed when HMR is enabled
    new webpack.NamedModulesPlugin(),
    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
};
