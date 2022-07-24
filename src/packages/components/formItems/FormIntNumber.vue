<template>
    <!-- 普通输入框 -->
    <section>
        <el-input v-if="!getTextModel"
                  v-model.trim="val"
                  :placeholder="getPlaceholder(item)"
                  :disabled="getDisabled"
                  type="number"
                  :clearable="true"
                  v-bind="bindOptions"
                  @blur="e => onBlur(item, e)"
                  @focus="e => onFocus(item, e)"
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
// 普通数字输入框
import FormMixin from './mixin'

export default {
    name: 'FormIntNumber',
    mixins: [FormMixin],
    computed: {
        // 前置符号
        prepend() {
            // 兼容性处理
            if (this.item.prepend) {
                return this.item.prepend
            } else {
                return ''
            }
        },
        // 后置符号
        append() {
            // 兼容性处理
            if (this.item.append) {
                return this.item.append
            } else {
                return ''
            }
        }
    }
}
</script>

<style scoped lang="less">

</style>
