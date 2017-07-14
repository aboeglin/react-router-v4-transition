var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    watch: true,
    devtool: 'cheap-module-source-map',
    entry: {
        bundle: path.resolve(__dirname, 'src/example/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'example'),
        filename: "bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/example/index.html', to: 'index.html'},
            {from: 'src/example/main.css', to: 'main.css'}
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, "/example"),
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ]
    }
};