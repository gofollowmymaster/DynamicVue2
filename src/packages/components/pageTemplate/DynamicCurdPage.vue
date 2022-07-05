<template>
  <div class=" hz-low-code flex flex-direction full-width"  >
    <dyBrandBar >
      <span slot="title" >{{ entityLabel }}</span>
    </dyBrandBar>
    <DynamicPageWrapper class="flex1   "   :actions="actionList" :fields="fields"  :entityLabel="entityLabel" 
       :apiPromises="apiPromises"  :formSections="formSections"  >
    
      <DynamicCurd   :optionsProps="pageOptionsprops" :fields="fields"  :entityLabel="entityLabel" 
       :apiPromises="apiPromises" :mode="mode" :formSections="formSections" scene="page" ></DynamicCurd>
    </DynamicPageWrapper>
  </div>
</template>
<script>
 

export default {
  name: 'DynamicCurdPage',
  props: {
    pageOptionsprops: { type: Object ,
    default:function(){
      return {}
    }},
    fields: {
      type: Array,
      required: true
    },
    formSections: {
      type: Object,
      default: function () {
        return {}
      }
    },
    apiPromises: {
      type: Object,
      default(){
        return {}
      }
    },
    entityLabel:String,
    mode:{type:String},
    
  },
  computed: {
    actionList(){
      debugger
        const {topToolBar:customTopActions={},listOption={}} =this.pageOptionsprops
        const {lineActions:customLineActions={}} = listOption
      console.log('----actionList---',{...customTopActions,...customLineActions})

        return {...customTopActions,...customLineActions}
    }
  },
  data: function () {
    return {
       
    }
  },
 
}
</script>

<style lang="less" scoped>
 
</style>
