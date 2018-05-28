/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-28 14:55:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载器
 *****************************************
 */
module.exports = function (content) {
    let code = content.replace(
            'exports.locals',
            'exports.locals = { __esModule: true };\nexports.locals.default'
        );


    // 返回代码
    return (
        code +
        '\n\nexports.locals.use = require("ylan/style").use(exports.locals.default);\n'
    );
};
