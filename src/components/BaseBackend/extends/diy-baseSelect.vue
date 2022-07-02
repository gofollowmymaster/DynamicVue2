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
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    openDialog () {
      if (this.$attrs.open && this.$attrs.open instanceof Function) {
        this.$attrs.open(this.value)
      }
    }
  },
  mounted () {},
  watch: {
    value (newVal) {
      // console.log('监听watch变了', newVal)
    }
  }
}
</script>
<style lang="less" scoped></style>
