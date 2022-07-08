<template>
      <el-form-item
                v-else-if="!formItem.hidden"
                :key="formItem.key"
                v-bind="formItem.wraperProperties"
                :rules="formItem.rules||[]"
                label-width="0px"
                :prop="formItem.key">
                <component
                  v-model="value"
                  :is="formItem.type || 'FormInput'"
                  v-bind:item="formItem"
                  :key="formItem.key"/>
                  
              </el-form-item>
</template>
<script>

export default {
  name:'DynamicFormItem',
  data(){
    return {
      
    }
  },
  props: {
    formItem:{
      type: Object,
      default: function () {
        return {};
      },
    },
   
    value:{
      type:[Object,Array,String,Boolean,Number],
        default: function () {
        return {};
      },
    }
  },
  computed: {
 
  },
  watch:{
    
    
    

  },
  mounted(){
  },
  components: {

   },
  methods: {
      
  },
};
</script>
<style lang="css" scoped>
</style>
