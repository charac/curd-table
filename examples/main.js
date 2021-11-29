/*
 * @since: 2021-11-24 14:23:10
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-29 16:16:35
 * @文件相对于项目的路径: \financial-sx-org-webe:\npm仓库\curd-table\examples\main.js
 * @Author: ltm@xtoneict.com
 * @message: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入组件
import curdTable from '../packages'
const app = createApp(App);
// Vue.config.productionTip = false
app.use(curdTable).use(ElementPlus, { size: 'small', zIndex: 3000 }).use(store).use(router).mount('#app')
