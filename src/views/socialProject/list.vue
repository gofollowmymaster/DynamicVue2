<template>
  <DynamicCurdPage
    v-if="pageOptions"
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</template>
<script>
import {
  socialProjectUpdateApi,
  socialProjectSaveApi,
  socialProjectDetailApi,
  socialProjectListApi,
  socialProjectDeleteApi,
  socialProjecValidSavetApi
} from '@/network/orderManage.js'
import {

  appendToPreset
} from '@/common/dynamicPage/utils/tool'
import { fields, airFields } from './socialProjectFields.js'

import detailForm from './detailForm.vue'
import Vue from 'vue'
Vue.component('detailForm', detailForm)

const entityLabel = '项目清单'

export default {
  name: 'socialProjectManage',
  data () {
    debugger
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        create: socialProjectSaveApi,
        bulkdelete: socialProjectDeleteApi,
        list: socialProjectListApi,
        detail: socialProjectDetailApi,
        update: socialProjectUpdateApi
      },
      pageOptions: {
        topToolBar: {
          bulkdelete: null,

          create: {
            label: '项目报建',
            containerProperties: {
              title: '社会项目报建'
            }
          }
          // export:appendToPreset('downloadActionOption',{
          //   apiPromise:exportOldtreeApi,
          //   label:'导出',
          //   actionDataKey:'queryParams',
          // }),
        },
        listOption: {
          lineActions: {
            detail:null,
            valid:   {
              sort:1,
              label: '竣工验收',
              actionType:'dialogFormAction',
              isShow:(data)=>{
                return data.projectStatusInt==1
              },
              dataAdapter:(data)=>{
                data.orderManageId=data.id
                return data
              },
               singleCol:true,
              // apiPromise: getSocietyProjectAirInfoApi,
              containerProperties: {
                  title: '社会项目竣工验收'
                },
                  formItemList: this.$buildFormFields(airFields),
                    saveAction: {
                      actionType:'submitActionOption',
                      apiPromise: socialProjecValidSavetApi
                    }
            },
            update:null,
            modify:  {
              label: '修改',
              actionType:'routerDialogPageAction',

                containerProperties: {
                  title:  '社会单位项目修改'
                },
                body: [
                  {
                    component: 'detailForm',
                    name: '@object@',
                    props: {
                      class: ['grid-col-24'],
                  }
                  }
                ]
            },
        view: {
              label: '详情',
              actionType:'routerDialogPageAction',

                containerProperties: {
                  title:  '社会项目详情'
                },
                body: [
                  {
                    component: 'detailForm',
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
        // treeOption: null
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
