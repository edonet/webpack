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
    path = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    standLoader = require('@arted/stand-loader'),
    postCSSOptions = require('./postcss.conf'),
    resolve = require.resolve;


/*
 ****************************************
 * 定义生成加载器方法
 ****************************************
 */
function loaderCreator(isProduction) {
    return (name, options) => ({
        loader: name + '-loader',
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
            loader: '@arted/css-loader',
            options: {
                minimize: settings.isProduction,
                modules: true,
                camelCase: 'dashes',
                localIdentName: '[local]-[hash:base64:8]'
            }
        },
        useLoader = {
            loader: '@arted/use-loader',
            options: {
                disabled: settings.framework === 'vue'
            }
        };


    // 返回规则
    return [
        ...settings.rules,
        standLoader({
            APP_STYLE: path.resolve(settings.src, settings.style)
        }),
        {
            test: /\.worker\.js$/,
            loader: 'worker-loader'
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules[\\/]+(?!(webpack-dev-server|@arted))/,
            loader: 'babel-loader',
            options: {
                presets: [resolve('babel-preset-react-app')]
            }
        },
        {
            test: /\.vue?$/,
            loader: 'vue-loader',
            options: {
                cssModules: cssLoader.options,
                postcss: postCSSOptions,
                extractCSS: true
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
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'img/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.svg$/,
            loader: 'var-loader'
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
            test: /\.icon$/,
            loader: 'svgs-loader'
        },
        {
            test: /\.(html|md|tpl)$/,
            loader: 'raw-loader'
        }
    ];
};
