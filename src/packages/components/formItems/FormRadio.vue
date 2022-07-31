<template>
    <!-- 普通输入框 -->
    <section  style="position: absolute;"
             class="  absolute-vertical-center  "
    >
        <el-radio-group v-if="!getTextModel"
                        v-model.trim="val"
                        :disabled="getDisabled"
                        v-bind="item.groupProperties"
                        @blur="e => onBlur(item, e)"
                        @focus="e => onFocus(item, e)"
        >
            <component :is="bindOptions.button&&!bindOptions.itemProperties.border?'el-radio-button':'el-radio'" v-for="opt in item.options" :key="opt.value"
                       :label="opt.value" v-bind="{...item.itemProperties,...opt}"
            >
                {{ opt.label }}
            </component>
        </el-radio-group>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModelValue || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormRadio',
    mixins: [FormMixin],
    data() {
        return {
            prependMsg: '',
            appendMsg: ''
        }
    },
    computed: {
        textModelValue() {
            const content = this.item.options && this.item.options.find(item => {
                return item.value === this.val
            })
            return (content && content.label) || ''
        },
        bindOptions() {
            const options= this.getDefaultBindOptions(this.item)
            options.itemProperties=options.itemProperties?options.itemProperties:{}
            return options
         
        },

    }

}
</script>

<style scoped lang="less">

</style>
