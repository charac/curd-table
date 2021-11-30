/*
 * @Author: ltm
 * @Date: 2021-10-31 21:01:12
 * @LastEditTime: 2021-10-31 22:38:17
 * @LastEditors: ltm
 * @Description:
 * @FilePath: /beijing-normal-university/src/icons/index.js
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
