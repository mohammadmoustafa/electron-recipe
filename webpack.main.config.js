const path = require('path');
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      "@components": path.join(__dirname, 'src', 'components'),
      "@style": path.join(__dirname, 'src', 'style'),
      "@store": path.join(__dirname, 'src', 'store'),
      "@assets": path.join(__dirname, 'src', 'assets')
    }
  }
};
