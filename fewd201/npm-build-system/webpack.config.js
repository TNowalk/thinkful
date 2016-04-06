var path        = require('path'),
    webpack     = require('webpack'),
    packageData = require('./package.json'),
    minify      = process.argv.indexOf('--minify') !== -1;

var filename = [packageData.name, packageData.version, 'js'];

var plugins = [];

if (minify) {
  filename.splice(filename.length - 1, 0, 'min');
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: path.resolve(__dirname, packageData.main),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: filename.join('.')
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: plugins
};
