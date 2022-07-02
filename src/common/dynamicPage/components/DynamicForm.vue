<template>
    <main class="dynamic-form-wraper " 
    >
          <DynamicFormContent 
            ref="DynamicFormContent"   
            :data="formData" 
            :formItemList="formItemList"
            @formDataUpdated="formDataUpdated"
            v-bind="formOption">
             <template v-for="slot in formSlots"    v-slot:[slot.key]   >
                <slot :name="slot.key" :value="formData[slot.key]" ></slot>
             </template>
          </DynamicFormContent>
        <DynamicActions
         v-if="!formOption.textModel"
        class="mt32"
        :style="{'margin-left':this.formOption.formProperties['label-width']||'100px'}"
        :actions="actions"
        mode="form"
        :actionData="{}"></DynamicActions>
    </main>
</template>
<script>
import actionMixin from './actionMixin'
import {JSONDeepCopy}  from '../utils/tool'
export default {
  name:'DynamicForm',
  mixins:[actionMixin],
  data(){
    return {
      formData:{}
    }
  },
  props: {
    formOption:{
      type: Object,
      default: function () {
        return {};
      },
    },
    formItemList:{
      type:Array,
      default:function(){
        return []
      }
    },
    actions:{
      type: Object,
      default: function () {
        return {};
      },
    },
    apiPromise: {
      type: Function,
      default: ()=>Promise.resolve(),
    },
    data:{
      type:Object,
        default: function () {
        return {};
      },
    }
  },
  computed: {
    formSlots(){
      return this.formItemFilter((item)=>{
          return item.type=='slot'
      }).reduce((prev,next)=>{
        return prev.concat(next.children)
      },[])
    }
  },
  watch:{
    apiPromise:{
      handler(apiPromise){
        debugger
            if (apiPromise instanceof Function) {
        
      apiPromise(this.data)
        .then((data) => {
          if(data instanceof Object )
           this.formData=data
        });
      }
      },
      deep:true,
      immediate:true
    },
    data:{
      handler(data){
        if(data instanceof Object )
        this.formData=data
      },
      immediate:true,
    }
    

  },
  mounted(){
  },
  components: {

   },
  methods: {
     formItemFilter (func) {
      let formItemList=JSONDeepCopy(this.formItemList)
       formItemList.forEach((formSection,section)=>{
        if (formSection.children && formSection.children.length > 0) {
           formSection.children.forEach((formItem,index)=>{
             if(!func(formItem))delete  formItemList[section].children[index]
           })
           formItemList[section].children= formItemList[section].children.filter(item=>item)

        }
      })
      formItemList=formItemList.filter(formSection=>formSection.children.length)
      return formItemList
    },
    reset() {
      this.$refs["DynamicFormContent"].resetFields();
    },
    actionHandle(action){
       this.actionHandles(action)
    },
    formDataUpdated(vm,data){
        
    }
  },
};
</script>
<style lang="css" scoped>
</style>
