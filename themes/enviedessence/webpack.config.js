const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: './index.js',
        publicPath: '/build',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [["@babel/preset-env", { modules: false }]]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash].[ext]',
                    outputPath: '/img',
                    publicPath: '/themes/enviedessence/build/img'
                },
            },
            {
                test: /\.svg$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: '/img',
                    publicPath: '/themes/enviedessence/build/img'
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)(\?[\s\S]+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash].[ext]',
                    outputPath: '/font',
                    publicPath: '/themes/enviedessence/build/font'
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
        }),
    ],
    // Specific configuration for docker usage
    watchOptions: {
        poll: true,
        ignored: [
            path.resolve(__dirname, './node_modules'),
        ]
    },
};

module.exports = config;
