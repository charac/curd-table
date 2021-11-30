/*
 * @since: 2021-11-24 15:38:51
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-30 10:10:50
 * @文件相对于项目的路径: \financial-sx-sso-webe:\npm仓库\curd-table\vue.config.js
 * @Author: ltm@xtoneict.com
 * @message: vue.config.js配置项
 */
const chalk = require('chalk') // 文字打印颜色
// const CompressionPlugin = require("compression-webpack-plugin")   // 开启Gzip
console.log(chalk.green('当前运行环境', process.env.NODE_ENV))
// 拼接路径
const resolve = (dir) => require('path').join(__dirname, dir)
// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开 true为打开
  productionSourceMap: false,
  /**
* 配置项对css预处理
*/
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: false, // 设置为true时，使用全局element-ui会造成无法找到字体和图标文件 .woff .ttf
    // 默认生产环境下是 true，开发环境下是 false
    // extract: true,   // ture时影响热更新 强制内联CSS
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // 设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
        data: `
          $baseUrl: "/";
          `
        // data: `
        // @import '@/assets/scss/_common.scss';
        // $baseUrl: "/";
        // `
      }
      // postcss: {
      //   plugins: [
      //   ]
      // }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('~', resolve('packages'))
    // 非开发环境关闭日志输出
    /* config
      .when(process.env.NODE_ENV !== 'development', config => {
        // config.optimization.splitChunks({ // 开启代码分割
        // 	chunks: 'all'
        // })
        config.optimization.minimizer('TerserPlugin').use(TerserPlugin, [{
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        }])
      }) */
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('packages/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('packages/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
}
