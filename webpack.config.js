'use strict'

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyFilesPlugin = require('./frontend/services/copy-files-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
//console.log(UglifyJSPlugin);

//webpack.mix.copy(__dirname + '/frontend/**/*.html', 'public/views');

module.exports = {

	mode: NODE_ENV,
	context: __dirname,	
	entry: {
		build: './frontend/build',
		//auth: './frontend/login/auth',
		//view: './views/home.ejs.'
	},

	output: {
		path: __dirname + '/public/js',
		publicPath: 'public/js/',
		filename: '[name].js',
		library: '[name]'
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
		new CopyFilesPlugin(path.resolve(__dirname, 'frontend'), path.resolve(__dirname, 'public/views'), /\.html$/),
		// new CopyFilesPlugin({
  //         sourceRoot: __dirname + '/frontend/',
  //         targetRoot: __dirname + '/public/',
  //         files: ['login/views/login-user.html'],
  //         renameTargetDir: true,
  //         dirHashVarName: 'views',
  //         //cleanDirs: [__dirname + '/public/views']
  //       }),
		// new CopyWebpackPlugin(
		// 	[{
		// 		from: '/',
		// 		to: '/public/views/[name].[ext]',
		// 		test: /\.html$/,
		// 		toType: 'dir'
		// 	}], { debug: 'info' }),
		// , '/public/views')
		// new HtmlWebpackPlugin( {
		// 	template: __dirname + '/frontend/*.html'
		// })
	],
}