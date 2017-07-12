var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: "react-router-v4-transition.js",
        library: 'ReactRouterV4Transition',
        libraryTarget: 'umd'
    },
    externals: [
        'react',
        'react-dom',
        'react-router',
        'prop-types'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
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