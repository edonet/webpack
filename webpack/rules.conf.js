/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 10:25:50
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
    styleRule = require('@arted/style/rule'),
    postCSSOptions = require('./postcss.conf'),
    resolve = require.resolve;


/*
 ****************************************
 * 定义生成加载器方法
 ****************************************
 */
function loaderCreator(isProduction) {
    return (name, options) => ({
        loader: resolve(name + '-loader'),
        options: { sourceMap: isProduction, ...options }
    });
}


/**
 *****************************************
 * 生成配置
 *****************************************
 */
module.exports = settings => {
    let loader = loaderCreator(settings.isProduction),
        sassLoader = loader('@arted/sass'),
        postcssLoader = loader('postcss', postCSSOptions),
        styleLoader = settings.isProduction ? MiniCssExtractPlugin.loader : loader('style'),
        cssLoader = {
            loader: resolve('@arted/css-loader'),
            options: {
                minimize: settings.isProduction,
                modules: true,
                camelCase: 'dashes',
                localIdentName: '[local]-[hash:base64:8]'
            }
        },
        useLoader = {
            loader: resolve('@arted/use-loader'),
            options: {
                disabled: settings.framework === 'vue'
            }
        };


    // 返回规则
    return [
        ...settings.rules,
        styleRule,
        {
            test: /\.worker\.js$/,
            loader: resolve('worker-loader')
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules[\\/]+(?!(webpack-dev-server|@arted))/,
            loader: resolve('babel-loader'),
            options: {
                presets: [resolve('babel-preset-react-app')]
            }
        },
        {
            test: /\.s?css$/,
            use: [useLoader, styleLoader, cssLoader, postcssLoader]
        },
        {
            test: /\.scss$/,
            loader: sassLoader
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: resolve('url-loader'),
            options: {
                limit: 8192,
                name: 'img/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.svg$/,
            loader: resolve('var-loader')
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: resolve('url-loader'),
            options: {
                limit: 8192,
                name: 'fonts/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.icon$/,
            loader: resolve('svgs-loader')
        },
        {
            test: /\.(html|md|tpl)$/,
            loader: resolve('raw-loader')
        }
    ];
};
