var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		app: path.resolve(__dirname, './src/app.js'),
		login: path.resolve(__dirname, './src/views/Login.js')
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	resolve: {
		extentions: ['', '.js', '.jsx'],
		alias: {
			'styles': path.resolve(__dirname, './assets/styles')
		}
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		},{
			test: /\.css$/,
			loader: 'style!css'
		},{
			test: /\.(png|jpg|gif|eot|svg|ttf|woff)\??.*$/,
			loader: 'url?limit=25000&name=[path][name].[ext]'
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
		//new webpack.optimize.CommonsChunkPlugin('common.js'),
		//new webpack.optimize.DedupePlugin(),
		//new webpack.optimize.UglifyJsPlugin(),
		//new webpack.optimize.AggressiveMergingPlugin()
	]
}