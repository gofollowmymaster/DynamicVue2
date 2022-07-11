<template>
  <!-- 普通展示 -->
  <div
    :style="colOptions.style || {}"
    :class="`form-unqiue-${colOptions.key}`"
    class="table-col-box text-ellipsis" >
     <component
                  v-model="rowData[formItem.key]"
                  :is="formItem.type || 'FormInput'"
                  v-bind:item="formItem" />
    <!-- <DynamicFormItem v-model="rowData[formItem.key]" :formItem="formItem"></DynamicFormItem> -->
  </div>
</template>

<script>
import TableColMixin from './mixin'

export default {
  name: 'ColFormItem',
  mixins: [TableColMixin],
  computed: {},
  data () {
    return {
    }
  },
  computed:{
    formItem(){

      return {
         ...this.colOptions,...this.colOptions.formOption
      }
      
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped lang="less"></style>
