/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-31 22:04:47
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
 * 输出配置
 *****************************************
 */
module.exports = settings => webpack(
    require(isProduction ? './dist.conf' : './dev.conf')(settings)
);
