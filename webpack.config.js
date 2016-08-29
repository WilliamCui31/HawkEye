var path = require('path');
var openBrowserPlugin = require('open-browser-webpack-plugin');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: {
		app: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:9000',
			path.resolve(__dirname, './src/app.js')
		],
		login: path.resolve(__dirname, './src/views/Login.js')
	},
	output: {
		path: path.resolve(__dirname, './'),
		filename: '[name].js'
	},
	resolve: {
		extentions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: NODE_MODULES,
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
		new openBrowserPlugin({url: 'http://localhost:9000'})
	]
}