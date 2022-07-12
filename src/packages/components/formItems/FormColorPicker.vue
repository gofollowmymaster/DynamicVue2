<template>
  <!-- 普通输入框 -->
  <section  >
    <el-color-picker 
      class="block"
      v-model="val"
      v-bind="bindOptions"
      :disabled="getTextModel?true:getDisabled"
    ></el-color-picker>
 
  </section>
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
 
/deep/ .el-color-picker__trigger{
  width: 100%;
}
</style>
