var path = require('path');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var htmlWebpackplugin = require('html-webpack-plugin');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

module.exports = {
	entry: {
		app: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:9000',
			path.resolve(__dirname, './src/app.js')
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash].js'
	},
	resolve: {
		extentions: ['', '.js', '.jsx'],
		alias: {
			'styles': path.resolve(__dirname, './assets/styles'),
			'images': path.resolve(__dirname, './assets/images')
		}
	},
	postcss: [require('autoprefixer')],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: 'node_modules',
			query: {
				presets: ['react', 'es2015']
			}
		},{
			test: /\.css$/,
			loader: 'style!css!postcss'
		},{
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)\??.*$/,
			loader: 'url?limit=25000&name=[path][name].[ext]'
		},{
			test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
			loader: 'imports?define=>false&this=>window'
		}]
	},
	plugins: [
		new openBrowserPlugin({url: 'http://localhost:9000'}),
		new htmlWebpackplugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new DashboardPlugin(dashboard.setData)
	]
}
