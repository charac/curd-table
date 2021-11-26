/*
 * @since: 2021-11-26 11:35:27
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-26 15:09:19
 * @文件相对于项目的路径: \financial-sx-org-webe:\npm仓库\curd-table\packages\index.js
 * @Author: ltm@xtoneict.com
 * @message: 组件注册
 */
const files = require.context('./components', true, /index.js|xdialog.js$/);
// 所有组件列表
let components = []
console.log('所有组件列表', files.keys());
files.keys().forEach(key => {
  //console.log(files(key))
  if (files(key).default && (files(key).default.name || files(key).default.componentName)) {
    //console.log(files(key).default.name,files(key).default)
    //console.log(files(key).default.name)
    components.push(files(key).default);
  }
})

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  // components.map(component => {
  //   Vue.component(component.name, component);
  // });


  components.map(component => {
    if (component.mode && component.mode == 'prototype') {
      Vue.prototype['$' + component.componentName] = component;
    } else {
      Vue.use(component)
    }
  })

  //   Vue.prototype.$dialog = function(vnode, title = "", callback = function() {}) {
  //     xdialog.call(this, vnode, title, callback);
  // };
};


// 检测到Vue才执行，毕竟我们是基于Vue的
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: "1.0.0",
  install,
  // 所有组件，必须具有install，才能使用Vue.use()
  ...components
}
