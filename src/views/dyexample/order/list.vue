<template>
    <div class=" hz-low-code  ">
        <DynamicCurdPage
            :entity-label="entityLabel"
            :fields="fields"
            :page-optionsprops="pageOptions"
            :api-promises="apiPromises"
            mode="router"
        />
    </div>
</template>
<script>
import {
    orderListApi,
    planOrderUpdateApi,
    planOrderSaveApi,
 
    orderDeleteApi,
    planOrderEditDetailApi,
    buildingOrderSaveApi,
 
    transOrderSaveApi,
 
    completeOrderSaveApi

} from '@/api/orderManage.js'

import buildingFields from './buildingFields.js'
import transFields from './transFields.js'
import completeFields from './completeFields.js'
import planForm from './planForm.vue'
import buildingForm from './buildingForm.vue'
import transForm from './transForm.vue'
import completeForm from './completeForm.vue'
// import popProjectRadio from './components/PopProjectRadio.vue'
import orderRadio from './components/ProjectRadio.vue'
console.log('---orderRadio----', orderRadio)
import FormProjectEvaluate from './components/FormProjectEvaluate.vue'

import Vue from 'vue'
Vue.component('PlanForm', planForm)
Vue.component('BuildingForm', buildingForm)
Vue.component('TransForm', transForm)
Vue.component('CompleteForm', completeForm)
Vue.component('FormProjectEvaluate', FormProjectEvaluate)
// Vue.component('PopProjectRadio', popProjectRadio)
Vue.component('OrderRadio', orderRadio)

const entityLabel = '订单库管理'
const formSections = {
    '子订单信息': {
        hidden: true
    }
}

const fields = [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchable: true },
    { key: 'id', type: 'FormHide', label: '', formOption: {}},

  
    {
        'key': 'orderCode',
        'label': '订单编号',
        'type': 'FormInput',
        'tableOption': {}
    },
    {
        'key': 'orderName',
        'label': '订单名称',
        'type': 'FormInput',
        'tableOption': {}
    },
    {
        'key': 'overallArea',
        'label': '总体规划面积',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'greenArea',
        'label': '绿地规划面积',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'waterArea',
        'label': '水体规划面积',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'capitalBudgeting',
        'label': '投资预算',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'buildType',
        'label': '建设类型',
        'type': 'FormSelect',
        options: [{
                      value: 0,
                      label: '新建'

                  }, {
                      value: 1,
                      label: '占绿恢复'
                  },
                  {
                      value: 2,
                      label: '改建'
                  }],
        'tableOption': {},
        searchOption: {}
    },
    {
        'key': 'useLandDictId',
        'label': '用地性质',
        'type': 'FormDynamicSelect',
        dictType: ('order_use_land'),
        searchOption: {},
        tableOption: {
            key: 'useLandDictLabel'
        }
    },
    {
        'key': 'orderAttributeDictId',
        'label': '订单属性',
        'type': 'FormDynamicSelect',
        dictType: ('order_attribute'),
        tableOption: {
            key: 'orderAttributeDictLabel'
        },
        searchOption: {}
    },
    {
        'key': 'orderTypeDictId',
        'label': '订单类别',
        'type': 'FormDynamicSelect',
        dictType: ('order_type'),
        tableOption: {
            key: 'orderTypeDictLabel'
        },
        searchOption: {}
    },
    {
        'key': 'orderStatus',
        'label': '订单状态',
        'type': 'FormSelect',
        options: [
            {
                value: 0,
                label: '已支付'
            },
            {
                value: 1,
                label: '处理中'
            },
            {
                value: 2,
                label: '运输中'
            },
            {
                value: 3,
                label: '已完成'
            }
        ],
        tableOption: {
            //  'type': 'FormSelect',
            // key: 'orderStatusDesc',
            // template(row) {
            //     if (row.orderStatusDesc === '完成') {
            //         return '已完成'
            //     } else {
            //         return row.orderStatusDesc 
            //     }
            // }
        },
        searchOption: {}
    }

]

const orderStatusFormMap = {
    0: 'planForm',
    1: 'buildingForm',
    2: 'transForm',
    3: 'completeForm'
}

export default {
    name: 'ProjectList',
    data() {
        const self = this
        return {
            orderStatus: 0,
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                create: planOrderSaveApi,
                bulkdelete: orderDeleteApi,
                list: orderListApi,
                detail: planOrderEditDetailApi,
                update: planOrderUpdateApi
            },
      
            pageOptions: {
                tableUp: {
                    component: 'DyTmpl',
                    properties: {
                        tmpl: '总数量:<span class="text-blue py4 px4">#{num}</span>,总金额:<span class="text-red py4 px4">#{num1}</span>',
                        data: {
                            num: 123254,
                            num1: 5546
                        }
                    }
                },
                topToolBar: {
                    create: null,
                    add: {
                        label: '新增',
                        sort: 5,
                        isLoadData: false,
                        actionType: 'routerDialogPageAction',
                        msgBox: {
                            message: this.$createElement(orderRadio, {
                                key: new Date().getTime(),
                                on: {
                                    // 选择其他项，el-select 上显示的值，没有刷新
                                    change: value => {
                                        self.orderStatus = value
                                    }
                                }
                            },)
                        },
                        router: actionData => {
                            return  {path: this.$route.path, query: {orderStatus: self.orderStatus, id: actionData.id} }
                        },
                        actionHook: (action, actionData) => {
                            debugger
                            action.dialog.body[0].component = orderStatusFormMap[self.orderStatus || 0]
                            // self.pageOptions.listOption.lineActions.view.body[0].component=orderStatusFormMap[self.orderStatus]

                        },
                        componentProperties: {
                            type: 'primary',
                            icon: 'el-icon-plus'
                        },
                        containerProperties: {
                            title: '新增订单'
                        },
                        body: [
                            {
                                component: 'planForm',
                                name: '@object@',
                                label: '',
                                props: {
                                    class: ['grid-col-24']
                                }
                            }
                        ]
                    }
                },
                listOption: {
                    actionColWidth: 240,
                    lineActions: {
                        update: null,
                        detail: null,
                        building: {
                            label: '转处理中',
                            actionType: 'dialogFormAction',
                            isShow: data => {
                                debugger
                                return data.orderStatus == '0'
                            },
                            permission: '转处理中',
                            dataAdapter: data => {
                                data.orderLibraryId = data.id
                                return data
                            },
                            colNum: 1,
                            containerProperties: {
                                title: '转处理中',
                                width: '40%'
                            },
              
                            formItemList: this.$buildFormFields(buildingFields, formSections),
                            saveAction: {
                                actionType: 'submitAction',
                                apiPromise: buildingOrderSaveApi
                            }
                        },
                        trans: {
                            label: '转运输中',
                            actionType: 'dialogFormAction',
                            isShow: data => {
                                return data.orderStatus == '1'
                            },
                            permission: '转运输中',
                            dataAdapter: data => {
                                data.orderLibraryId = data.id
                                return data
                            },
                            container: 'DyPage',
                            containerProperties: {
                                title: '转运输中'
                            },
                            formItemList: this.$buildFormFields(transFields),

                            saveAction: {
                                actionType: 'submitActionOption',
                                apiPromise: transOrderSaveApi
                            }
                        },
                        complete: {
                            label: '转完成',
                            actionType: 'dialogFormAction',
                            isShow: data => {
                                return data.orderStatus == '2'
                            },
                            permission: '转完成',
                            dataAdapter: data => {
                                data.orderLibraryId = data.id
                                return data
                            },
                            colNum: 1,
                            containerProperties: {
                                title: '转完成',
                                width: '40%'
                            },

                            formItemList: this.$buildFormFields(completeFields),
                            saveAction: {
                                actionType: 'submitActionOption',
                                apiPromise: completeOrderSaveApi
                            }
                        },
                        modify: {
                            label: '修改',
                            actionType: 'dialogPageActionOption',
                            permission: '修改',
                            router: actionData => {
                                return  {path: this.$route.path, query: {orderStatus: actionData.orderStatus, id: actionData.id} }
                            },
                            actionHook: (action, actionData) => {
                                debugger
                                const status = parseInt(actionData.orderStatus)
                                action.dialog.body[0].component = orderStatusFormMap[status]
                            },
                            containerProperties: {
                                title: '修改订单信息'
                            },
                            container: 'DyPage',
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
                            actionType: 'dialogPageAction',

                            router: actionData => {
                                return  {path: this.$route.path, query: {orderStatus: actionData.orderStatus, id: actionData.id} }
                            },
                            actionHook: (action, actionData) => {
                                debugger
                                const status = parseInt(actionData.orderStatus)
                                // action.dialog.body[0].component = orderStatusFormMap[status]
                                this.$set(action.dialog.body[0], 'component', orderStatusFormMap[status])
                                // self.pageOptions.listOption.lineActions.view.body[0].component=orderStatusFormMap[status]
                            },
                           
                            dataAdapter: data => {
                                data.orderLibraryId = data.id
                                return data
                            },
                            container: 'DyPage',
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
    },
    created() {
        debugger
    }
}
</script>