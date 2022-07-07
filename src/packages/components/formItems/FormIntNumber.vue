<template>
    <!-- 普通输入框 -->
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
         class="form-input-box form-item-box">
        <el-input v-model.trim="val"
                  :placeholder="getPlaceholder(item)"
                  :disabled="getDisabled"
                  @blur="e => onBlur(item, e)"
                  @focus="e => onFocus(item, e)"
                  type="number"
                  :clearable="true"
                  v-bind="bindOptions"
                  v-if="!getTextModel">
            <template slot="prepend" v-if="prepend">{{ prepend }}</template>
            <template slot="append" v-if="append">{{ append }}</template>
        </el-input>
        <div v-else :style="item.textStyle||{}" class="form-input-text">
            <span class="prepend-msg" v-if="prepend">{{ prepend }}</span>
            <span class="text">{{ val || '-' }}</span>
            <span class="append-msg" v-if="append">{{ append }}</span>
        </div>
    </div>
</template>

<script>
// 普通数字输入框
import FormMixin from './mixin'

export default {
  name: 'FormIntNumber',
  mixins: [FormMixin],
  computed: {
    // 前置符号
    prepend () {
      // 兼容性处理
      if (this.item.prepend) {
        return this.item.prepend
      } else {
        return ''
      }
    },
    // 后置符号
    append () {
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

    .form-input-box /deep/ .el-input {
        position: relative;
        width: 100%;
        // height: 36px;

        // .el-input__inner {
        //     height: 36px;
        //     line-height: 1px !important;
        // }
    }

</style>
