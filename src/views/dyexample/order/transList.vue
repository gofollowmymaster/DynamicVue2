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
    completeOrderSaveApi,
    transOrderListApi,
    orderDeleteApi
} from '@/api/orderManage.js'
 
import fields from './transFields.js'
import completeFields from './completeFields.js'

import planForm from './planForm.vue'
import buildingForm from './buildingForm.vue'
import transForm from './transForm.vue'
import FormProjectEvaluate from '../components/FormProjectEvaluate.vue'

import Vue from 'vue'
Vue.component('PlanForm', planForm)
Vue.component('BuildingForm', buildingForm)
Vue.component('TransForm', transForm)
Vue.component('FormProjectEvaluate', FormProjectEvaluate)

const entityLabel = '运输中订单管理'

export default {
    name: 'TransList',
    data() {
       
        return {
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                bulkdelete: orderDeleteApi,
                list: transOrderListApi
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
                            title: '新增运输中订单'
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
         
                    }
          
                },
                listOption: {
                    lineActions: {
                        update: null,
                        detail: null,
                        delete: {
                            sort: 102,
                            label: '刪除',
                            actionType: 'requestApiAction',
                            apiPromise: param => {
                               
                                param.id = param.orderLibraryId
                                return orderDeleteApi(param)
                            }
                        },
                        complete: {
                            label: '转完成',
                            actionType: 'dialogFormAction',
                            permission: '转完成',
                            colNum: 1,
                            containerProperties: {
                                title: '转完成'
                            },
         
                            formItemList: this.$buildFormFields(completeFields),
                            saveAction: {
                                apiPromise: completeOrderSaveApi,
                                actionType: 'submitAction'
                            }

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
                            mainKey: 'orderLibraryId',
                            actionType: 'routerDialogPageAction',
                            containerProperties: {
                                title: '订单详情'
                            },
                            body: [
                                {
                                    component: 'transForm',
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

