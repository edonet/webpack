/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-28 12:00:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    webpack = require('webpack'),
    isProduction = process.env.NODE_ENV === 'production';


/**
 *****************************************
 * 生成配置
 *****************************************
 */
module.exports = settings => webpack({
    ...require('./base.conf')(settings),
    ...require(isProduction ? './dist.conf' : './dev.conf')(settings)
});
