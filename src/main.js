import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/element-variables.scss'

import router from './router'

import sysComponents from '@/components/index.js'


import '@/common/vue-echarts'
// 引入echarts
import Echarts from 'vue-echarts'
import '@/common/directive.js'
// Vue.use(globalComponent)
import dynamicPage from '@/packages/index.js'
import '@/packages/css/index.less'
import dyConfig from './config'
Vue.use(sysComponents)

Vue.config.productionTip = false
Vue.component('VUeEcharts', Echarts)
Vue.use(ElementUI)

import VueAMap from '@/common/mapClient/amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: amapWebMapKey.amapWebMapKey,
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.MouseTool',
    'AMap.Geocoder',
    'Amap.ControlBar'
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.5'
})

Vue.config.productionTip = false
Vue.use(dynamicPage, dyConfig)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
