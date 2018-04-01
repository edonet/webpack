/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-01 11:41:40
 *****************************************
 */
'use strict';


/**
 *************************************
 * 加载依赖
 *************************************
 */
const
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    base = require('./base.conf');


/**
 *************************************
 * 抛出配置
 *************************************
 */
module.exports = settings => ({
    ...base(settings),
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?' + settings.publicPath,
            'webpack/hot/only-dev-server',
            settings.entry
        ]
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({ disable: true }),
        new HtmlWebpackPlugin({
            template: settings.index,
            filename: settings.index && path.basename(settings.index),
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
});
