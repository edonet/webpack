/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-28 14:08:06
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    postCSSOptions = require('./postcss.conf'),
    isProduction = process.env.NODE_ENV === 'production',
    resolve = require.resolve;


/*
 ****************************************
 * 定义生成加载器方法
 ****************************************
 */
function loaderCreator() {
    return (name, options) => ({
        loader: name + '-loader',
        options: { sourceMap: isProduction, ...options }
    });
}


/**
 *****************************************
 * 生成加载规则
 *****************************************
 */
module.exports = settings => {
    let loader = loaderCreator(),
        postcssLoader = loader('postcss', postCSSOptions),
        sassLoader = loader('sass'),
        styleLoader = isProduction ? MiniCssExtractPlugin.loader : loader('style'),
        cssModules = {
            minimize: isProduction,
            modules: true,
            camelCase: 'dashes',
            localIdentName: '[local]-[hash:base64:8]'
        };


    // 返回规则
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
                    use: [
                        styleLoader,
                        loader('css', { minimize: isProduction }),
                        postcssLoader,
                        sassLoader
                    ]
                },
                {
                    use: [
                        styleLoader,
                        { loader: resolve('./precss-loader.js') },
                        loader('css', cssModules),
                        postcssLoader,
                        sassLoader
                    ]
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
            test: /icon\.json$/,
            loader: resolve('./icon-loader.js')
        },
        {
            test: /\.(html|md|tpl)$/,
            loader: 'raw-loader'
        }
    ];
};
