/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-01 11:11:44
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 设置环境变量
 ****************************************
 */
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('ylan/fs'),
    webpack = require('../webpack');


/**
 *****************************************
 * 启动打包
 *****************************************
 */
module.exports = async settings => {

    // 清除输出目录
    await fs.rmdir(settings.dist);

    // 打印输出信息
    console.log(
        '-'.repeat(80),
        `\nProject is output to "${ settings.dist }"`,
        `\n${ '-'.repeat(80) }`
    );

    // 开始编译
    webpack(settings).run((err, stats) => {

        // 处理错误信息
        if (err) {
            return console.error(err);
        }

        // 打印编译信息
        process.stdout.write(stats.toString(settings.stats) + '\n\n');
    });
};
