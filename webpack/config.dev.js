const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const entrypoints = require('./entrypoints.json')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: entrypoints,
  output: {path: path.resolve(__dirname, 'dist'), filename: '[name].bundle.min.js'},
  resolve: {extensions: ['.ts', '.js', '.json']},
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: {loader: 'babel-loader'}},
      {test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader'},
      {test: /\.(sa|sc|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
    ],
  },
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')]}),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({template: './index.html'}),
    new webpack.ProvidePlugin({unjustifiable: 'unjustifiable'}),
  ],
}
