<template>
  <!-- 普通输入框 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${
      getTextModel ? 'hz-text-box' : 'hz-untext-box'
    }`"
    class="form-input-box form-item-box"
  >
    <el-color-picker
      v-model="val"
      v-bind="bindOptions"
      :disabled="getTextModel?true:getDisabled"
    ></el-color-picker>

  </div>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormColorPicker',
  mixins: [FormMixin],
  data () {
    return {}
  },
  computed: {

  }
}
</script>

<style scoped lang="less">

</style>
