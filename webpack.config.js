var path = require('path');
var webpack = require('webpack');
var vendors = require('./package.json').dependencies;

module.exports = {
    devtool: 'eval',
    entry: {
        app: [
            './src/index'
        ],
        vendor: ['react-hot-loader/patch', 'webpack-hot-middleware/client', ...Object.keys(vendors)]
    },
    externals: {
        "jquery": "$"
    },
    output: {
        path: path.join(__dirname, '../cars-search-laravel/public/js'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    },
    devServer: {
        proxy: {
            '**': {
                target: 'http://localhost:90',
            }
        }
    }
};
