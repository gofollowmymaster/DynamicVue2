<template>
    <main class="dynamic-form-wraper ">
        <DynamicFormContent
            ref="DynamicFormContent"
            :data="formData"
            :form-item-list="formItemList"
            v-bind="dynamicFormOption"
            @formDataUpdated="formDataUpdated"
        >
            <template v-for="slot in formSlots" #[slot.key]>
                <slot :name="slot.key" :value="formData[slot.key]" />
            </template>
        </DynamicFormContent>
        <DynamicActions
            v-if="!dynamicFormOption.textMode"
            class="mt32"
            :style="{'margin-left':dynamicFormOption.formProperties['label-width']||'100px'}"
            :actions="actions"
            mode="form"
            :action-data="{}"
        />
    </main>
</template>
<script>
import actionMixin from './actionMixin'
import { JSONDeepCopy } from '../utils/tool'
import { generateFormOptions }  from "../utils/actionTools"
export default {
    name: 'DynamicForm',
    components: {

    },
    mixins: [actionMixin],
    props: {
        formOption: {
            type: Object,
            default: function() {
                return {}
            }
        },
        formItemList: {
            type: Array,
            default: function() {
                return []
            }
        },
        actions: {
            type: Object,
            default: function() {
                return {}
            }
        },
        apiPromise: {
            type: Function,
            default: () => Promise.resolve()
        },
        data: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {
            formData: {}
        }
    },
    computed: {
        dynamicFormOption(){
            const options = this.formOption
            return   generateFormOptions(options)
        },
        formSlots() {
            return this.formItemFilter(item => {
                return item.type === 'slot'
            }).reduce((prev, next) => {
                return prev.concat(next.children)
            }, [])
        }
    },
    watch: {
        apiPromise: {
            handler(apiPromise) {
                debugger
                if (apiPromise instanceof Function) {
                    apiPromise(this.data)
                        .then(data => {
                            if (data instanceof Object) { this.formData = data }
                        })
                }
            },
            deep: true,
            immediate: true
        },
        data: {
            handler(data) {
                if (data instanceof Object) { this.formData = data }
            },
            immediate: true
        }

    },
    mounted() {
    },
    methods: {
        formItemFilter(func) {
            let formItemList = JSONDeepCopy(this.formItemList)
            formItemList.forEach((formSection, section) => {
                if (formSection.children && formSection.children.length > 0) {
                    formSection.children.forEach((formItem, index) => {
                        if (!func(formItem)) delete formItemList[section].children[index]
                    })
                    formItemList[section].children = formItemList[section].children.filter(item => item)
                }
            })
            formItemList = formItemList.filter(formSection => formSection.children.length)
            return formItemList
        },
        reset() {
            this.$refs.DynamicFormContent.resetFields()
        },
        actionHandle(action) {
            this.actionHandles(action)
        },
        formDataUpdated(vm, data) {

        }
    }
}
</script>
<style lang="css" scoped>
</style>
