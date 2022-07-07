<template>
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-img-box' : ''}`"
    class="form-input-box form-item-box full-width"
  >
   <div>
     <span class="px12 py6" @click="addForm">+</span>
   </div>

    <DynamicformContent
      v-for="(formData,index) in val"
      :key="index"
      :data="formData"
      v-bind="bindOptions"
      :allDisabled="getTextModel?true:getDisabled"
    ></DynamicformContent>
  </div>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormChildrenForm',
  mixins: [FormMixin],
  data () {
    return {
      formDataList: []
    }
  },

  watch: {

  },
  computed: {

    val: {
      get () {
        return this.value || []
      },

      set (tableList) {
        this.$emit('input', tableList)

        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: tableList
        })
      }
    }

  },
  mounted () {},
  methods: {
    resetFields () {

    },
    addForm () {
      this.formList.push({})
    }

  }
}
</script>

<style scoped lang="less">
.form-input-box /deep/ .el-input {
  position: relative;
  width: 100%;
  // height: 36px;
}
</style>
