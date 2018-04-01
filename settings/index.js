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
module.exports = ({ modules = [], ...settings }) => ({
    root: path.cwd(),
    src: path.cwd(settings.src || './src'),
    dist: path.cwd(settings.dir || './dist'),
    index: settings.index || './index.html',
    entry: settings.entry || './index.js',
    filename: 'js/name.[chunkhash:8].js',
    publicPath: settings.publicPath || '/',
    modules: [
        path.resolve(__dirname, '../node_modules'),
        path.cwd('./node_modules'),
        ...modules
    ],
    rules: settings.rules || [],
    alias: settings.alias || {},
    externals: settings.externals || {},
    devServer: {
        hot: true,
        hotOnly: true,
        host: ip(),
        port: 10060,
        https: false,
        publicPath: '/',
        disableHostCheck: true,
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
        ...settings.devServer
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        ...settings.stats
    }
});
