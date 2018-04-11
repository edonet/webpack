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
    ip = require('ylan/ip'),
    cwd = path.cwd,
    dir = path.usedir(__dirname);


/**
 *****************************************
 * 定义配置
 *****************************************
 */
module.exports = ({ modules = [], ...settings }) => ({
    root: cwd(),
    src: cwd(settings.src || './src'),
    dist: cwd(settings.dir || './dist'),
    index: settings.index || dir('./index.html'),
    entry: settings.entry || './index.js',
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: settings.publicPath || './',
    modules: [
        cwd('./node_modules'),
        dir('../node_modules'),
        ...modules
    ],
    rules: settings.rules || [],
    alias: {
        vue: 'vue/dist/vue.js',
        ...settings.alias
    },
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
        entrypoints: false,
        ...settings.stats
    }
});
