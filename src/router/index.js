import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

const constantRoutes = [
    
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/index'),
                meta: {
                    title: store.state.settings.dashboardTitle
                }
            },
            {
                path: 'personal',
                component: EmptyLayout,
                redirect: '/personal/setting',
                meta: {
                    title: '个人中心',
                    breadcrumb: false
                },
                children: [
                    {
                        path: 'setting',
                        name: 'personalSetting',
                        component: () => import('@/views/personal/setting'),
                        meta: {
                            title: '个人设置'
                        }
                    },
                    {
                        path: 'edit/password',
                        name: 'personalEditPassword',
                        component: () => import('@/views/personal/edit.password'),
                        meta: {
                            title: '修改密码'
                        }
                    }
                ]
            },
            {
                path: 'reload',
                name: 'reload',
                component: () => import('@/views/reload')
            }
        ]
    }
]

import dyExample from './modules/dyExample'

// 当 children 不为空的主导航只有一项时，则隐藏
let asyncRoutes = [
    {
        meta: {
            title: '演示',
            icon: 'sidebar-default'
        },
        children: [
            // MultilevelMenuExample,
            // BreadcrumbExample,
            dyExample
        ]
    }
]

const lastRoute = [{
    path: '*',
    component: () => import('@/views/404'),
    meta: {
        title: '404',
        sidebar: false
    }
}]

const router = new VueRouter({
    routes: constantRoutes
})

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

router.beforeEach(async(to, from, next) => {
    store.state.settings.enableProgress && NProgress.start()
    // 已经登录，但还没根据权限动态挂载路由
    if (!store.state.menu.isGenerate) {
        /**
         * 重置 matcher
         * https://blog.csdn.net/baidu_28647571/article/details/101711682
         */
        router.matcher = new VueRouter({
            routes: constantRoutes
        }).matcher
        const accessRoutes = await store.dispatch('menu/generateRoutes', {
            asyncRoutes,
            currentPath: to.path
        })
        accessRoutes.push(...lastRoute)
        accessRoutes.forEach(route => {
            router.addRoute(route)
        })
        next({ ...to, replace: true })
    }
    if (store.state.menu.isGenerate) {
        store.commit('menu/setHeaderActived', to.path)
    }
    to.meta.title && store.commit('settings/setTitle', to.meta.title)
     
    next()
})

router.afterEach(() => {
    store.state.settings.enableProgress && NProgress.done()
})

export default router
