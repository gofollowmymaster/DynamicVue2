<template>
  <!-- 普通输入框 -->
  <section  >
    <el-slider
      v-model="val"
      v-bind="bindOptions"
      :disabled="getTextModel?true:getDisabled"
    ></el-slider>

  </section>
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
