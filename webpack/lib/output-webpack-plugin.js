/**
 *****************************************
 * Created by lifx
 * Created on 2017-08-13 16:55:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    { promisify } = require('util'),
    isDevelopment = process.env.NODE_ENV === 'development';


/**
 *****************************************
 * 定义插件
 *****************************************
 */
class OutputWebpackPlugin {

    // 初始化插件
    constructor(options) {
        this.options = options || {};
    }

    /* 定义插件执行方法 */
    apply(compiler) {
        let {
                data,
                match = /\{\{(.*?)\}\}/g,
                filename = isDevelopment,
                callback: onEmitHandler
            } = this.options;


        // 添加插件勾子
        compiler.hooks.compilation.tap('OutputWebpackPlugin', compilation => {
            let ready = false;

            // 添加模板生成前事件
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('OutputWebpackPlugin', (chunk, callback) => {

                // 替换模板变量
                if (data && typeof data === 'object') {
                    chunk.html = chunk.html.replace(match, (find, $1) => {
                        let [key = '', val = ''] = $1.split(':');

                        // 去除空白
                        key = key.trim();
                        val = val.trim();

                        // 替换变量
                        return key in data ? data[key] : val;
                    });
                }

                // 执行回调
                callback(null, chunk);
            });

            // 添加输出事件
            compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('OutputWebpackPlugin', (data, callback) => {

                // 执行回调
                if (!ready) {
                    let res = onEmitHandler && onEmitHandler.call(this, data, compiler);

                    // 抛出错误
                    if (res && 'then' in res) {
                        res.catch(err => console.log(err));
                    }

                    // 输出开发入口文件
                    filename && this.createOutputFile(filename, data, compiler);

                    // 更新标识
                    ready = true;
                }

                // 执行回调
                callback(null, data);
            });
        });
    }

    /* 生成输入文件 */
    createOutputFile(name, data, compiler) {
        let dist = compiler.options.output.path,
            filename = name === true ? data.outputName : name;


        // 获取目录状态
        fs.stat(dist, async err => {

            // 目录不存在
            if (err) {
                await promisify(fs.mkdir)(dist);
            }

            // 生成文件
            await promisify(fs.writeFile)(
                path.resolve(dist, filename), data.html.source()
            );
        });
    }
}


/**
 *****************************************
 * 抛出插件
 *****************************************
 */
module.exports = OutputWebpackPlugin;
