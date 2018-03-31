/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-31 23:50:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    path = require('ylan/path'),
    ip = require('ylan/ip');


/**
 *****************************************
 * 定义配置
 *****************************************
 */
module.exports = {
    context: path.cwd(),
    src: './src',
    dist: './dist',
    filename: 'name.[chunkhash:8].js',
    publicPath: './',
    modules: [
        path.resolve(__dirname, '../node_modules'),
        path.cwd('./node_modules')
    ],
    alias: {},
    externals: {},
    devServer: {
        hot: true,
        hotOnly: true,
        host: ip(),
        port: 10060,
        https: false,
        disableHostCheck: true,
        contentBase: './dist',
        publicPath: '/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        compress: true,
        inline: true,
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    }
};
