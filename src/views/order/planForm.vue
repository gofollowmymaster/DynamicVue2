<template>
  <main>
    <el-steps simple
      :active="active"
      process-status="process"
      class="mx24 my12"
      align-center
    >
      <el-step title="计划" @click="active = 0"></el-step>
      <el-step title="在建"></el-step>
      <el-step title="移交"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <DynamicForm
      class="relative"
      :formOption="formOption"
      :formItemList="formItemList"
      :actions="actions"
      :data="planDetail"
    ></DynamicForm>
  </main>
    
</template>
<script>
import {
  planProjectUpdateApi,
  planProjectSaveApi,
  planProjectDetailApi
} from '@/network/orderManage.js'
import fields from './planFields.js'

export default {
  name: 'planForm',
  props:{
    data:{
      type:[Object,Number,String,Array]
    },
    textModel:[Boolean]
  },
  data () {
    debugger
    return {
      active: 0,
      // form字段
      formOption: this.$appendToPreset('formOption', {
        textModel:this.textModel,
        formProperties: {
          'label-width':'150px',
          // 'label-position': this.textModel?'right':'top'
        },
      }),
      formItemList: this.$buildFormFields(fields),
      actions: {
        save:  {
          apiPromise: planProjectSaveApi,
          actionType:'submitAction',
          componentProperties:{
            size:'medium'
          },
          label:'保存'
        }
      },
      planDetail:{}
    }
  },
  watch:{
    data:{
      handler(data){
         if(data.id){
           this.loadDetail(data)
         }
      },
      immediate:true,
    }
  },
  methods:{
      loadDetail(data){
        planProjectDetailApi(data.id).then(data=>{
           
            this.planDetail=data
            this.actions.save.apiPromise=planProjectUpdateApi
        })
      }
  }
}
</script>
<style lang="less" scoped></style>
