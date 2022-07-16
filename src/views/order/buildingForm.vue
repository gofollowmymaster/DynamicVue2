<template>
  <main>
    <el-steps
      :active="active"
      process-status="process"
      class="mx24 my12"
      align-center simple
    >
      <el-step >
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
      <el-step title="移交"></el-step>
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
         <buildingProgress v-if="projectLibraryId" class="full-width" :data="{id:projectLibraryId}" mode="textMode"></buildingProgress>
      </template>
    
    </DynamicForm>
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
} from '@/network/orderManage.js'
import planFields from './planFields.js'
import buildingFields from './buildingFields.js'
import buildingProgress  from './buildingProgress'


export default {
  name: 'buildingForm',
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
        save:  {
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
        
        save: {
          actionType:'submitAction',
          isShow(data){
            return !data.id
          },
            componentProperties:{
            size:'medium'
          },
          apiPromise: (data)=>{
            debugger
            data.projectLibraryId=this.projectLibraryId
            return buildingProjectSaveApi(data)
            }
        },
        update:  {
          actionType:'submitAction',
          isShow(data){
            return !!data.id
          },
            componentProperties:{
            size:'medium'
          },
          apiPromise: (data)=>{
            debugger
            // data.projectLibraryId=this.projectLibraryId
            return buildingProjectUpdateApi(data)
            }
        },
        prev:{
          actionType:'prev',
          label:'上一步',
          component:'el-button',
          componentProperties:{
            size:'medium'
          },
          actionType:'custom',
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
      projectLibraryId:''
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
        this.active=1
          this.buildingActions.save.apiPromise=buildingProjectUpdateApi 
          this.planActions.save.apiPromise=planProjectUpdateApi

        
        buildingProjectDetailApi(data.id).then(data=>{
          this.buildingDetail=data
        }).then(()=>{
          this.projectLibraryId=this.buildingDetail.projectLibraryId
          planProjectDetailApi(this.projectLibraryId).then(data=>{
            this.planDetail=data
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
