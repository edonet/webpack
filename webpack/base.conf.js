/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 10:21:30
 *****************************************
 */
'use strict';


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
        rules: require('./rules.conf')(settings)
    },
    externals: settings.externals,
    optimization: settings.optimization || {
        minimize: settings.prod,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
                }
            }
        }
    }
});
