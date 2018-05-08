'use strict';


/*
 ****************************************
 * 加载依赖模块
 ****************************************
 */
const
    varImporter = require('var-importer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    postCSSOptions = require('./postcss.conf'),
    isDevelopment = process.env.NODE_ENV === 'development',
    resolve = require.resolve;


/*
 ****************************************
 * 定义生成加载器方法
 ****************************************
 */
function loaderCreator() {
    return (name, options) => ({
        loader: name + '-loader',
        options: Object.assign({ sourceMap: isDevelopment }, options)
    });
}


/**
 *****************************************
 * 提取样式
 *****************************************
 */
function extractStyle(...loaders) {
    return ExtractTextPlugin.extract({
        fallback: 'style-loader', use: loaders
    });
}


/*
 ****************************************
 * 输出配置项
 ****************************************
 */
module.exports = settings => {
    let loader = loaderCreator(settings),
        postcssLoader = loader('postcss', postCSSOptions),
        sassLoader = loader('sass', { importer: varImporter({ alias: settings.alias }) }),
        cssModules = {
            minimize: isDevelopment,
            modules: true,
            camelCase: 'dashes',
            localIdentName: '[local]-[hash:base64:8]'
        };


    // 加载器列表
    return [
        ...settings.rules,
        {
            test: /\.jsx?$/,
            exclude: /node_modules[\\/]+(?!webpack-dev-server|ylan)/,
            loader: 'babel-loader',
            options: {
                presets: [resolve('babel-preset-react-app')]
            }
        },
        {
            test: /\.vue?$/,
            loader: 'vue-loader',
            options: {
                cssModules,
                postcss: postCSSOptions,
                extractCSS: true
            }
        },
        {
            test: /\.s?css$/,
            oneOf: [
                {
                    resourceQuery: /global/,
                    use: extractStyle(
                        loader('css', { minimize: isDevelopment }), postcssLoader, sassLoader
                    )
                },
                {
                    use: extractStyle(
                        loader('css', cssModules), postcssLoader, sassLoader
                    )
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            exclude: /[\\/]svgx[\\/]/,
            options: {
                limit: 8192,
                name: 'img/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'fonts/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.svgx$/,
            loader: 'svgx-loader'
        },
        {
            test: /\.svg$/,
            include: /[\\/]svgx[\\/]/,
            loader: 'svgx-loader'
        },
        {
            test: /\.(html|md|tpl)$/,
            loader: 'raw-loader'
        }
    ];
};
