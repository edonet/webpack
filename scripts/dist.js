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
    webpack = require('../webpack');


/**
 *****************************************
 * 启动打包
 *****************************************
 */
module.exports = settings => {
    let compiler = webpack(settings);

    // 开始编译
    compiler.run((err, stats) => {

        // 处理错误信息
        if (err) {
            return console.error(err);
        }

        // 打印编译信息
        process.stdout.write(stats.toString(settings.stats) + '\n\n');
    });
};
