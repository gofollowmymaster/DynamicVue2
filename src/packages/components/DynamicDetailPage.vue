<template />
<script>
import {
    deepMerge,
    deepCopy
} from '../utils/tool'
import actionMixin from './actionMixin'
import actionPresetMixin from './actionPresetMixin'

export default {
    name: 'DynamicDetailPage',
    mixins: [actionMixin, actionPresetMixin],
    props: {
        fields: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        actions: {
            type: Object,
            require: true
        },
        apiPromises: {
            type: Object,
            default() {
                return {}
            }
        },
        formSections: {
            type: Object,
            default() {
                return {}
            }
        },
        query: [    Object],
        actionKey: [String],
        entityLabel: String
    },
    data: function() {
        return {
            pageOpened: false
        }
    },

    computed: {
        actionList() {
            const pageActions = this.generatePageActionOptions('router')
            const lineActions = deepMerge(pageActions,
                                          this.actions,
                                          true
            )
            // 过滤非弹窗事件
            for (const key in lineActions) {
                const actionType = lineActions[key].actionType
                if (!actionType || actionType.toLowerCase().indexOf('dialog') < 0) {
                    delete lineActions[key]
                }
            }
            return lineActions
        },
        actionAndQuery() {
            return {
                query: this.query,
                actionKey: this.actionKey
            }
        }

    },
    watch: {
        actionAndQuery: {
            handler({ actionKey, query }) {
                debugger
                if (query.id || actionKey) {
                    this.openPage(query, actionKey)
                    return
                }
                this.closeDetail()
            },
            immediate: true,
            deep: true
        }
    },
    created() {
    },
    mounted() {
    },

    methods: {
        openPage(query, actionKey) {
            console.log('----this.actionList---', this.actionList)
            if (!this.actionList[actionKey]) {
                actionKey = Object.keys(this.actionList).filter(action => this.actionList[action]).filter(action => action.startsWith('detail'))[0]
            }
            let action = deepCopy(this.actionList[actionKey])
            action = this.$generateActionOption(action.actionType, action)
            const actionData = query

            if (action.actionType.startsWith('router')) {
                action.actionType = action.actionType.replace('router', '').replace(/(^\w)/, function(start) {
                    return start.toLowerCase()
                })
            }

            if (action.dialog?.properties) {
                action.dialog.properties.navType = 'router'
            }
            action.dialog.container = 'DyPage'
            // if(action.dialog.body?.actions){
            //   action.dialog.body.actions={}
            // }
            this.actionHandle(action, actionData)
            this.pageOpened = true
        },
        closeDetail() {
            this.pageOpened === true && this.actionHandle({ actionType: 'close' })
        }
    }
}
</script>
