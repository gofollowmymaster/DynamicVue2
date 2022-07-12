<template>
  <DynamicCurdPage
    v-if="pageOptions"
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
    mode="router"
  ></DynamicCurdPage>
</template>
<script>
import {
  projectListApi,
  planProjectUpdateApi,
  planProjectSaveApi,
  planProjectListApi,
  projectDeleteApi,
  planProjectEditDetailApi,
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
 

import buildingFields from './buildingFields.js'
import transFields from './transFields.js'
import completeFields from './completeFields.js'
import planForm from './planForm.vue'
import buildingForm from './buildingForm.vue'
import transForm from './transForm.vue'
import completeForm from './completeForm.vue'
import popProjectRadio from '../components/popProjectRadio.vue'
import projectRadio from '../components/projectRadio.vue'

import FormProjectEvaluate from '../components/FormProjectEvaluate.vue'

import Vue from 'vue'
Vue.component('planForm', planForm)
Vue.component('buildingForm', buildingForm)
Vue.component('transForm', transForm)
Vue.component('completeForm', completeForm)
Vue.component('FormProjectEvaluate', FormProjectEvaluate)
Vue.component('popProjectRadio', popProjectRadio)



const entityLabel = '项目库管理'
import { buildDynamicSelectOption,elementUploadFileApi,globalDownloadFileById } from "@/network/global";
const formSections={
   "子项目信息":{
    hidden:true,
   },
}

const fields=[
 { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  { key: "id", type: "FormHide", label: "", formOption:{}},
  { key: "index", type: "index", label: "序号", tableOption:{width:60}},

    {
      "key": "admId",
      "label": "行政区划",
      "type": "FormAdministrativeSelector",
      searchOption:true,
    },
    {
      "key": "projectCode",
      "label": "项目编号",
      "type": "FormInput",
      "tableOption": {}
    },
    {
      "key": "projectName",
      "label": "项目名称",
      "type": "FormInput",
      "tableOption": {}
    },
     {
      "key": "overallArea",
      "label": "总体规划面积",
      "type": "FormDecimalNumber",
      "tableOption": {}
    },
    {
      "key": "greenArea",
      "label": "绿地规划面积",
      "type": "FormIntNumber",
      "tableOption": {}
    },
    {
      "key": "waterArea",
      "label": "水体规划面积",
      "type": "FormIntNumber",
      "tableOption": {}
    },
    {
      "key": "capitalBudgeting",
      "label": "投资预算",
      "type": "FormIntNumber",
      "tableOption": {}
    },
    {
      "key": "buildType",
      "label": "建设类型",
      "type": "FormSelect",
      options:[{
        value:0,
        label:'新建',

      },{
        value:1,
        label:'占绿恢复'
      },
    {
      value:2,
      label:'改建'
    }],
      "tableOption": {},
      searchOption:{}
    },
    {
      "key": "useLandDictId",
      "label": "用地性质",
      "type": "FormDynamicSelect",
      options:  buildDynamicSelectOption('project_use_land'),
      searchOption:{},
      tableOption:{
        key:'useLandDictLabel'
      },
    },
    {
      "key": "projectAttributeDictId",
      "label": "项目属性",
      "type": "FormDynamicSelect",
      options:  buildDynamicSelectOption('project_attribute'),
      tableOption:{
        key:'projectAttributeDictLabel'
      },
      searchOption:{},
    },
    {
      "key": "projectTypeDictId",
      "label": "项目类别",
      "type": "FormDynamicSelect",
      options:  buildDynamicSelectOption('project_type'),
      tableOption:{
        key:'projectTypeDictLabel'
      },
      searchOption:{},
    },
    {
      "key": "projectStatus",
      "label": "项目状态",
      "type": "FormSelect",
      options:  [
        {
          value:0,
          label:'计划'
        },
        {
          value:1,
          label:'在建'
        },
         {
          value:2,
          label:'移交'
        },
          {
          value:3,
          label:'已竣工'
        },
      ],
      tableOption:{
        key:'projectStatusDesc',
        template(row){
          if(row.projectStatusDesc==='完成'){
            return `已竣工`
          }else{
          return row.projectStatusDesc}
        }
      },
      searchOption:{},
    },

]

const projectStatusFormMap={
  0:'planForm',
  1:'buildingForm',
  2:'transForm',
  3:'completeForm',
}

export default {
  name: 'projectList',
  data () {
    const self=this
    return {
      projectStatus:0,
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        create: planProjectSaveApi,
        bulkdelete: projectDeleteApi,
        list: projectListApi,
        detail: planProjectEditDetailApi,
        update: planProjectUpdateApi
      },
      
      pageOptions: {
        // tableUp:{
        //   component:'DyTmpl',
        //   properties:{
        //     tmpl:'总数量:<span class="text-blue py4 px4">#{num}</span>,总数量1:<span class="text-red py4 px4">#{num1}</span>',
        //     data:{
        //       num:123254,
        //       num1:5546
        //     }
        //   }
        // },
        topToolBar: {
          create: null,
          add:   {
            label: '新增',
            sort: 5,
            isLoadData: false,
            actionType:'routerDialogPageAction',
            msgBox:{
              message:this.$createElement(projectRadio, {
                key: new Date().getTime(),
                on: {
                  // 选择其他项，el-select 上显示的值，没有刷新
                  change: value => {
                      self.projectStatus=value
                  },
                }
              },)
            },
            actionHook:(action,actionData)=>{
              debugger
              action.dialog.body[0].component=projectStatusFormMap[self.projectStatus||0]
            },
            componentProperties: {
              type: 'primary',
              icon: 'el-icon-plus',
            },
            containerProperties: {
                title: '新增项目'
            },
            body: [
              {
                component: 'planForm',
                name: '@object@',
                label:'',
                props: {
                  class: ['grid-col-24']
                }
              }
            ]
          }
        },
        listOption: {
          actionColWidth:240,
          lineActions: {
            update: null,
            detail: null,
            building: {
              label: '转在建',
              actionType:'dialogFormAction',
              isShow:(data)=>{
                return data.projectStatus=='0'
              },
              permission: '转在建',
              dataAdapter: (data) => {
                data.projectLibraryId = data.id
                return data
              },
              singleCol:true,
              containerProperties: {
                title: '转在建',
                width:'40%'
              },
              
              formItemList: this.$buildFormFields(buildingFields,formSections),
              saveAction:   {
                actionType:'submitAction',
                apiPromise: buildingProjectSaveApi,
              },
            },
            trans: {
              label: '转移交',
              actionType:'dialogFormAction',
              isShow:(data)=>{
                return data.projectStatus=='1'
              },
              permission: '转移交',
              dataAdapter: (data) => {
                data.projectLibraryId = data.id
                return data
              },
              container:'DyPage',
              containerProperties: {
                title: '转移交'
              },
              formItemList: this.$buildFormFields(transFields),

              saveAction: this.$generateActionOption('submitActionOption', {
                apiPromise: transProjectSaveApi,
              }),
            },
            complete: {
              label: '转完成',
              actionType:'dialogFormAction',
              isShow:(data)=>{
                return data.projectStatus=='2'
              },
              permission: '转完成',
              dataAdapter: (data) => {
                  data.projectLibraryId = data.id
                  return data
                },
              singleCol:true,
              containerProperties: {
                  title: '转完成',
                  width:'40%'
                },

              formItemList: this.$buildFormFields(completeFields),
              saveAction:  {
                apiPromise: completeProjectSaveApi,
              },
            },
            modify: {
              label: '修改',
              actionType:'dialogPageActionOption',
              permission: '修改',
              actionHook:(action,actionData)=>{
              const status=parseInt(actionData.projectStatus)
              action.dialog.body[0].component=projectStatusFormMap[status]
            },
            containerProperties: {
                title: '修改项目信息'
            },
            container:'DyPage',
            body: [
              {
                component: 'planForm',
                name: '@object@',
                props: {
                  class: ['grid-col-24']
                }
              }
            ]

            },
            view:   {
              label: '详情',
              actionType:'dialogPageAction',
              actionHook:(action,actionData)=>{
                debugger
                const status=parseInt(actionData.projectStatus)
                action.dialog.body[0].component=projectStatusFormMap[status]
              },
               dataAdapter: (data) => {
                data.projectLibraryId = data.id
                return data
              },
              container:'DyPage',
              containerProperties: {
                  title: '项目详情'
                },
              body: [
                {
                  component: 'planForm',
                  name: '@object@',
                  props: {
                    class: ['grid-col-24'],
                    textModel: true
                  }
                }
              ]
            }
          }
        },
        treeOption: null
      }
    }
  },
  mounted(){

  }
}
</script>
<style lang="less" scoped></style>
