<template>
  <!-- 普通输入框 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${
      getTextModel ? 'hz-text-box' : 'hz-untext-box'
    }`"
    class="form-input-box form-item-box"
  >
    <el-slider
      v-model="val"
      v-bind="bindOptions"
      :disabled="getTextModel?true:getDisabled"
    ></el-slider>

  </div>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormSlider',
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
