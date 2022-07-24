import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import api from './api'
Vue.prototype.$api = api

import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

import auth from './util/auth'
Vue.use(auth)

import cookies from 'vue-cookies'
Vue.use(cookies)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/element-variables.scss'
Vue.use(ElementUI)

import hotkeys from 'hotkeys-js'
Vue.prototype.$hotkeys = hotkeys

// 全局组件自动注册
import './components/autoRegister'

// 自动加载 svg 图标
const req = require.context('./assets/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

import './assets/styles/reset.scss'

// import './mock'
import '@/common/directive.js'
import '@/common/vue-echarts'

import dynamicVue2 from '@/packages/index.js'
import dyConfig from './config'
Vue.use(dynamicVue2, dyConfig)
import '@/packages/css/index.less'

import VueAMap from '@/common/mapClient/amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
    key: dyConfig.amapWebMapKey,
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

Vue.prototype.$eventBus = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
