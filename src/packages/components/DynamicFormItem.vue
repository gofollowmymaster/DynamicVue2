<template>
    <component
        :is="formItem.wrapertype||'div'"
        v-if="!formItem.hidden && formItem.type === 'slot'"
        :key="formItem.key"
        :label="label"
        v-bind="formItem.wraperProperties"
        :class="setFormItemClass(formItem.wraperProperties.class)"
    >
        <slot :name="formItem.key" />
    </component>
    <FormHide
        v-else-if="!formItem.hidden && formItem.type === 'FormHide'"
        :key="formItem.key"
        v-model="label"
    />
    <el-form-item
        v-else-if="!formItem.hidden"
        v-bind="formItem.wraperProperties"
        :key="formItem.key"
        :rules="!getTextModel ? formItem.rules : []"
        :class="setFormItemClass(formItem.wraperProperties.class)"
        :prop="formItem.key"
         :label="label"
    >
        <template v-if="formItem.labelInfo" #label>
            <LabelWithTip :label="label" :tip="formItem.labelInfo" :icon="formItem.infoIcon" />
        </template>
        <component
            :is="formItem.type || 'FormInput'"
            ref="formitem"
            :key="formItem.key"
            v-model="val"
            class="form-item-box"
            :style="formItem.formItemStyle||{}"
            :class="`form-unqiue-${formItem.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
            :item="formItem"
        />
        <div
            v-if="!getTextModel && formItem.formTip"
            class=" text-size12 form-tip lh22"
        >
            {{ formItem.formTip }}
        </div>
    </el-form-item>
</template>
<script>
export default {
    name: 'DynamicFormItem',
    components: {
    },
    inject: [
        'colNum',
        'changeData'
    ],
    props: {
        formItem: {
            type: Object,
            default: function() {
                return {}
            }
        },
        value: {
            type: [Object, Array, String, Boolean, Number],
            default: function() {
                return null
            }
        },
        label: String,
    },
    data() {
        return {

        }
    },
    computed: {
        val: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        },
                // 是否采用文字模式
        getTextModel() {
            if (this.changeData.textModel) {
                return true
            }
            return false
        },
  

    },
    watch: {

    },
    mounted() {
    },
    methods: {

        resetFields() {
            this.$refs.formitem.resetFields()
        },
        setFormItemClass(classList) {
            classList = Array.isArray(classList) ? classList : []
            classList = classList.filter(item => {
                return !/^grid\-col\-\d$/.test(item)
            })
            const colNum = this.colNum >= 1 ? this.colNum : 1
            let layoutClass = 'grid-col-' + Math.ceil(24 / colNum)
            const col = this.formItem.col>=colNum?colNum:this.formItem.col
            if (col) {
                layoutClass = 'grid-col-' + 24*(col/colNum)
            }

            classList.push(layoutClass)



            return classList
        }
    }
}
</script>
<style lang="css" scoped>
</style>
