/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 10:14:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const webpack = require('webpack');


/**
 *****************************************
 * 生成配置
 *****************************************
 */
module.exports = settings => (
    webpack({
        ...require('./base.conf')(settings),
        ...require(settings.isProduction ? './dist.conf' : './dev.conf')(settings)
    })
);
