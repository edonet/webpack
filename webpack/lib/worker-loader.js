/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-17 22:41:55
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载【web worker】
 *****************************************
 */
module.exports = function (code) {

    // 判断是否启用【web worker】
    if (this.resourcePath.endsWith('.worker.js')) {
        code = createWorkerCode(code.toString());
    }

    // 返回代码
    return code;
};


/**
 *****************************************
 * 创建【inline webworker】
 *****************************************
 */
function createWorkerCode(code) {
    return (
        'module.exports = (url => () => new Worker(url))(' +
            'window.URL.createObjectURL(' +
                'new Blob([`' + code + '`], { type: "text/javascript" })' +
            ')' +
        ');'
    );

}
