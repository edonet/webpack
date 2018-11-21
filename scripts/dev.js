/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 09:52:27
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 设置环境变量
 ****************************************
 */
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    stdout = require('@arted/utils/stdout'),
    WebpackDevServer = require('webpack-dev-server'),
    openUrl = require('open'),
    webpack = require('../webpack');


/**
 *****************************************
 * 启动打包
 *****************************************
 */
module.exports = settings => {
    let { dist, stats, devServer, open } = settings,
        { https, host, port, publicPath } = devServer,
        server;


    // 设置服务器配置
    devServer.stats = stats;
    devServer.contentBase = dist;

    // 更新设置
    settings.filename = 'js/[name].bundle.js';
    settings.publicPath = `http${ https ? 's' : '' }://${ host }:${ port }/`;

    // 创建服务器
    server = new WebpackDevServer(webpack(settings), devServer);

    // 启动服务器监听
    server.listen(port, host, err => {

        // 处理错误信息
        if (err) {
            return console.error(err);
        }

        // 打印服务器信息
        stdout.block(
            `Project is running at ${ settings.publicPath }`,
            `Webpack output is served from ${ publicPath }`,
            `Content for webpack is served from ${ dist }`,
        );

        // 打开链接
        if (open) {

            // 获取默认浏览器
            if (open === true) {
                open = require('os').platform() === 'win32' ? 'chrome' : 'Google Chrome';
            }

            // 打开地址
            openUrl(settings.publicPath, open);
        }
    });
};
