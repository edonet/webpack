/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-28 14:55:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义模板
 *****************************************
 */
const code = `
    if (module.exports) {
        var locals = module.exports;

        // 更新模块
        module.exports = {
            __esModule: true,
            default: locals,
            use: require("ylan/style").use(locals)
        };
    }
`;


/**
 *****************************************
 * 加载器
 *****************************************
 */
module.exports = value => [value, code].join('\n\n');
