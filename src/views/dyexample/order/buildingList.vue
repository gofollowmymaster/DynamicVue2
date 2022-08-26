<template>
    <DynamicCurdPage
        v-if="pageOptions"
        :entity-label="entityLabel"
        :fields="fields"
        :page-optionsprops="pageOptions"
        :api-promises="apiPromises"
        mode="router"
    />
</template>
<script>
import {

    buildingOrderListApi,
    orderDeleteApi,
    transOrderSaveApi
} from '@/api/orderManage.js'
 
import fields from './buildingFields.js'
import transFields from './transFields.js'

import planForm from './planForm.vue'
import buildingForm from './buildingForm.vue'
import buildingProgress from './buildingProgress.vue'
import FormProjectEvaluate from '../components/FormProjectEvaluate.vue'

import Vue from 'vue'
Vue.component('PlanForm', planForm)
Vue.component('BuildingForm', buildingForm)
Vue.component('BuildingProgress', buildingProgress)
Vue.component('FormProjectEvaluate', FormProjectEvaluate)

const entityLabel = '建设订单管理'

export default {
    name: 'BuildingList',
    data() {
       
        return {
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                bulkdelete: orderDeleteApi,
                list: buildingOrderListApi
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
                            title: '新增处理中订单'
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
          
                    }
          
                },
                listOption: {
                    lineActions: {
                        update: null,
                        detail: null,
                        delete: {
                            sort: 102,
                            actionType: 'requestApiAction',
                            label: '刪除',
                            apiPromise: param => {
                               
                                param.id = param.orderLibraryId
                                return orderDeleteApi(param)
                            }
                        },
                        progress: {
                            label: '进度填报',
                            actionType: 'routerDialogPageAction',
                            permission: '进度填报',
                            mainKey: 'orderLibraryId',
                            containerProperties: {
                                title: '订单进度' 
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
                        trans: {
                            label: '转运输中',
                            actionType: 'routerDialogFormAction',
                            permission: '转运输中',
                            mainKey: 'orderLibraryId',
                            containerProperties: {
                                title: '转运输中'
                            },
               
                            formItemList: this.$buildFormFields(transFields),
          
                            saveAction: {
                                apiPromise: transOrderSaveApi,
                                callback: {
                  
                                }
                            },
                            cancelAction: null
            
                        },
                        modify: {
                            label: '修改',
                            permission: '修改',
                            actionType: 'routerDialogPageAction',
                            mainKey: 'orderLibraryId',
                            containerProperties: {
                                title: '修改订单信息' 
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
                        view: {
                            label: '详情',
                            mainKey: 'orderLibraryId',
                            actionType: 'routerDialogPageAction',
                            containerProperties: {
                                title: '订单详情'
                            },
                            body: [
                                {
                                    component: 'buildingForm',
                                    name: '@object@',
                                    props: {
                                        class: ['grid-col-24'],
                                        textMode: true
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

