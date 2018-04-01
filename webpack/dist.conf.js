/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-01 12:02:56
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
        app: ['babel-polyfill', settings.entry]
    },
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin('css/[name]-[chunkhash:8].css'),
        new HtmlWebpackPlugin({
            filename: path.basename(settings.index),
            template: settings.index,
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
});
