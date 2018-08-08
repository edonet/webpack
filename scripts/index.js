#!/usr/bin/env node


/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 09:26:01
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
    fs = require('@arted/utils/fs'),
    path = require('@arted/utils/path'),
    stdout = require('@arted/utils/stdout'),
    settings = require('../settings');


/**
 *****************************************
 * 定义参数
 *****************************************
 */
yargs
    .alias('c', 'config')
    .alias('p', 'prod')
    .boolean('https')
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
        let arr = ['settings.json', 'settings.js', 'yack.js', 'yack.conf.js'];

        for (let name of arr) {
            let file = path.cwd(name);

            if (await fs.stat(file)) {
                argv = { ...require(file), ...argv };
                break;
            }
        }
    }

    /* 执行打包回调 */
    await require(task)(settings(argv));
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = run().catch(stdout.error);



