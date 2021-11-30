/*
 * @since: 2021-11-24 14:23:10
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-30 08:59:22
 * @文件相对于项目的路径: \financial-sx-sso-webe:\npm仓库\curd-table\examples\router\index.js
 * @Author: ltm@xtoneict.com
 * @message: 
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/curTable',
    name: 'curdTable',
    component: () => import('../views/curdTable')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (to) => {
    if (to.hash && !/^#/.test(to.hash)) {
      return { selector: to.hash };
    }
    // 这里有个小改动，x => left, y => top，简单提一下
    return { top: 0 };
  },
  routes
})

export default router
