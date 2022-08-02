<template>
    <!-- 普通输入框 -->
    <section>
        <el-checkbox-group v-if="!gettextMode"
                           v-model.trim="val"
                           :disabled="getDisabled"
                           v-bind="item.groupProperties"
                           @blur="e => onBlur(item, e)"
                           @focus="e => onFocus(item, e)"
        >
            <component :is="bindOptions.button?'el-checkbox-button':'el-checkbox'" v-for="opt in item.options" :key="opt.value"
                       :label="opt.value" v-bind="bindOptions"
            >
                {{ opt.label }}
            </component>
        </el-checkbox-group>
        <div class="form-input-text">{{ textModeValue || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormCheckbox',
    mixins: [FormMixin],
    data() {
        return {
        }
    },
    computed: {

        textModeValue() {
            const content = this.item.options && this.item.options.find(item => {
                return item.value === this.val
            })
            return (content && content.label) || ''
        }
    }

}
</script>

<style scoped lang="css">

</style>
