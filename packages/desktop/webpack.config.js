const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'electron.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { babelrc: true }
        }
      }
    ]
  },
  target: 'electron-main',
  node: {
    __dirname: false
  },
  stats: {
    colors: true
  }
};
