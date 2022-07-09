<template>
      <el-form-item
                v-if="!formItem.hidden"
                 :rules="!textModel ? formItem.rules : []"
                v-bind="formItem.wraperProperties"
                  :label="label"
                :prop="formItem.key">
                <component
                  v-model="val"
                  ref="formitem"
                  :is="formItem.type || 'FormInput'"
                  v-bind:item="formItem"
                  :key="formItem.key"/>
                   <div
                  v-if="!textModel && formItem.formTip"
                  class="text-size12 form-tip lh22"
                >
                   {{ formItem.formTip }}
                </div>
                  
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
        return null;
      },
    },
    label:String,
    textModel:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    val:{
      get(){
        return this.value
      },
      set(v){
        this.$emit('input',v)
      }
    }
  },
  watch:{
    
    
    

  },
  mounted(){
  },
  components: {

   },
  methods: {
    resetFields(){
       this.$refs.formitem.resetFields()
    }
  },
};
</script>
<style lang="css" scoped>
</style>
