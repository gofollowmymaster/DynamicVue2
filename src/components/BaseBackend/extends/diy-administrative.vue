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
    <administrativeDialog
      :title="`选择${$attrs.title}`"
      :type="dialogType"
      :visible="visible"
      :defaultCheckedList="defaultCheckedList"
      @ok="chooseAdministractive"
      @close="closeDialog"
    ></administrativeDialog
  ></span>
</template>
<script>
import administrativeDialog from '@/components/sysSettingDialog/administrative.dialog'
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: { type: [Array, String], default: () => [] }
  },
  components: { administrativeDialog },
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
    },
    defaultCheckedList () {
      return this.value
    },
    dialogType () {
      if (this.$attrs.radio === false) {
        return 'checkbox'
      }
      return 'radio'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    chooseAdministractive (list) {
      this.inputVal = list
      this.closeDialog()
    },
    closeDialog () {
      this.visible = false
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped></style>
