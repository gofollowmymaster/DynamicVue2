<template>
    <!-- 普通输入框 -->
    <section>
        <el-checkbox-group v-if="!getTextModel"
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
        <div class="form-input-text">{{ textModelValue || '-' }}</div>
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

        textModelValue() {
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
