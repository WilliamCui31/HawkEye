var path = require('path');
var webpack = require('webpack');
var HtmlWebpackplugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		app: path.resolve(__dirname, './src/app.js'),
		vender: ['react','react-dom','react-router']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash].js'
	},
	resolve: {
		extentions: ['', '.js', '.jsx'],
		alias: {
			'styles': path.resolve(__dirname, './assets/styles')
		}
	},
	postcss: [autoprefixer({browsers:['last 2 versions']})],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		},{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader", 'postcss-loader')
		},{
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)\??.*$/,
			loader: 'url?limit=25000&name=[path][name].[ext]'
		}]
	},
	plugins: [
		new CleanPlugin(['dist'], {
	        "root": path.resolve(__dirname, './'),
	        verbose: true,
	        dry: false
    	}),
    	new ExtractTextPlugin("assets/styles/[name].[hash].css"),
		new HtmlWebpackplugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin('vender','vender.js'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
	            warnings: false
	        }
		}),
		new webpack.optimize.AggressiveMergingPlugin()
	]
}