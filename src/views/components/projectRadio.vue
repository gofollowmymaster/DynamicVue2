<template>
  <!-- 普通展示 -->
  <section class="hz-low-code m6" style="width:180px">
     <div>新增项目状态:</div>
     <el-radio-group v-model="data.value" class="flex flex-direction align-left px12">
    <el-radio :label="0" class="mt12">计划</el-radio>
    <el-radio :label="1" class="mt12">在建</el-radio>
    <el-radio :label="2" class="mt12">移交</el-radio>
    <el-radio :label="3" class="mt12">完成</el-radio>

  </el-radio-group>

  </section>
</template>

<script>
import poplMixin from '@/packages/components/popContents/mixin'

export default {
  name: 'projectRadio',
  mixins: [poplMixin],
  computed: {},
  props: {
    data: {
      type: Object,
      default () {
        return {
          value: 0
        }
      }
    }

  },
  data () {
    return {

    }
  },
  watch: {
    data: {
      handler (data) {
        debugger
        this.$emit('change', data.value)
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="less"></style>
