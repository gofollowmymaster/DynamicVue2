<template>
    <!-- 普通输入框 -->
    <section :style="item.style||{}" style="position:absolute;"
         class="  absolute-vertical-center  ">
        <el-radio-group v-model.trim="val"
                        :disabled="getDisabled"
                        @blur="e => onBlur(item, e)"
                        @focus="e => onFocus(item, e)"
                        v-bind="item.groupProperties"
                        v-if="!getTextModel">
            <component :is="bindOptions.button&&!bindOptions.border?'el-radio-button':'el-radio'"  v-for="opt in item.options" :key="opt.value"
            :label="opt.value"  v-bind="bindOptions">{{ opt.label }}</component>
        </el-radio-group>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModelValue || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormRadio',
  mixins: [FormMixin],
  data () {
    return {
      prependMsg: '',
      appendMsg: ''
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
