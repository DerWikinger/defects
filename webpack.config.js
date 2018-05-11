'use strict'

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const login = require('./frontend/login/login');

const NODE_ENV = process.env.NODE_ENV || 'development';
//console.log(UglifyJSPlugin);

module.exports = {

	mode: NODE_ENV,
	//mode: 'production',

	// scripts: {
	//  	"start": "webpack-dev-server",
	//   	"build": "webpack -p --progress --colors"
	// },

	context: __dirname + '/frontend',	
	entry: {
		main: './main',
		auth: './login/auth'
	},

	output: {
		path: __dirname + '/public/js',
		publicPath: '/js/',
		filename: "[name].js",
		library: "[name]"
	},

	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV == 'development' ? "cheap-inline-modeule-source-map" : null,

	resolve: {
		modules: ['node_modules'],
		extensions: ['.js']
	},

	resolveLoader: {
		modules: ['node_modules'],
		moduleExtensions: ['-loader'],
		extensions: ['.js']
	},
	
	module: {
		rules: [{
			test: /\.js$/,
			//include: __dirname + '/frontend',
			exclude: /\/node_modules\//,
			query: {
                  presets: ['es2015']
              },
			loader: 'babel-loader?optional[]=runtime'
		}, {
			test: /\.styl$/,
			loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve url')
		}]
	},

	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					compress: {
						warnings: false,
						drop_console: true,
						unsafe: true					
					}
				}
			})
		]
	},

	devServer: {
		setup: function (app) {
			login(app);
		},
		host: 'localhost',
		port: 8080,
		contentBase: __dirname + '/public'
	},

	plugins: [
		//new webpack.NoErrorsPlugin(),
		new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
		// new webpack.EnvironmentPlugin([
		// 		NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
  // 				DEBUG: false
  // 			]),
		new ExtractTextPlugin('[name].css', { allChunks: true, disable: NODE_ENV == 'development' }),
	],
}