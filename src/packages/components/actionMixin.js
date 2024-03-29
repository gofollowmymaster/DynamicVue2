import dynamicActions from './actions/index'
import callbackActionHandles from './actions/callback.js'
import { deepCopy } from '../utils/tool'

export default {
    props: {},
    computed: {},
    inject: ['setGlobalDialogForm', 'setGlobalDialogPage', 'isGlobalDialogFormActive', 'refreshComponentKey'],
    methods: {
        actionHandle(action = {}, actionData = {}) {
            if (typeof action.actionHook === 'function') {
                action.actionHook(action, actionData)
            }
            if (action.isLoadData === false) {
                actionData = {}
            }
            debugger
            actionData=deepCopy(actionData)
            switch (action.actionType) {
                case 'dialogPage':
                case 'dialogForm':
                case 'requestApi':
                case 'download':
                    dynamicActions[action.actionType].handle(action, actionData, this)
                    break
                case 'submit':
                case 'link':
                case 'router':
                    this[action.actionType + 'Handle'](action, actionData)
                    break
                case 'back':
                    callbackActionHandles[action.actionType]({vm: this, callback: action.backStep || 1})
                    break
                case 'reset':
                case 'close':
                    callbackActionHandles[action.actionType]({vm: this, callback: true})
                    break
                case 'routerDialogPage':
                case 'routerDialogForm':
                    this.routerDialogHandle(action, actionData)
                    break
                default:
                    this.customActionHandle(action, actionData)
            }
        },
        submitHandle(action) {
            const DynamicFormContent =
        this.$refs.DynamicFormContent || this.$parent.$refs.DynamicFormContent
            if (DynamicFormContent) {
                DynamicFormContent.validate((valid, data) => {
                    if (valid) {
                        dynamicActions.requestApi.handle(action, data, this)
                    }
                })
            } else {
                console.warn(
                    'submit 动作 在组件中没有定义对应的 DynamicFormContent 表单 ref,'
                )
            }
        },
        linkHandle(action, actionData) {
            const link = typeof action.link == 'function' ? action.link(actionData) : action.link
            window.open(link, action.window)
        },
        routerHandle(action, actionData) {
            const path = typeof action.router === 'function' ? action.router(actionData) : action.router
            this.$router[action.routerAction || 'push'](path)
        },

        routerDialogHandle(action, actionData) {
            const mainKey = action.mainKey || 'id'
            let path; let query = {}
            debugger
            if (typeof action.router === 'function') {
                const routerInfo = action.router(actionData)
                path = routerInfo.path||''
                query = routerInfo.query ||{}  
            } else {
                path = this.$route.fullPath.split('#')[0].replace(/[\/|\\]$/, '') + '/'
            }
            const actionKey =  action.actionKey
            // path =path
            query = {...query, id: actionData?.[mainKey], action: actionKey }

            this.$router[action.routerAction || 'push']({ path, query })
        },

        customActionHandle(action, actionData) {
            if (typeof action.actionHandle === 'function') {
                action.actionHandle(actionData)
                return
            }
            console.warn('定义了未被识别的动作' + JSON.stringify(action))
        }
    }
}
