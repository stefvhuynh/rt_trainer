var PATH = __dirname + '/app/assets/javascripts';

module.exports = {
  entry: PATH + '/main.js',
  output: {
    path: PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
