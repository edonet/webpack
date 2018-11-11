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
        config = argv.config,
        staticPath = [path.cwd('public'), path.cwd('static')];

    // 获取配置文件
    if (!config) {
        let arr = ['yack.config.js', 'yack.config.json', 'app.config.js', 'app.config.json'];

        for (let name of arr) {
            let file = path.cwd(name);

            if (await fs.stat(file)) {
                argv = { ...require(file), ...argv };
                break;
            }
        }
    }

    // 获取静态资源
    argv.staticPath = [];
    await fs.stat(staticPath[0]) && argv.staticPath.push(staticPath[0]);
    await fs.stat(staticPath[1]) && argv.staticPath.push(staticPath[1]);

    /* 执行打包回调 */
    await require(task)(settings(argv));
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = run().catch(stdout.error);



