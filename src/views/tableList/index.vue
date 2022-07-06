<template>
  <DynamicCurdPage
    v-if="pageOptions"
    :entityLabel="entityLabel"
    :fields="fields"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</template>
<script>

import {
  assetsUpdateApi,
  assetsSaveApi,
  assetsDetailApi,
  assetsListApi,
  assetsDeleteApi,
  assetsEditDetailApi,
  exportOldtreeApi
} from '@/network/assets.js'
import {

  buildDetailFields,
  appendToPreset
} from '@/packages/utils/tool'
import { assetsFields as fields} from "./assetsListField.js"
import maitainLog  from "./maitainLog.vue"
import protectLog  from "./protectLog.vue"
import transLog  from "./transLog.vue"

import Vue  from  'vue'
Vue.component('maitainLog',maitainLog)
Vue.component('protectLog',protectLog)
Vue.component('transLog',transLog)



const entityLabel = '固定资产'
 
  
export default {
  name: 'assetsManage',
  data () {
    debugger
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises:{
        create:assetsSaveApi,
        bulkdelete:assetsDeleteApi,
        list:assetsListApi,
        detail:assetsEditDetailApi,
        update:assetsUpdateApi
      },
      pageOptions: {
        topToolBar:{
          export:{
            apiPromise:exportOldtreeApi,
            actionType:'downloadAction',
            label:'导出',
            actionDataKey:'queryParams',
          },
        },
        listOption: {
          lineActions:{
  
            detail:null,
            detail2: {
              label: '详情',
              actionType:'routerDialogPageAction',
              // sort:60,
              permission:'详情',
              containerProperties:{
                  title: entityLabel +'详情',
                },
              layout:'LayoutTabs',
              body: [ 
                {  
                  component: 'DynamicForm',
                  name:'@object@',
                  label:'基本信息',
                  props: appendToPreset('dynamicFormOption',
                  {
                      apiPromise: assetsDetailApi,
                      formItemList: buildDetailFields(fields),
                      formOption: {
                        borderForm:false,
                        textModel:true,
                        formProperties: {
                          'label-position': 'right'
                        },
                      },
                      actions:null
                  },true)
                },
                {
                  component:'maitainLog',
                  label:'养护记录',
                    name:'@object@',
                },
                  {
                  component:'protectLog',
                  label:'保护记录',
                    name:'@object@',
                },
                {
                  component:'transLog',
                  label:'移植记录',
                    name:'@object@',
                },
              ]
        
            },
          }
        },
        // pagination: { 'hide-on-single-page': false },
        treeOption:null
      }
    }
  }
}
</script>
<style lang="css" scoped></style>
