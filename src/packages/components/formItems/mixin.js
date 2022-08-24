import { hasValue } from '../../utils/tool'
import formTypeActionMap from './formTypeActionMap'

export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        value: [String, Number, Array, Boolean, Object],
        allDisabled: {
            type: Boolean,
            default: false
        },
 
    },
    inject: [
        'formProps',
        'formMethods',
        'formData',
        'form'
    ],
    computed: {
    // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
   
        bindOptions() {
            return this.getDefaultBindOptions(this.item)
         
        },
        // 获取禁用状态
        isDisabled() {
            // 如果全部都被禁用了
            if (this.allDisabled) {
                return true
            }
            return this.item.disabled
        },
        val: {
            get() {
                return this.value
            },

            set(v) {
                // console.log(`|${v}|`);
                this.$emit('input', v)
                // 只有非子表单的情况下，才会冒泡上去数据变更

                this.formMethods.valueUpdateEvent({
                    [this.item.key]: v
                })
            }
        },
        // 是否采用文字模式
        isTextMode() {
            if (this.formProps.textMode) {
                return true
            }
            return false
        },
        // 获取输入框的 placeholder
        placeholder() {
            return  this.getPlaceholder(this.item)
        }
    },
    data() {
        return {
            action: formTypeActionMap[this.$options.name] || '请选择'
        }
    },
    created() {
        if (hasValue(this.item.defaultValue)) {
            this.val = hasValue(this.value) ? this.value : this.item.defaultValue
        }
    },
    methods: {
        getDefaultBindOptions(item) {
            let obj = Object.assign({}, item)

            obj = { ...obj, ...obj.properties, ...obj.extra }
            delete obj.wraperProperties
            delete obj.key
            delete obj.expressProp
            delete obj.type
            delete obj.label
            delete obj.readonly
            delete obj.rules
            delete obj.placeholder
            delete obj.prepend
            delete obj.append
            delete obj.defaultValue
            delete obj.extra
            delete obj.properties
            delete obj.options
            delete obj.groupProperties

            delete obj.hidden
            delete obj.value
            delete obj.loadOptionsApi

            obj.maxlength = obj.maxlength || 255

            return obj
        },
        // 获取输入框的 placeholder
        getPlaceholder(formItem) {
            // todo 这里可能还要加一个全部 disable 的判断
            // 如果已禁用，那么不显示 placeholder
            if (this.isDisabled) {
                return ''
            }
            // 如果有 placeholder，则直接返回
            if (formItem.placeholder) {
                return formItem.placeholder
            }
            // 否则返回默认的
            return `${this.action}${formItem.label}`
        },

        // 当取消焦点
        onFocus(e) {
            // 表单要素有 onFocus 事件，那么则触发
            if (this.item.events?.onFocus) {
                this.item.events.onFocus({
                    event: e,
                    option: this.item,
                    value: this.value,
                    formVm: this.form
                })
            }
        },

        // 当取消焦点
        onBlur(e) {
            // 表单要素有 onBlur 事件，那么则触发
            if (this.item.events?.onBlur) {
                this.item.events.onBlur({
                    event: e,
                    option: this.item,
                    value: this.value,
                    formVm: this.form
                })
            }
        },

        // 丢掉数字的小数点右边末尾的 0
        // 例如入参是 1.2000，出参是 1.2
        // 入参是 12.0000 ，出参是 12
        throwPointRightZero(v) {
            const n = String(v)
            if (n.indexOf('.') > -1) {
                // 有小数点
                const list = n.split('.')
                let pointRight = list[1]
                pointRight = pointRight.replace(/[0]+$/g, '')
                if (pointRight.length === 0) {
                    return list[0]
                } else {
                    return list[0] + '.' + pointRight
                }
            } else {
                // 无小数点
                return n
            }
        },

        // 丢掉数字的小数点左边开头的 0
        // 例如入参是 0123.45，出参是 123.45
        // 入参是 00.12 ，出参是 0.12
        throwPointLeftZero(v) {
            let n = String(v)
            if (n.indexOf('.') > -1) {
                // 有小数点
                const list = n.split('.')
                let pointLeft = list[0]
                pointLeft = pointLeft.replace(/^[0]+/g, '')
                if (pointLeft.length === 0) {
                    return '0.' + list[1]
                } else {
                    return pointLeft + '.' + list[1]
                }
            } else {
                // 无小数点，那么直接把左边开头的 0 扔掉
                n = n.replace(/^[0]+/g, '')
                // 如果结果为空，并且 v 不是空（比如是 0），那么返回 0
                // 如果都是空，则返回空（这里不做处理）
                if (n === '' && v !== '') {
                    n = '0'
                }
                // 无小数点
                return n
            }
        }
    }
}
