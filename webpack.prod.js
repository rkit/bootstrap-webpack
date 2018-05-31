/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const { WEBPACK_ANALYZER } = process.env;

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].js?v=[chunkhash]',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
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
      filename: '[name].css?v=[contenthash]',
      chunkFilename: '[id].css',
    }),
    // Optimize/Minimize CSS assets
    new OptimizeCssAssetsPlugin(),
    // Hashes to be based on the relative path of the module, generating a four character string as the module id
    new webpack.HashedModuleIdsPlugin(),
  ],
};

// Start webpack analyzer
if (WEBPACK_ANALYZER && WEBPACK_ANALYZER === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin());
}

module.exports = config;
