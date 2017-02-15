var path = require('path');
var webpack = require("webpack");

module.exports = {
	entry: {
		bundle: "./main.js",
		promise: ["./scripts/promise.jsx"],
		defer: ["./scripts/defer.jsx"]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: [/node_modules/, /dist/],
			query: {
				presets: ["es2015", "react"]
			}
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},
		{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
		{ test: /\.(woff|woff2)$/, loader:"file-loader" },
		{ test: /\.ttf$/, loader:"file-loader" },
		{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" }]
	},
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	}
}