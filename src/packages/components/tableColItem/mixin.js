export default {
    props: {
        rowData: {
            type: Object,
            default: () => ({})
        },
        colOptions: {
            type: Object,
            default() {
                return {}
            }
        }
    },

    computed: {
    // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
    // 忽略属性【key、size】
        bindOptions() {
            const obj = Object.assign({}, this.item)

            delete obj.events
            delete obj.colProperties
            delete obj.key
            delete obj.type

            return obj
        },
        bindEvent() {
            return this.item.events
        }

    },
    mounted() {
    // todo 初始化时候触发valueLink  （数据第一次加载时触发不是表单渲染出来触发）
    },
    methods: {

    }
}
