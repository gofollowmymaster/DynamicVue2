/* const context=require.content(需要搜索的目录,是否搜索子目录,匹配文件的正则表达式)
context.resolve()、context.keys()、context.id
*/

import globalDialogForm from './utils/globalDialogForm'
import globalDialogPage from './utils/globalDialogPage'
import { generateActionOption } from './utils/actionTools'

import bus from './utils/bus'
import { appendToPreset } from './utils/tool'
import { buildSearchFields, buildTableFields, buildDetailFields, buildFormFields } from './utils/fieldsConfigUtil'

import presetConfig from './presetConfig'

const files = require.context('./components', true, /\.vue$/)
export const components = {}
files.keys().forEach(url => {
    const urlKey = url.replace(/.*\/(\w*)\.vue$/, '$1') // 文件名作为key
    const fileDefault = files(url).default // export default 文件内容
    components[urlKey] = fileDefault
})

export default {
    install(Vue, options) {
        if (this.install.installed) return
        this.install.installed = true

        for (const name in components) {
            Vue.component(name, components[name])
        }
        // Api方式调用dialogForm  dialogPage 组件
        Vue.prototype.$globalDialogPage = globalDialogPage
        Vue.prototype.$globalDialogForm = globalDialogForm
        // 事件总线
        Vue.prototype.$dynamicBus = bus
        // 全局工具方法
        Vue.prototype.$buildSearchFields = buildSearchFields
        Vue.prototype.$buildTableFields = buildTableFields
        Vue.prototype.$buildDetailFields = buildDetailFields
        Vue.prototype.$buildFormFields = buildFormFields
        Vue.prototype.$generateActionOption = generateActionOption

        Vue.prototype.$dynamicConfig = presetConfig.setCustomConfig(options)

        Vue.prototype.$appendToPreset = appendToPreset
    }
}
