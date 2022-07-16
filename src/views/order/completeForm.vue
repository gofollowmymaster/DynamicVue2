<template>
  <main>
    <el-steps
      :active="active"
      process-status="process"
      class="mx24 my12"
      align-center simple
    >
      <el-step simple>
        <template slot="icon">
            <span  @click="switchStep(0)" class="circle">1</span>
         </template>
         <template slot="title">
            <span  @click="switchStep(0)">计划</span>
         </template>
      </el-step>
      <el-step  >
          <template slot="icon">
            <span  @click="switchStep(1)" class="circle">2</span>
         </template>
          <template slot="title">
            <span  @click="switchStep(1)">在建</span>
         </template>
      </el-step>
      <el-step title="移交">
         <template slot="icon">
            <span  @click="switchStep(2)" class="circle">3</span>
         </template>
          <template slot="title">
            <span  @click="switchStep(2)">移交</span>
         </template>
      </el-step>
      <el-step title="完成">
                 <template slot="icon">
            <span  @click="switchStep(3)" class="circle">4</span>
         </template>
          <template slot="title">
            <span  @click="switchStep(3)">完成</span>
         </template>
      </el-step>
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
      </DynamicForm>
       <DynamicForm
      v-show="active===3"
      class="relative"
      :formOption="formOption"
      :formItemList="completeFormItemList"
      :actions="completeActions"
      :data="completeDetail"
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
  completeProjectSaveApi,
  completeProjectUpdateApi,
  completeProjectDetailApi
} from '@/network/orderManage.js'
import planFields from './planFields.js'
import buildingFields from './buildingFields.js'
import transFields from './transFields.js'
import completeFields from './completeFields.js'



import buildingProgress  from './buildingProgress'


export default {
  name: 'completeForm',
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
      formOption: this.$appendToPreset('formOption', {
        textModel:this.textModel,
        formProperties: {
            'label-width':'150px',
          // 'label-position': this.textModel?'right':'top'
        },
      }),
      planFormItemList: this.$buildFormFields(planFields),
      planActions: {
        save: {
          actionType:'submitAction',
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
          isShow(data){
            debugger
            return !data.id
          },
                   componentProperties:{
            size:'medium'
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
        update:{
          actionType:'submitActionOption',
          label:'下一步',
          isShow(data){
            debugger
            return !!data.id
          },
                   componentProperties:{
            size:'medium'
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
            apiPromise:(data)=>{
            console.log('----this.projectLibraryId---',this.projectLibraryId)
            if(!this.projectLibraryId){
                  console.error('没有projectLibraryId ')
                  return 
                }
            return transProjectSaveApi(data)
            },
          label:'下一步',
          componentProperties:{
            size:'medium'
          },
           isShow(data){
            debugger
            return !data.id
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
            showTip:false,
            reset:false,
            next:(vm,res)=>{
               this.projectLibraryId=res.data
            this.active= 3
            }
          }
        },
        update:  {
          actionType:'submitActionOption',
          label:'下一步',
           isShow(data){
            debugger
            return !!data.id
          },
          componentProperties:{
            size:'medium'
          },
          apiPromise:(data)=>{
            debugger
            console.log('----this.projectLibraryId---',this.projectLibraryId)
            if(!this.projectLibraryId){
                  console.error('没有projectLibraryId ')
                  return 
                }
            return transProjectSaveApi(data)
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
            showTip:false,
            reset:false,
            next:(vm,res)=>{
            this.active= 3
            }
          }
        },
        prev:{
          actionType:'prev',
          label:'上一步',
          componentProperties:{
            size:'medium'
          },
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
      completeFormItemList: this.$buildFormFields(completeFields),
      completeActions: {
        
        save:  {
          actionType:'submitActionOption',
          apiPromise: completeProjectSaveApi,
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
            showTip:false,
            reset:false
          }
        },
        prev:{
          actionType:'prev',
          label:'上一步',
          componentProperties:{
            size:'medium'
          },
          isLoadData:false,
          actionHandle:(data)=>{
            this.active= 2
            this.transActions.save.apiPromise=(data)=>{
                return transProjectUpdateApi(data)
            }
          }
        },
      },
      completeDetail:{},
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
      loadDetail(info){
        debugger
        this.active=3
        completeProjectDetailApi(info).then((data)=>{
          debugger
          this.completeDetail=data
          this.completeActions.save.apiPromise=completeProjectUpdateApi 
          this.projectLibraryId=this.completeDetail.projectLibraryId||info.projectLibraryId
          transProjectDetailApi(this.projectLibraryId).then(data=>{
          this.transDetail=data
          this.transActions.save.apiPromise=transProjectUpdateApi 
        })
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
        debugger
        if(!this.textModel)return 
        this.active=step
      }
  }
}
</script>
<style lang="less" scoped></style>
