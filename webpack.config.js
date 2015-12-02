module.exports = {
  entry: {
    fourstory: './src/js/fourStory.js',
    tests: './src/test/test.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
  	loaders: [
    	{ test: /\.js/, loader: "babel"},
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.png$/, loader: "url-loader"}
  	]
  }
};
