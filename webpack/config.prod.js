const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const entrypoints = require('./entrypoints.json');

module.exports = {
  mode: 'production',
  entry: entrypoints,
  output: {path: path.resolve(process.cwd(), 'dist'), filename: '[name].bundle.min.js'},
  resolve: {extensions: ['.ts', '.js', '.json']},
  devtool: false,
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: {loader: 'babel-loader'}},
      {test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader'},
      {test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
    ],
  },
  optimization: {minimizer: [new TerserPlugin({terserOptions: {output: {comments: false}}})]},
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({template: './index.html'}),
    new CopyPlugin({patterns: [{from: 'public/favicon.ico', to: 'favicon.ico'}]}),
    new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'}),
  ],
}
