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
  planProjectUpdateApi,
  planProjectSaveApi,
  planProjectListApi,
  projectDeleteApi,
  planProjectEditDetailApi,
  buildingProjectSaveApi
} from '@/network/orderManage.js'
import fields from './planFields.js'
import buildingFields from './buildingFields.js'

import planForm from './planForm.vue'
import Vue from 'vue'
Vue.component('planForm', planForm)

const entityLabel = '计划项目管理'

const formSections = {
  子项目信息: {
    hidden: true
  }
}

export default {
  name: 'planList',
  data () {
    debugger
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        create: planProjectSaveApi,
        bulkdelete: projectDeleteApi,
        list: planProjectListApi,
        detail: planProjectEditDetailApi,
        update: planProjectUpdateApi
      },
      pageOptions: {
        topToolBar: {
          create: null,
          add: {
            label: '新增',
            actionType: 'routerDialogPageAction',
            sort: 1,
            isLoadData: false,
            componentProperties: {
              type: 'primary',
              icon: 'el-icon-plus'
            },
            containerProperties: {
              title: '新增计划项目'
            },
            body: [
              {
                component: 'planForm',
                name: '@object@',
                props: {
                  class: ['grid-col-24']
                }
              }
            ]

          }
        },
        listOption: {
          lineActions: {
            update: null,
            detail: null,
            trans: {
              label: '转在建',
              permission: '转在建',
              actionType: 'dialogFormAction',
              singleCol: true,
              dataAdapter: (data) => {
                data.projectLibraryId = data.id
                return data
              },
              containerProperties: {
                title: '转在建',
                width: '40%'
              },
              formItemList: this.$buildFormFields(buildingFields, formSections),
              saveAction: {
                apiPromise: buildingProjectSaveApi
              }
            },
            modify: {
              label: '修改',
              actionType: 'routerDialogPageAction',
              permission: '修改',
              containerProperties: {
                title: '修改项目信息'
              },
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
            view: {
              label: '详情',
              actionType: 'routerDialogPageAction',
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
  }
}
</script>
<style lang="less" scoped></style>
