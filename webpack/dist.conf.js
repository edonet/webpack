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
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin');


/**
 *************************************
 * 抛出配置
 *************************************
 */
module.exports = settings => ({
    entry: {
        app: ['babel-polyfill', settings.entry]
    },
    mode: 'production',
    plugins: [
        new VueLoaderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[name].[chunkhash:8].css'
        }),
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
