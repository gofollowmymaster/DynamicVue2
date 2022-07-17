import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// router-view页面

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: ' ',
      redirect: '/tableList'
    },
    {
      path: '/order',
      name: '订单',
      component: () => import('@/views/index.vue'),
      redirect: '/order/list',
      children: [

        {
          path: 'list',
          name: '订单列表',
          component: () => import('@/views/order/list.vue')
        },
        {
          path: 'plist',
          name: '订单列表',
          component: () => import('@/views/order/planList.vue')
        },
        {
          path: 'blist',
          name: '执行中订单列表',
          component: () => import('@/views/order/buildingList.vue')
        }

      ]
    },
    {
      path: '/tableList',
      name: '资产',
      component: () => import('@/views/index.vue'),
      redirect: '/tableList/overview',
      children: [

        {
          path: 'overview',
          name: '固定资产概览',
          component: () => import('@/views/overview.vue')
        },
        {
          path: 'list',
          name: '固定资产',
          component: () => import('@/views/tableList/index.vue')
        },

        {
          path: 'streettree',
          name: '不动产',
          component: () => import('@/views/streetTree.vue')
        },

        {
          path: 'statistic',
          name: '综合查询统计',
          component: () => import('@/views/group.vue'),
          children: [
            {
              path: 'index',
              name: '固定资产统计',
              component: () => import('@/views/statistic.vue')
            }
          ]
        },

        {
          path: 'warning',
          name: '告警信息',
          component: () => import('@/views/warning.vue')
        },

        {
          path: 'base',
          name: '基础配置',
          component: () => import('@/views/group.vue'),
          children: [
            {
              path: 'species',
              name: '资产类型管理',
              component: () => import('@/views/treeSpecies.vue')
            }
          ]
        }
      ]
    }

  ]
})

export default router
