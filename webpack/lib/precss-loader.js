/**
 *****************************************
 * Created by lifx
 * Created on 2018-01-12 15:54:59
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 生成样式默认加载接口代码
 *****************************************
 */
const code = (
    '\n\n' +
    '// es6 module\n' +
    'exports.locals["__esModule"] = true;\n' +
    'exports.locals["default"] = require("ailo/lib/className")(exports.locals);\n'
);


/**
 *****************************************
 * 样式加载器
 *****************************************
 */
module.exports = function precssLoader(content, ...args) {
    this.async()(null, content + code, ...args);
};
