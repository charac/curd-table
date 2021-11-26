/*
 * @since: 2021-11-26 15:14:08
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-26 15:16:11
 * @文件相对于项目的路径: \financial-sx-org-webe:\npm仓库\curd-table\packages\components\x-dialog\index.js
 * @Author: ltm@xtoneict.com
 * @message: 弹窗组件
 */
import xDialog from './src/xDialog';

/* 安装组件 */
xDialog.install = function (Vue) {
  Vue.component(xDialog.name, xDialog);
};

export default xDialog;