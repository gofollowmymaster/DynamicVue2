<template>
    <!-- 普通输入框 -->
    <section>
        <el-input v-if="!isTextMode"
                  v-model.trim="val"
                  :disabled="isDisabled"
                  :placeholder="placeholder"
                  type="text"
                  v-bind="bindOptions"
                  @blur="e => onBlur( e)"
                  @focus="e => onFocus( e)"
        >
            <template v-if="prepend" slot="prepend">{{ prepend }}</template>
            <template v-if="append" slot="append">{{ append }}</template>
        </el-input>
        <div v-else :style="item.textStyle||{}" class="form-input-text">
            <span v-if="prepend" class="prepend-msg">{{ prepend }}</span>
            <span class="text">{{ val || '-' }}</span>
            <span v-if="append" class="append-msg">{{ append }}</span>
        </div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormInput',
    mixins: [FormMixin],
    computed: {
        // 前置符号
        prepend() {
            // 兼容性处理
            if (this.item.prepend) {
                return this.item.prepend
            } else if (this.item.prependMsg) {
                return this.item.prependMsg
            } else if (this.item.prefixMsg) {
                return this.item.prefixMsg
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
            } else if (this.item.suffixMsg) {
                return this.item.suffixMsg
            } else {
                return ''
            }
        }
    }
}
</script>

<style scoped lang="less">

.form-input-text {
    position: relative;
    width: 100%;
    color: #12182a;
}
</style>
