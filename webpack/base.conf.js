/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-28 14:05:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    rules = require('./rules'),
    isProduction = process.env.NODE_ENV === 'production';


/**
 *****************************************
 * 生成配置
 *****************************************
 */
module.exports = settings => ({
    context: settings.src,
    output: {
        path: settings.dist,
        publicPath: settings.publicPath,
        filename: settings.filename,
        chunkFilename: settings.filename
    },
    resolve: {
        alias: settings.alias || {},
        extensions: ['.js', '.jsx'],
        modules: settings.modules || ['node_modules']
    },
    resolveLoader: {
        modules: settings.modules || ['node_modules']
    },
    module: {
        rules: rules(settings),
        noParse: /\.min(\.[\w]+)?$/
    },
    externals: settings.externals,
    optimization: settings.optimization || {
        minimize: isProduction,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
});
