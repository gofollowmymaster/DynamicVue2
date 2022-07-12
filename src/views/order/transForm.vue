<template>
  <main>
    <el-steps simple
      :active="active"
      process-status="process"
      class="mx24 my12"
      align-center>
      <el-step >
         <template slot="title">
            <span  @click="switchStep(0)">1. 计划</span>
         </template>
      </el-step>
      <el-step  >
          <template slot="title">
            <span  @click="switchStep(1)">2. 在建</span>
         </template>
      </el-step>
      <el-step title="移交">
        <template slot="title">
          <span  @click="switchStep(2)">3. 移交</span>
        </template>
      </el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <DynamicForm
      v-show="active===0"
      class="relative"
      :formOption="formOption"
      :formItemList="planFormItemList"
      :actions="planActions"
      :data="planDetail"
    ></DynamicForm>
      <DynamicForm
      v-show="active===1"
      class="relative"
      :formOption="formOption"
      :formItemList="buildingFormItemList"
      :actions="buildingActions"
      :data="buildingDetail"
    >
      <template  v-slot:progressTable>
         <buildingProgress v-if="projectLibraryId" :data="{id:projectLibraryId}"  mode="textMode"></buildingProgress>
      </template>
    
    </DynamicForm>
       <DynamicForm
      v-show="active===2"
      class="relative"
      :formOption="formOption"
      :formItemList="transFormItemList"
      :actions="transActions"
      :data="transDetail"
    ></DynamicForm>
  </main>
    
</template>
<script>
import {
  planProjectUpdateApi,
  planProjectSaveApi,
  planProjectDetailApi,
  buildingProjectSaveApi,
  buildingProjectDetailApi,
  buildingProjectUpdateApi,
  transProjectSaveApi,
  transProjectDetailApi,
  transProjectUpdateApi,
} from '@/network/orderManage.js'
import planFields from './planFields.js'
import buildingFields from './buildingFields.js'
import transFields from './transFields.js'

import buildingProgress  from './buildingProgress'


export default {
  name: 'transForm',
  props:{
    data:{
      type:[Object,Number,String,Array]
    },
    textModel:[Boolean]
  },
  components:{buildingProgress},
  data () {
    return {
      active: 0,
      // form字段
      formOption: this.$appendToPreset('formOption', {textModel:this.textModel,
          formProperties: {
          'label-width':'150px',
          // 'label-position': this.textModel?'right':'top'
        },}),
      planFormItemList: this.$buildFormFields(planFields),
      planActions: {
        save: {
          actionType:'submitActionOption',
          apiPromise: planProjectSaveApi,
          label:'下一步',
          componentProperties:{
            size:'medium'
          },
          callback:{
            next:(vm,res)=>{
              debugger
              this.active= 1
              if(!this.projectLibraryId){   
                  if(!res.data){
                    console.error('接口没有返回projectLibraryId?查看network验证')
                    return 
                  }
                  this.projectLibraryId=res.data
              }
              
            },
            closeModal:false,
            refresh:false,
            showTip:false,
            reset:false
          }
        }
      },
      planDetail:{},
      buildingFormItemList: this.textModel?this.$buildDetailFields(buildingFields):this.$buildFormFields(buildingFields),

      buildingActions: {
        
        save:  {
          actionType:'submitActionOption',
          label:'下一步',
          componentProperties:{
            size:'medium'
          },
          isShow(data){
            debugger
            return !data.id
          },
          apiPromise: (data)=>{
            debugger
            console.log('----this.projectLibraryId---',this.projectLibraryId)
            if(!this.projectLibraryId){
                  console.error('没有projectLibraryId ')
                  return 
                }
                data.projectLibraryId=this.projectLibraryId   
            return buildingProjectSaveApi(data)
            },
          callback:{
            closeModal:false,
            refresh:false,
            showTip:false,
            reset:false,
             next:(vm,res)=>{
              
              this.active= 2
             }
          }
        },
        update:  {
          actionType:'submitActionOption',
          label:'下一步',
          componentProperties:{
            size:'medium'
          },
          isShow(data){
            debugger
            return !!data.id
          },
          apiPromise: (data)=>{
            debugger
             if(!this.projectLibraryId){
                  console.error('没有projectLibraryId ')
                  return 
                }
                // data.id=this.projectLibraryId
            return buildingProjectUpdateApi(data)
            },
             callback:{
            closeModal:false,
            refresh:false,
            showTip:false,
            reset:false,
             next:(vm,res)=>{
              
              this.active= 2
             }
          }
        },
        prev:{
          actionType:'prev',
          label:'上一步',
          component:'el-button',
          componentProperties:{
            size:'medium'
          },
          actionType:'',
          isLoadData:false,
          actionHandle:(data)=>{
            this.active= 0
            this.planActions.save.apiPromise=(data)=>{

                return planProjectUpdateApi(data)
            }
          }
        },
      },
      buildingDetail:{},
      projectLibraryId:'',
      transFormItemList: this.$buildFormFields(transFields),
      transActions: {
        
        save:  {
          actionType:'submitActionOption',
          apiPromise: transProjectSaveApi,
          label:'保存',
          componentProperties:{
            size:'medium'
          },
          callback:{
            next:(vm,res)=>{
              debugger
              if(!this.projectLibraryId){
                  if(!res.data){
                    console.error('接口没有返回projectLibraryId?查看network验证')
                    return 
                  }
                  this.projectLibraryId=res.data
              }
              
            },
            closeModal:false,
            refresh:false,
            showTip:true,
            reset:false
          }
        },
        prev:{
          actionType:'prev',
          label:'上一步',
          component:'el-button',
          properties:{
            size:'medium'
          },
          actionType:'',
          isLoadData:false,
          actionHandle:(data)=>{
            this.active= 1
            this.buildingActions.save.apiPromise=(data)=>{

                return buildingProjectUpdateApi(data)
            }
          }
        },
      },
      transDetail:{},
    }
  },
  watch:{
    data:{
      handler(data){
        debugger
         if(data.id){
           this.loadDetail(data)

         }
      },
      immediate:true,
    }
  },
  methods:{
      loadDetail(data){
        this.active=2
        transProjectDetailApi(data.id).then(data=>{
          this.transDetail=data
          this.transActions.save.apiPromise=transProjectUpdateApi 
        }).then(()=>{
          this.projectLibraryId=this.transDetail.projectLibraryId
          planProjectDetailApi(this.projectLibraryId).then(data=>{
            this.planDetail=data
            this.planActions.save.apiPromise=planProjectUpdateApi
          })
             buildingProjectDetailApi(this.projectLibraryId).then(data=>{
            this.buildingDetail=data
            this.buildingActions.save.apiPromise=buildingProjectUpdateApi
          })
        })
      },
      switchStep(step){
        
        if(!this.textModel)return 
        this.active=step
      }
  }
}
</script>
<style lang="less" scoped></style>
