<template  >
   <div class=" inline-block" :class="[size+'-label']" >
       <el-tooltip :content="tip" placement="top">
       <i :class="icon||'el-icon-info'"></i>
      </el-tooltip>
      <span class="ml4">{{label}}</span>

   </div>
</template>
<script>
export default {
  name: 'LabelWithTip',
  props: {

    label: {
      type: String,
      require: true
    },
    tip: {
      type: String,
      require: true
    },
    icon: {
      type: String,
      default: 'el-icon-info'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data: function () {
    return {}
  },

  watch: {

  },
  mounted () {
  },
  components: {},
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .small-tip{

  }
    .mini-tip{

  }
    .normal-tip{

  }
</style>
