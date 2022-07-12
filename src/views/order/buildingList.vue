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

  buildingProjectListApi,
  projectDeleteApi,
  transProjectSaveApi ,
} from '@/network/orderManage.js'
import {
  appendToPreset
} from '@/common/dynamicPage/utils/tool'
import fields from './buildingFields.js'
import transFields from './transFields.js'


import planForm from './planForm.vue'
import buildingForm from './buildingForm.vue'
import buildingProgress from './buildingProgress.vue'
import FormProjectEvaluate from '../components/FormProjectEvaluate.vue'


import Vue from 'vue'
Vue.component('planForm', planForm)
Vue.component('buildingForm', buildingForm)
Vue.component('buildingProgress', buildingProgress)
Vue.component('FormProjectEvaluate', FormProjectEvaluate)



const entityLabel = '建设项目管理'

export default {
  name: 'buildingList',
  data () {
    debugger
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        bulkdelete: projectDeleteApi,
        list: buildingProjectListApi,
      },
      pageOptions: {
        topToolBar: {
          create: null,
          add:   {
            label: '新增',
            actionType:"routerDialogPageAction",
            sort:1,
            isLoadData: false,
            componentProperties:{
              type:'primary',
              icon: 'el-icon-plus',
            },
            containerProperties: {
                title: '新增在建项目'
              },
              body: [
                {
                  component: 'buildingForm',
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
            delete: {
              sort:102,
              actionType:'requestApiAction',
              label:'刪除',
              apiPromise:(param)=>{
                debugger
                param.id=param.projectLibraryId
                return projectDeleteApi(param)
              }
            },
            progress:  {
              label: '进度填报',
              actionType:'routerDialogPageAction',
              permission: '进度填报',
              mainKey:'projectLibraryId',
              containerProperties: {
                  title: '项目进度' 
                },
                body: [
                  {
                    component: 'buildingProgress',
                    name: '@object@',
                     props: {
                    class: ['grid-col-24']
                  }
                  }
                ]
            
            },
            trans:   {
              label: '转移交',
              actionType:'routerDialogFormAction',
              permission: '转移交',
              mainKey:'projectLibraryId',
              containerProperties: {
                  title: '转移交'
                },
               
              formItemList: this.$buildFormFields(transFields),
          
              saveAction: appendToPreset('submitActionOption', {
                apiPromise: transProjectSaveApi,
                callback:{
                  
                }
              }),
              cancelAction:null
                
            
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
                    component: 'buildingForm',
                    name: '@object@',
                     props: {
                    class: ['grid-col-24']
                  }
                  }
                ]
         
            },
            view:  {
              label: '详情',
              mainKey:'projectLibraryId',
                     actionType:'routerDialogPageAction',
              containerProperties: {
                  title:  '项目详情'
                },
                body: [
                  {
                    component: 'buildingForm',
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
