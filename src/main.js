import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/element-variables.scss'
import router from './router'

// import {amapWebMapKey} from './config.js';
import sysComponents from '@/components/index.js'
Vue.use(sysComponents)

import VueAMap from '@/common/mapClient/amap'
import '@/common/vue-echarts'
// 引入echarts
import Echarts from 'vue-echarts'
import '@/common/directive.js'


// 注册全局组件
Vue.config.productionTip = false
// Vue.prototype.$echarts=echarts;
Vue.component('VUeEcharts', Echarts)

Vue.use(ElementUI)

const amapWebMapKey = window._config.amapWebMapKey

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: amapWebMapKey,
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
// Vue.use(globalComponent)
import dynamicPage from '@/common/dynamicPage/index.js'
Vue.use(dynamicPage,{
  actionTip:'msg'
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
