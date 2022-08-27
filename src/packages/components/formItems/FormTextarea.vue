<template>
    <!-- 普通输入框 -->
    <section>
        <el-input v-if="!isTextMode"
                  v-model="val"
                  :placeholder="placeholder"
                  :disabled="isDisabled"
                  type="textarea"
                  :autosize="item.autosize || false"
                  :rows="item.autosize ? '' : 4"
                  :resize="item.resize || 'none'"
                  show-word-limit
                  v-bind="bindOptions"
                  @blur="e => onBlur(item, e)"
                  @focus="e => onFocus(item, e)"
        />
        <div v-else :style="item.textStyle || {}" class="form-input-text">
            {{ val || '-' }}
        </div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormTextarea',
    mixins: [FormMixin],
    data() {
        return {}
    },
    computed: {
        // 前置符号
        prepend() {
            // 兼容性处理
            if (this.item.prepend) {
                return this.item.prepend
            } else if (this.item.prependMsg) {
                return this.item.prependMsg
            } else {
                return ''
            }
        },
        // 后置符号
        append() {
            // 兼容性处理
            if (this.item.append) {
                return this.item.append
            } else if (this.item.appendMsg) {
                return this.item.appendMsg
            } else {
                return ''
            }
        }
    }
}
</script>

<style scoped lang="css">

.form-area-box   /deep/ .el-form-item__content {
    height: auto;
}

</style>
