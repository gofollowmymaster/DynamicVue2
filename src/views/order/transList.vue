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
  completeProjectSaveApi,
  transProjectListApi,
  projectDeleteApi,
} from '@/network/orderManage.js'
import {
  appendToPreset
} from '@/common/dynamicPage/utils/tool'
import fields from './transFields.js'
import completeFields from './completeFields.js'



import planForm from './planForm.vue'
import buildingForm from './buildingForm.vue'
import transForm from './transForm.vue'
import FormProjectEvaluate from '../components/FormProjectEvaluate.vue'



import Vue from 'vue'
Vue.component('planForm', planForm)
Vue.component('buildingForm', buildingForm)
Vue.component('transForm', transForm)
Vue.component('FormProjectEvaluate', FormProjectEvaluate)



const entityLabel = '移交项目管理'

export default {
  name: 'transList',
  data () {
    debugger
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        bulkdelete: projectDeleteApi,
        list: transProjectListApi,
      },
      pageOptions: {
        topToolBar: {
          create: null,
          add:   {
            label: '新增',
            actionType:'routerDialogPageAction',
            sort:1,
            isLoadData: false,
            componentProperties:{
              type:'primary',
              icon: 'el-icon-plus',
            },
            containerProperties: {
                title: '新增移交项目'
              },
              body: [
                {
                  component: 'transForm',
                  name: '@object@',
                  props: {
                    class: ['grid-col-24']
                  }
                }
              ]
         
          },
          
        },
        listOption: {
          lineActions: {
            update:null,
            detail: null,
            delete:{
              sort:102,
              label:'刪除',
              actionType:'requestApiAction',
              apiPromise:(param)=>{
                debugger
                param.id=param.projectLibraryId
                return projectDeleteApi(param)
              }
            },
            complete:  {
              label: '转完成',
              actionType:'dialogFormAction',
              permission: '转完成',
              singleCol:true,
              containerProperties: {
                  title: '转完成'
                },
         
                  formItemList: this.$buildFormFields(completeFields),
                    saveAction:   {
                      apiPromise: completeProjectSaveApi,
                      actionType:'submitAction'
                    },

            },
            modify:   {
              label: '修改',
              permission: '修改',
              actionType:'routerDialogPageAction',
              mainKey:'projectLibraryId',
              containerProperties: {
                  title: '修改项目信息' 
                },
                body: [
                  {
                    component: 'transForm',
                    name: '@object@',
                     props: {
                    class: ['grid-col-24']
                  }
                  }
                ]
       
            },
            view: {
              label: '详情',
              mainKey:'projectLibraryId',
              actionType:'routerDialogPageAction',
             containerProperties: {
                  title:  '项目详情'
                },
                body: [
                  {
                    component: 'transForm',
                    name: '@object@',
                    props: {
                      class: ['grid-col-24'],
                      textModel:true,
                  }
                  }
                ]
            },
          }
        },
        treeOption: null
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
