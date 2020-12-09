import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import '@/styles/lecshop.css' // 自定义 css
import '@/icons/iconfont.js' // iconfont 字体库
import Print from 'vue-print-nb'
Vue.use(Print);
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '106e6614c35c79d5d6b3386f7f93f3b6',
  plugin: ['AMap.PlaceSearch'],
  uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4'
});

// set ElementUI lang to EN
Vue.use(ElementUI, {locale});

Vue.config.productionTip = false

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line' // 线性
import 'echarts/lib/chart/bar' // 柱状
Vue.component('chart', ECharts)
import 'echarts/theme/macarons.js' // 主题
import 'echarts/lib/component/tooltip' // 提示
import 'echarts/lib/component/title' // 标题
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
