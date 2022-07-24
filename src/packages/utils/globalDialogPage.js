import Vue from 'vue'
import globalDynamicPageDialog from '../components/dialog/DynamicPageDialog'

const GlobalDynamicPageDialogConstructor = Vue.extend(globalDynamicPageDialog)

const globalDynamicPageDialogFunc = function(options = {}, el = null) {
    const instance = new GlobalDynamicPageDialogConstructor({
        propsData: {
            ...options
        }
    })
    el = el || document.body
    el.appendChild(instance.$mount().$el)

    // 确保动画效果
    Vue.nextTick(() => {
        instance.visible = { value: true }
    })
}

export default globalDynamicPageDialogFunc
