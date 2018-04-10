const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["babel-polyfill", "./app.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].js"
	},
	devServer: {
		contentBase: "./dist"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "react-svg-loader",
						options: {
							jsx: true // true outputs JSX tags
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./index.html",
			filename: "./index.html"
		})
	],
	resolve: {
		modules: [
			/* Path resolvers for application imports using absolute path */
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	}
};
