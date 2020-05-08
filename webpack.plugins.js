const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false
  }),
  new CheckerPlugin(),
];
