<template>
  <section
    class="  full-width"
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
  </section>
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

<style scoped lang="css">
 
</style>
