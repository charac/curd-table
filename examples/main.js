/*
 * @since: 2021-11-24 14:23:10
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-26 18:28:35
 * @文件相对于项目的路径: \financial-sx-org-webe:\npm仓库\curd-table\examples\main.js
 * @Author: ltm@xtoneict.com
 * @message: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const app = createApp(App);
// Vue.config.productionTip = false
app.use(ElementUI).use(store).use(router).mount('#app')
