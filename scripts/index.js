#!/usr/bin/env node


/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-31 22:04:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    yargs = require('yargs'),
    fs = require('ylan/fs'),
    stdout = require('ylan/stdout'),
    settings = require('../settings');


/**
 *****************************************
 * 定义参数
 *****************************************
 */
yargs
    .alias('c', 'config')
    .alias('p', 'prod')
    .boolean('prod');


/**
 *****************************************
 * 启动脚本
 *****************************************
 */
async function run() {
    let argv = yargs.argv,
        task = argv.prod ? './dist.js' : './dev.js',
        config = argv.config;

    // 获取配置文件
    if (!config) {
        config = await fs.find('yack.conf.js', 'yack.js', 'settings.js', 'settings.json');
    }

    /* 执行打包回调 */
    await require(task)(
        settings({ ...(config ? fs.resolve(config.path) : {}), ...argv })
    );
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = run().catch(stdout.error);


