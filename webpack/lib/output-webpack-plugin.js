/**
 *****************************************
 * Created by lifx
 * Created on 2017-08-13 16:55:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义加载状态
 *****************************************
 */
let ready = false;


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
                data = {},
                test = /\{\{(.*?)\}\}/g,
                callback: onEmitHandler
            } = this.options;


        compiler.hooks.compilation.tap('OutputWebpackPlugin', compilation => {
            let ready = false;

            compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('OutputWebpackPlugin', (data, cb) => {

                // 执行回调
                if (!ready) {

                    ready = true;
                }

                // 执行回调
                cb(null, data);
            });
        });
    }
}


/**
 *****************************************
 * 抛出插件
 *****************************************
 */
module.exports = OutputWebpackPlugin;
