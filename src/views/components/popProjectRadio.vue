<template>
  <!-- 普通展示 -->
  <section class="hz-low-code m6" style="width:180px">
     <div>新增项目状态:</div>
     <el-radio-group v-model="data.projectStatus" class="flex flex-direction align-left px12">
    <el-radio :label="0" class="mt12">计划</el-radio>
    <el-radio :label="1" class="mt12">在建</el-radio>
    <el-radio :label="2" class="mt12">移交</el-radio>
    <el-radio :label="3" class="mt12">完成</el-radio>

  </el-radio-group>
    <div style="text-align: right;" class="mt18">
      <el-button :type="cancelButtonType" size="mini"   @click="$emit('cancel',{})">{{cancelButtonText}}</el-button>
      <el-button :type="confirmButtonType" size="mini"  @click="$emit('confirm',data)">{{confirmButtonText}}</el-button>
    </div>
  </section>
</template>

<script>
import poplMixin from '@/packages/components/popContents/mixin'

export default {
  name: 'popProjectRadio',
  mixins: [poplMixin],
  computed: {},
  props: {

  },
  data () {
    return {
      data: {
        projectStatus: 1
      }

    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="less"></style>
