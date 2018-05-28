/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-28 17:40:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('ylan/fs'),
    path = require('ylan/path'),
    SVGO = require('svgo');


/**
 *****************************************
 * 加载图标
 *****************************************
 */
module.exports = function (context) {
    let cb = this.async(),
        config = {
            context: this.context
        };


    // 获取配置
    try {
        config = { ...config, ...JSON.parse(context) };
    } catch (err) {
        // do nothings;
    }

    // 加载文件
    loader(config).then(
        code => cb(null, code),
        err => cb(err)
    );
};


/**
 *****************************************
 * 加载图标
 *****************************************
 */
async function loader({ context, src = './' }) {
    let folder = path.resolve(context, src),
        files = await fs.readdir(folder),
        svgo = new SVGO(),
        defer = [];


    // 处理文件内容
    files.forEach(file => {
        if (file.endsWith('.svg')) {
            defer.push((async () => {
                let id = path.basename(file, '.svg'),
                    code = await fs.readFile(path.resolve(folder, file));


                // 优化代码
                code = await new Promise(resolve => {
                    svgo.optimize(code, res => resolve(res.data));
                });

                // 替换【svg】根标签
                code = code.replace(/<svg[^>]+>/, '').replace('</svg>', '');

                // 添加组标签
                code = `<g id="${ id }">${ code }</g>`;

                // 返回结果
                return { id, code };
            })());
        }
    });

    // 生成图标
    files = await Promise.all(defer);

    console.log(files);

    return '';
}
