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
    path = require('ylan/path'),
    stdout = require('ylan/stdout'),
    settings = require('../settings');


/**
 *****************************************
 * 定义参数
 *****************************************
 */
yargs
    .alias('c', 'config')
    .default('config', './settings.js')
    .alias('p', 'prod')
    .boolean('prod');


/**
 *****************************************
 * 启动脚本
 *****************************************
 */
async function run() {
    let argv = yargs.argv,
        env = argv.prod ? 'production' : 'development';


    /* 设置环境变量 */
    process.env.NODE_ENV = 'development';
    process.env.BABEL_ENV = 'development';

    /* 获取本地配置 */
    try {
        let data = require(path.cwd(argv.config));

        // 合并配置
        if (data && typeof data === 'object') {
            console.log(data);
        }

    } catch (err) {
        // do nothing;
    }

    console.log(settings);
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = run().catch(stdout.error);


