<template>
  <span>
    <el-input
      v-model="inputVal"
      :placeholder="`请选择${$attrs.title}`"
      v-bind="$attrs"
      readonly
    >
      <el-button
        size="small"
        slot="append"
        icon="el-icon-search"
        @click.native="openDialog"
      ></el-button>
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
    value: { type: [Array, String], default: () => [] }
  },
  components: {},
  computed: {
    inputVal: {
      get () {
        return this.value.map((unit) => unit.name).join(',')
      },
      set (value) {
        if (value instanceof Array) {
          this.$emit('change', value)
        } else {
          this.$emit('change', [])
        }
        this.$emit('after-opreate')
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>
<style lang="less" scoped></style>
