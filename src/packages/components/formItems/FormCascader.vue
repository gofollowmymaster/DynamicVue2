<template>
    <!-- 普通输入框 -->
    <section >
        <el-cascader v-if="!getTextModel" v-model.trim="val"   :disabled="getDisabled" :options="item.options" v-bind="bindOptions"></el-cascader>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModelValue || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormCascader',
  mixins: [FormMixin],
  data () {
    return {
    }
  },
  computed: {
    textModelValue () {
      return this.val.join(',')
    }
  }
}
</script>

<style scoped lang="less">
  .el-cascader{
      width: 100%;
  }
</style>
