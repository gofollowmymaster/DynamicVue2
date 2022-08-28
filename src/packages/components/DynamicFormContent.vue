<template>
    <main class="dynamic-form   " :class="[mode + '-form']">
        <formLayout :form-item-list="formItemList" @scroll="scrollTo">
            <el-form slot="main"
                     v-bind="formProperties"
                     ref="form"
                     :class="{'form-text-mode': textMode }"
                     :model="data"
                     :validate-on-rule-change="true"
            >
                <template v-for="formSection of formItemList">
                    <main
                        v-if=" !formSection.hidden && filterFormHide(formSection.children).length "
                        :ref="'form-section'+formSection.label"
                        :key="formSection.label"
                        :class="getBlockClass(formSection)"
                        class="pb18 form-section  "  >
                        <header v-if="formSection.label"  class="block-nav flex justify-between" >
                            <span class="block-text">{{ formSection.label }}</span>
                            <span
                                v-if="showFoldBtn"
                                class="block-fold-btn"
                                @click="foldBlock(formSection)"
                            >
                                {{ isBlocked(formSection) ? "展开" : "收起" }}
                                <i :class="[ 'el-icon-arrow-' + (isBlocked(formSection) ? 'down' : 'up'), ]" />
                            </span>
                        </header>
                        <article  class="block-content relative grid-wrap" >
                            <template v-for="(formItem) in formSection.children">
                                <DynamicFormItem
                                    :ref="formItem.key"
                                    :key="formItem.key"
                                    v-model="data[formItem.key]"
                                    class="grid-item"
                                    :form-item="formItem"
                                    :label="getFormItemLabel(formItem)"
                                >
                                    <template #[formItem.key]>
                                        <slot :name="formItem.key" :value="data[formItem.key]" />
                                    </template>
                                </DynamicFormItem>
                            </template>
                        </article>
                    </main>
                </template>
            </el-form>
        </formLayout>
        <testTool
            v-if="showTestTool"
            :fields="formItemList"
            ref-form-name="form"
        />
    </main>
</template>

<script>
import { deepCopy, JSONDeepCopy, parseExpression } from '../utils/tool'

export default {
    name: 'DynamicFormContent',
    components: {},
    provide() {
        return {
            // 状态切换函数
            formMethods: {
                // 设置为禁用
                setFormItemDisabled: this.setFormItemDisabled,
                // 设置为隐藏
                setFormItemHidden: this.setFormItemHidden,
                // 设置为必填
                setFormItemRequired: this.setFormItemRequired,
                // 更新表单数据
                updateFormData: this.updateFormData,
                valueUpdateEvent: this.valueUpdateEvent
            },
            // 会动态变化的数据（注意，来自 props【更上级组件】的数据，不能放这个里面，只能显式的通过 props 往下面传）
            formProps: this.formProps,
            formData: this.getData,
            formProperties: () => this.formProperties,
            colNum: this.colNum,
            form: this
        }
    },
    props: {
        data: {
            type: Object,
            default: function() {
                return {}
            }
        },
        formProperties: {
            type: Object,
            default: function() {
                return {}
            }
        },
        formItemList: {
            type: Array,
            default: () => []
        },

        // 是否显示收起、展开按钮
        showFoldBtn: {
            type: Boolean,
            default: false
        },

        // 全部表单元素禁用。通常用于提交时使用
        allDisabled: {
            type: Boolean,
            default: false
        },
        // 是否给表单显示border 外框，包含区块外侧有 boder
        borderForm: {
            type: Boolean,
            default: true
        },
        // 文字模式。不显示表单组件，只显示纯文字内容
        // 同时，纯文本模式（即值为 true 的时候），会隐藏表单要素 label 左边的星号
        textMode: {
            type: Boolean,
            default: false
        },
        // 布局模式，中列数
        colNum: {
            type: Number,
            default: 2
        },
        mode: {
            type: String,
            default: 'dialog'
        },
        //是否展示数据填充按钮
        testTool: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            formProps: {
                // 所有动态数据，更准确的说，是会重新赋值的，需要放到 data 里，才能实现响应式。这是因为 provide 本身的特性导致的
                allDisabled: this.allDisabled,
                textMode: this.textMode
            },
            foldBlockList: [] // 收起的区块
        }
    },
    computed: {
        showTestTool() {
            return this.testTool && !this.textMode && this.$dynamicConfig.isDebug
        }

    },
    watch: {
        data: {
            handler(data) {
                this.computeExpressions()
            },
            deep: true,
            immediate: true
        }
    },
    created() {
    // todo 问题 props 傳入formItemList 变化后 formItemListInit 不会变化
    // 是否允许props 傳入formItemList  动态更新
    // this.formItemListInit=deepCopy(this.formItemList)
    // Object.freeze(this.formItemList)
    
    },
    methods: {
        filterFormHide(items) {
            return items.filter(item => item.type !== 'FormHide')
        },
        getFormItemListInit() {
            if (!this.formItemListInit) {
                this.formItemListInit = deepCopy(this.formItemList)
                Object.freeze(this.formItemListInit)
            }
            return this.formItemListInit
        },
        computeExpressions() {
            debugger
            const formItemListInit = this.getFormItemListInit()

            formItemListInit.forEach((formSection, index) => {
                const reg = /#\{(.+)?\}/

                if (typeof formSection.hidden === 'string' && reg.test(formSection.hidden)) {
                    this.formItemList[index].hidden = this.transExpression(formSection.hidden)
                }
                if (typeof formSection.disabled === 'string' && reg.test(formSection.disabled)) {
                    const disabled = this.transExpression(formSection.disabled)
                    this.setSectionElementDisable(this.formItemList[index].children, disabled)
                }

                formSection.children.forEach((item, innerIndex) => {
                    for (const key in item.expressProp) {
                        const propertyValue = item.expressProp[key]
                        let expressionValue; let isDynamicValue = false

                        if (typeof propertyValue === 'string' && reg.test(propertyValue)) {
                            expressionValue = this.transExpression(propertyValue)
                            isDynamicValue = true
                        }
                        if (typeof propertyValue === 'function') {
                            expressionValue = propertyValue(this.data[item.key], deepCopy(this.data))
                            isDynamicValue = true
                        }

                        if (isDynamicValue) {
                            switch (key) {
                                case 'required':
                                    this.setFormItemRequired(item.key, expressionValue)
                                    delete this.formItemList[index].children[innerIndex].expressProp[key]
                                    break
                                case 'value':
                                    expressionValue !== this.data[item.key] &&
                                        this.$set(this.data, item.key, expressionValue)
                                    delete this.formItemList[index].children[innerIndex].expressProp[key]

                                    break
                                case 'hidden':
                                    this.formItemList[index].children[innerIndex].hidden = expressionValue
                                    delete this.formItemList[index].children[innerIndex].expressProp[key]
                                    break
                                default:
                                     this.$set(this.formItemList[index].children[innerIndex],key , expressionValue)
                            }
                        }
                    }
                })
            })
        },
        transExpression(expression) {
            const instance = this.data
            return parseExpression(expression, instance)
        },
        // 监听值更新
        valueUpdateEvent(params) {
            this.$emit('formDataUpdated', this, params)
            const [key] = Object.keys(params)
            this.formItemForEach(formItem => {
                if (formItem.key === key && formItem.changeHandle) {
                    formItem.changeHandle(params[key], this)
                }
            })
        },

        getData() {
            return this.filterData(this.data)
        },
        // 更新数据
        updateFormData(data) {
            Object.keys(data).forEach(key => {
                this.$set(this.data, key, data[key])
            })
        },

        validate(fn) {
            // 先校验父级表单的值
            this.$refs.form.validate(valid => {
                debugger
                // 克隆一份数据
                const data = JSONDeepCopy(this.getData())

                // 判断是否需要校验子表单
                const childFormKeyList = []
                this.formItemForEach((formItem)=>{
                    if (formItem.type === 'FormChildrenForm') {
                        childFormKeyList.push(formItem.key)
                    }
                })

                const validateList = childFormKeyList.map(key => {
                    return this.$refs[key][0].$refs.formitem.validateForm()
                })
                if (valid&&(validateList.length===0||validateList.every(item => item))) {
                    // 父 子表单校验通过
                    fn(true, data)
                } else {
                    // 父或子表单校验通过
                    fn(false, data)
                }
            })
        },
        filterData(data) {
            const filteredData = {}
            this.formItemForEach(formItem => {
                if (!['slot', 'FormText'].includes(formItem.type)) {
                    filteredData[formItem.key] = data[formItem.key] ?? ''
                    if (Array.isArray(data[formItem.key])) {
                        filteredData[formItem.key] = data[formItem.key].filter(
                            item => item !== null && item !== undefined
                        )
                    }
                }
            })
            return filteredData
        },
        formItemForEach(func) {
            for (const formSection of this.formItemList) {
                if (formSection.children && formSection.children.length > 0) {
                    for (const formItem of formSection.children) {
                        const isOver = func(formItem)
                        if (isOver) return
                    }
                }
            }
        },

        // 设置某个要素必填
        // key：操作的 key
        // Required true，表示隐藏。而 false，表示取消隐藏
        setFormItemRequired(key, beRequired = true) {
            this.formItemForEach(formItem => {
                if (formItem.key === key) {
                    let rules = formItem.rules

                    if (rules.length) {
                        const requiredIndex = rules.findIndex(
                            item => item.required !== undefined
                        )
                        if (requiredIndex >= 0) {
                            rules[requiredIndex].required = beRequired
                        } else {
                            rules = rules.push({
                                required: beRequired,
                                message: '请输入',
                                trigger: ['change']
                            })
                        }
                    } else {
                        rules = [
                            {
                                required: beRequired,
                                message: '请输入',
                                trigger: ['change']
                            }
                        ]
                    }

                    this.$set(formItem, 'rules', rules)
                    return true
                }
            })
        },
        setSectionElementDisable(subFieldsList, beDisable = false) {
            subFieldsList.forEach((field, index) => {
                this.setFormItemDisabled(field.key, beDisable)
            })
        },
        // 设置某个要素禁用
        // key：操作的 key
        // beDisable：必填，默认是 true，表示禁用。而 false，表示取消禁用
        setFormItemDisabled(key, beDisable = true) {
            this.formItemForEach(formItem => {
                if (formItem.key === key) {
                    this.$set(formItem, 'disabled',   beDisable)
                    return true
                }
            })
        },

        // 设置某个要素隐藏
        // key：操作的 key
        // beHidden：必填，默认是 true，表示隐藏。而 false，表示取消隐藏
        setFormItemHidden(key, beHidden = true) {
            this.formItemForEach(formItem => {
                if (formItem.key === key) {
                    this.$set(formItem, 'hidden', beHidden)
                    return true
                }
            })
        },

        // 重置表单数据
        resetFields() {
            this.$refs.form.resetFields()
            this.formItemForEach(formItem => {
                // 如果某一项是
                if (['FormChildForm', 'FormCurd'].includes(formItem.type)) {
                    const a = this.$refs[formItem.key]
                    if (a instanceof Array) {
                        a[0].resetFields()
                    } else if (a) {
                        a.resetFields()
                    }
                }else if(formItem.defaultValue){
                    this.data[formItem.key]=formItem.defaultValue
                }else{
                    delete this.data[formItem.key]
                }
            })
        },
        // 收起/展开区块
        foldBlock(block) {
            const label = block.label
            const index = this.foldBlockList.indexOf(label)
            if (index === -1) {
                this.foldBlockList.push(block.label)
            } else {
                this.foldBlockList.splice(index, 1)
            }
        },
        isBlocked(formSection) {
            return this.foldBlockList.indexOf(formSection.label) > -1
        },
        // 获取区块的样式
        getBlockClass(blockItem) {
            //  'border-form': borderForm,
            const c = blockItem.class
            return Object.assign({}, c, {
                'block-border': this.borderForm && blockItem.label,
                'block-hide': this.foldBlockList.indexOf(blockItem.label) > -1
            })
        },

        // 获取 label
        getFormItemLabel(formItem) {
            if (
                ['left', 'right'].includes(this.formProperties['label-position']) &&
                formItem.label
            ) {
                return formItem.label + ':'
            }
            return formItem.label
        },
        scrollTo(section) {
            this.$refs['form-section' + section.label][0].scrollIntoView({
                behavior: 'smooth'
            })
        }
    }
}
</script>
 
