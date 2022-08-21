<template>
    <div class=" hz-low-code  ">
        <DynamicCurdPage v-if="pageOptions"
                         class=""
                         :entity-label="entityLabel"
                         :fields="fields"
                         :page-optionsprops="pageOptions"
                         :api-promises="apiPromises"
        />
    </div>
</template>
<script>

import {
    assetsUpdateApi,
    assetsSaveApi,
    assetsDetailApi,
    assetsListApi,
    assetsDeleteApi,
    assetsEditDetailApi,
    exportassetsApi
} from '@/api/assets.js'
 
import { assetsFields as fields} from './assetsListField.js'
import maitainLog  from './maitainLog.vue'
import protectLog  from './protectLog.vue'
import transLog  from './transLog.vue'

import Vue  from  'vue'
Vue.component('MaitainLog', maitainLog)
Vue.component('ProtectLog', protectLog)
Vue.component('TransLog', transLog)

const entityLabel = '资产'
  
export default {
    name: 'AssetsManage',
    data() {
       
        return {
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                create: assetsSaveApi,
                bulkdelete: assetsDeleteApi,
                list: assetsListApi,
                detail: assetsEditDetailApi,
                update: assetsUpdateApi
            },
            pageOptions: {
                treeOption: {

                },
                topToolBar: {
                    export: {
                        apiPromise: exportassetsApi,
                        actionType: 'downloadAction',
                        label: '导出',
                        actionDataKey: 'queryParams'
                    }
                },
                listOption: {
                    lineActions: {
  
                        detail: null,
                        detail2: {
                            label: '详情',
                            actionType: 'routerDialogPageAction',
                            // container:'dy-page',
                            // sort:60,
                            permission: '详情',
                            containerProperties: {
                                title: entityLabel + '详情'
                            },
                            layout: 'LayoutTabs',
                            body: [ 
                                {  
                                    component: 'DynamicForm',
                                    name: '@object@',
                                    label: '基本信息',
                                    props: this.$appendToPreset('dynamicFormOption',
                                                                {
                                                                    apiPromise: assetsDetailApi,
                                                                    formItemList: this.$buildDetailFields(fields),
                                                                    formOption: {
                                                                        borderForm: false,
                                                                        textMode: true,
                                                                        formProperties: {
                                                                            'label-position': 'right'
                                                                        }
                                                                    },
                                                                    actions: null
                                                                }, true)
                                },
                                {
                                    component: 'maitainLog',
                                    label: '养护记录',
                                    name: '@object@'
                                },
                                {
                                    component: 'protectLog',
                                    label: '保护记录',
                                    name: '@object@'
                                },
                                {
                                    component: 'transLog',
                                    label: '转移记录',
                                    name: '@object@'
                                }
                            ]
        
                        }
                    }
                }
            }
        }
    }
}
</script>

