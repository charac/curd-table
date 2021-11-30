/*
 * @since: 2021-11-30 09:48:08
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-30 09:58:52
 * @文件相对于项目的路径: \financial-sx-sso-webe:\npm仓库\curd-table\packages\components\curd-table\index.js
 * @Author: ltm@xtoneict.com
 * @message: 
 */
import curdTable from './src/curdTable';

/* 安装组件 */
curdTable.install = function (Vue) {
  Vue.component(curdTable.name, curdTable);
};

export default curdTable;