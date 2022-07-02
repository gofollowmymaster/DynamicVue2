<template>
  <span>
    <el-input
      v-model="inputVal"
      :placeholder="`请输入${$attrs.title || ''}`"
      v-bind="$attrs"
      @input="(val) => triggerInput($attrs, val)"
    >
      <template slot="prepend"><slot name="prepend"></slot></template>
      <template slot="append"><slot name="append"></slot></template>
    </el-input>
  </span>
</template>
<script>
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: { type: [Number, String], default: () => '' }
  },
  components: {},
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    triggerInput (item, val) {
      const bit = item.bit || 4 // 限制4位小数
      let result = String(val)
        .replace(/[^\d.]|^\./g, '') // 只能填数字或者小数点
        .replace(/\.{2}/g, '.') // 不能连续填2个小数点
        .replace(/^0+$/, '0') // 全部填写0时只显示一个0
        .replace(/^0(\d{1})/g, '$1') // 以0开头的整数，只展示整数部分
        // .replace(/^(-?[1-9]\d*|0)(\.\d{1,4})(\.|\d{1})?$/, '$1$2')
        .replace(
          new RegExp(
            '^(\\-?[1-9]\\d*|\\-?0)(\\.\\d{1,' + bit + '})(.|\\d{1})?$'
          ),
          '$1$2'
        )
      if (item.max) {
        if (Number(result) > item.max) {
          result = item.max
        }
      }
      if (item.min) {
        if (Number(result) < item.min) {
          result = item.min
        }
      }
      this.inputVal = result
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped></style>
