/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 10:15:41
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
    VueLoaderPlugin = require('vue-loader/lib/plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    OutputWebpackPlugin = require('@arted/output-webpack-plugin');


/**
 *************************************
 * 抛出配置
 *************************************
 */
module.exports = settings => ({
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
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin(settings.copy),
        new HtmlWebpackPlugin({
            template: settings.index,
            filename: settings.index && path.basename(settings.index),
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new OutputWebpackPlugin({ data: settings.app })
    ]
});
