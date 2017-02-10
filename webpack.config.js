var path = require('path');
var webpack = require("webpack");

module.exports = {
	entry: "./main.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: [/node_modules/, /dist/],
			query: {
				presets: ["es2015", "react"]
			}
		}]
	},
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	}
}