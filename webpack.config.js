'use strict'

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
//console.log(UglifyJSPlugin);

module.exports = {

	mode: NODE_ENV,
	context: __dirname,	
	entry: {
		home: './frontend/home',
		//auth: './frontend/login/auth',
		//view: './views/home.ejs.'
	},

	output: {
		path: __dirname + '/public/js',
		publicPath: '/public/',
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
			// include: [
			// 	path.resolve(__dirname , 'backend/'), 
			// 	path.resolve(__dirname , 'backend/http-server/')
			// ],
			exclude: /\/node_modules\//,
			query: {
                  presets: ['es2015']
              },
			loader: 'babel-loader?optional[]=runtime'
		}, {
			test: /\.styl$/,
			loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve url')
		}, 
		// {
		// 	test: /\.ejs$/,
		// 	loader: "ejs-render-loader"
		// }
		]
	},
	optimization: {
		splitChunks: {
	      cacheGroups: {
	        'commons': {
	          minChunks: 2,
	          chunks: 'all',
	          name: 'commons',
	          priority: 10,
	          enforce: true,
	        },
	      },
	    },
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

	// devServer: {
	// 	setup: function (app) {
	// 		server.start(app);
	// 	},
	// 	host: 'localhost',
	// 	port: 8080,
	// 	contentBase: __dirname + '/public'
	// },

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
		// new webpack.EnvironmentPlugin([
		// 		NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
  // 				DEBUG: false
  // 			]),
		new ExtractTextPlugin('[name].css', { allChunks: true, disable: NODE_ENV == 'development' }),
		// new HtmlWebpackPlugin({
		// 	template: 'home.ejs'
		// })
	],
}