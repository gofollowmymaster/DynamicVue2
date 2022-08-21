import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
    path: '/dyexample',
    component: Layout,
    redirect: '/dyexample/page1',
    name: 'dypage1',
    meta: {
        title: '动态页面',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'page1',
            name: 'dysection',
            component: () =>
                import(
                    /* webpackChunkName: 'multilevel_menu_example' */ '@/views/dyexample/dysection1'
                ),
            meta: {
                title: '动态页面'
            }
        },
        {
            path: 'curd',
            name: 'dycurd',
            component: EmptyLayout,
            redirect: '/dyexample/dycurd1',
            meta: {
                title: '动态表格页面'
            },
            children: [
                {
                    path: 'dycurd1',
                    name: 'dycurd-1',
                    component: () =>
                        import(
                            /* webpackChunkName: 'multilevel_menu_example' */ '@/views/dyexample/dycurd1/index.vue'
                        ),
                    meta: {
                        title: '模板CURD页面'
                    }
                },
                {
                    path: 'dycurd2',
                    name: 'dycurd-2',
                    component: () =>
                        import(
                            /* webpackChunkName: 'multilevel_menu_example' */ '@/views/dyexample/dycurd2.vue'
                        ),
                    meta: {
                        title: '自定义组合CURD2'
                    }
                },
                {
                    path: 'dycurd3',
                    name: 'dycurd-3',
                    component: () =>
                        import(
                            /* webpackChunkName: 'multilevel_menu_example' */ '@/views/dyexample/dycurd3.vue'
                        ),
                    meta: {
                        title: '自定义组合CURD3'
                    }
                },
                {
                    path: 'dycurd4',
                    name: 'dycurd-4',
                    component: () =>
                        import(
                            /* webpackChunkName: 'multilevel_menu_example' */ '@/views/dyexample/order/list.vue'
                        ),
                    meta: {
                        title: '自定义组合CURD4'
                    }
                }
                // {
                //     path: 'dycurd4',
                //     name: 'dycurd-4',
                //     component: () =>
                //         import(
                //             /* webpackChunkName: 'multilevel_menu_example' */ '@/views/dyexample/order/list.vue'
                //         ),
                //     meta: {
                //         title: '自定义组合CURD4'
                //     }
                // },
                
            ]
        }
    ]
}
