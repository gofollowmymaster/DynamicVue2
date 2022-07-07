<template>
    <!-- 普通输入框 -->
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
         class="form-input-box form-item-box">
        <el-checkbox-group v-model.trim="val"
                        :disabled="getDisabled"
                        @blur="e => onBlur(item, e)"
                        @focus="e => onFocus(item, e)"
                         v-bind="item.groupProperties"
                        v-if="!getTextModel">
            <component :is="bindOptions.button?'el-checkbox-button':'el-checkbox'" v-for="opt in item.options" :key="opt.value"
            :label="opt.value"   v-bind="bindOptions">{{ opt.label }}</component>
        </el-checkbox-group>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModelValue || '-' }}</div>
    </div>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormCheckbox',
  mixins: [FormMixin],
  data () {
    return {
    }
  },
  computed: {

    textModelValue () {
      const content = this.item.options && this.item.options.find((item) => {
        return item.value === this.val
      })
      return (content && content.label) || ''
    }
  }

}
</script>

<style scoped lang="less">

</style>
