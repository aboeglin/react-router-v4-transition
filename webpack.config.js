var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: "react-router-transition.js",
        library: 'ReactRouterTransition',
        libraryTarget: 'umd'
    },
    externals: [
        'react',
        'react-dom',
        'react-router',
        'prop-types',
        'react-transition-group'
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


console.log(path.resolve(__dirname, 'src'))