<template>
    <section>
        <el-select v-if="!isTextMode"
                   v-model="val"
                   style="width: 100%;"
                   multiple
                   collapse-tags
                   :disabled="isDisabled"
                   :placeholder="placeholder"
                   v-bind="bindOptions"
        >
            <el-option v-for="option in item.options"
                       :key="option.value"
                       :label="option.label"
                       :value="option.value"
            />
        </el-select>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModeValue || '-' }}</div>
    </section>
</template>

<script>

import FormMixin from './mixin'

export default {
    name: 'FormMulSelect',
    mixins: [FormMixin],
    computed: {
        textModeValue() {
            if (this.item.options) {
                let val = ''
                this.item.options.forEach(item => {
                    if (item.value === this.value) {
                        val = item.label
                    }
                })
                return val
            } else {
                return ''
            }
        },
        val: {
            get() {
                return this.value || []
            },
            set(v) {
                this.$emit('input', v)
                this.formMethods.valueUpdateEvent({
                    [this.item.key]: v
                })
            }
        }
    }
}
</script>

<style scoped lang="less">

.el-select-dropdown__item.selected {
    color: #606266;
    font-weight: normal;
}

</style>
