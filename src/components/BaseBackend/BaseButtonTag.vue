<template>
  <el-form :label-width="labelWidth">
    <el-form-item :label="title">
      <el-button
        :class="[focus === item.value ? 'focus' : '']"
        style="margin-bottom: 10px"
        v-for="(item, index) in category"
        :key="index"
        @click="chooseCategory(item)"
      >
        {{ item.label }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    category: {
      type: Array,
      default: () => {}
    },
    value: {
      default: ''
    },
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  comments: {},
  computed: {
    focus () {
      return this.value
    }
  },
  data () {
    return {}
  },
  methods: {
    chooseCategory (item) {
      const focus = item.value
      this.$emit('change', focus, item)
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
/deep/.el-form-item {
  margin: 0;
}
.focus {
  color: #fff;
  border-color: pink;
  background: pink;
}
</style>
