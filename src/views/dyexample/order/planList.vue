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
    planOrderUpdateApi,
    planOrderSaveApi,
    planOrderListApi,
    orderDeleteApi,
    planOrderEditDetailApi,
    exportassetsApi,
    buildingOrderSaveApi
} from '@/api/orderManage.js'
 
import fields from './planFields.js'
import buildingFields from './buildingFields.js'

import planForm from './planForm.vue'
import Vue from 'vue'
Vue.component('PlanForm', planForm)

const entityLabel = '计划订单管理'

const formSections = {
    '子订单信息': {
        hidden: true
    }
}

export default {
    name: 'PlanList',
    data() {
       
        return {
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                create: planOrderSaveApi,
                bulkdelete: orderDeleteApi,
                list: planOrderListApi,
                detail: planOrderEditDetailApi,
                update: planOrderUpdateApi
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
                            title: '新增计划订单'
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
                            label: '转处理中',
                            permission: '转处理中',
                            actionType: 'dialogFormAction',
                            colNum: 1,
                            dataAdapter: data => {
                                data.orderLibraryId = data.id
                                return data
                            },
                            containerProperties: {
                                title: '转处理中',
                                width: '40%'
                            },
                            formItemList: this.$buildFormFields(buildingFields, formSections),
                            saveAction: this.$appendToPreset('submitActionOption', {
                                apiPromise: buildingOrderSaveApi
                            })
                        },
                        modify: {
                            label: '修改',
                            actionType: 'routerDialogPageAction',
                            permission: '修改',
                            containerProperties: {
                                title: '修改订单信息'
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
                                title: '订单详情'
                            },
                            body: [
                                {
                                    component: 'planForm',
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

