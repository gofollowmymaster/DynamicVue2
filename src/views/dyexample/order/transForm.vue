<template>
    <main>
        <el-steps simple
                  :active="active"
                  process-status="process"
                  class="mx24 my12"
                  align-center
        >
            <el-step>
                <template slot="title">
                    <span @click="switchStep(0)">1. 下单中</span>
                </template>
            </el-step>
            <el-step>
                <template slot="title">
                    <span @click="switchStep(1)">2. 处理中</span>
                </template>
            </el-step>
            <el-step title="运输中">
                <template slot="title">
                    <span @click="switchStep(2)">3. 运输中</span>
                </template>
            </el-step>
            <el-step title="完成" />
        </el-steps>
        <DynamicForm
            v-show="active===0"
            class="relative"
            :form-option="formOption"
            :form-item-list="planFormItemList"
            :actions="planActions"
            :data="planDetail"
        />
        <DynamicForm
            v-show="active===1"
            class="relative"
            :form-option="formOption"
            :form-item-list="buildingFormItemList"
            :actions="buildingActions"
            :data="buildingDetail"
        >
            <template #progressTable>
                <buildingProgress v-if="orderLibraryId" :data="{id:orderLibraryId}" mode="textMode" />
            </template>
        </DynamicForm>
        <DynamicForm
            v-show="active===2"
            class="relative"
            :form-option="formOption"
            :form-item-list="transFormItemList"
            :actions="transActions"
            :data="transDetail"
        />
    </main>
</template>
<script>
import {
    planOrderUpdateApi,
    planOrderSaveApi,
    planOrderDetailApi,
    buildingOrderSaveApi,
    buildingOrderDetailApi,
    buildingOrderUpdateApi,
    transOrderSaveApi,
    transOrderDetailApi,
    transOrderUpdateApi
} from '@/api/orderManage.js'
import planFields from './planFields.js'
import buildingFields from './buildingFields.js'
import transFields from './transFields.js'

import buildingProgress  from './buildingProgress'

export default {
    name: 'TransForm',
    components: {buildingProgress},
    props: {
        data: {
            type: [Object, Number, String, Array]
        },
        textMode: [Boolean]
    },
    data() {
        return {
            active: 0,
            // form字段
            formOption: this.$appendToPreset('formOption', {textMode: this.textMode,
                                                            formProperties: {
                                                                'label-width': '150px'
                                                                // 'label-position': this.textMode?'right':'top'
                                                            }}),
            planFormItemList: this.$buildFormFields(planFields),
            planActions: {
                save: {
                    actionType: 'submitActionOption',
                    apiPromise: planOrderSaveApi,
                    label: '下一步',
                    componentProperties: {
                        size: 'medium'
                    },
                    callback: {
                        next: (vm, res) => {
                           
                            this.active = 1
                            if (!this.orderLibraryId) {   
                                if (!res.data) {
                                    console.error('接口没有返回orderLibraryId?查看network验证')
                                    return 
                                }
                                this.orderLibraryId = res.data
                            }
              
                        },
                        closeModal: false,
                        refresh: false,
                        showTip: false,
                        reset: false
                    }
                }
            },
            planDetail: {},
            buildingFormItemList: this.textMode ? this.$buildDetailFields(buildingFields) : this.$buildFormFields(buildingFields),

            buildingActions: {
        
                save: {
                    actionType: 'submitActionOption',
                    label: '下一步',
                    componentProperties: {
                        size: 'medium'
                    },
                    isShow(data) {
                       
                        return !data.id
                    },
                    apiPromise: data => {
                       
                        console.log('----this.orderLibraryId---', this.orderLibraryId)
                        if (!this.orderLibraryId) {
                            console.error('没有orderLibraryId ')
                            return 
                        }
                        data.orderLibraryId = this.orderLibraryId   
                        return buildingOrderSaveApi(data)
                    },
                    callback: {
                        closeModal: false,
                        refresh: false,
                        showTip: false,
                        reset: false,
                        next: (vm, res) => {
              
                            this.active = 2
                        }
                    }
                },
                 
                prev: {
                    actionType: 'prev',
                    label: '上一步',
                    component: 'el-button',
                    componentProperties: {
                        size: 'medium'
                    },
                    isLoadData: false,
                    actionHandle: data => {
                        this.active = 0
                        this.planActions.save.apiPromise = data => {

                            return planOrderUpdateApi(data)
                        }
                    }
                }
            },
            buildingDetail: {},
            orderLibraryId: '',
            transFormItemList: this.$buildFormFields(transFields),
            transActions: {
        
                save: {
                    actionType: 'submitActionOption',
                    apiPromise: transOrderSaveApi,
                    label: '保存',
                    componentProperties: {
                        size: 'medium'
                    },
                    callback: {
                        next: (vm, res) => {
                          
              
                        },
                        closeModal: false,
                        refresh: false,
                        showTip: true,
                        reset: false
                    }
                },
                prev: {
                    actionType: 'prev',
                    label: '上一步',
                    component: 'el-button',
                    properties: {
                        size: 'medium'
                    },
                    isLoadData: false,
                    actionHandle: data => {
                        this.active = 1
                        this.buildingActions.save.apiPromise = data => {

                            return buildingOrderUpdateApi(data)
                        }
                    }
                }
            },
            transDetail: {}
        }
    },
    watch: {
        data: {
            handler(data) {
               
                if (data.id) {
                    this.loadDetail(data)

                }
            },
            immediate: true
        }
    },
    methods: {
        loadDetail(data) {
            this.active = 2
            transOrderDetailApi(data.id).then(data => {
                this.transDetail = data
                this.transActions.save.apiPromise = transOrderUpdateApi 
            }).then(() => {
                this.orderLibraryId = this.transDetail.orderLibraryId
                planOrderDetailApi(this.orderLibraryId).then(data => {
                    this.planDetail = data
                    this.planActions.save.apiPromise = planOrderUpdateApi
                })
                buildingOrderDetailApi(this.orderLibraryId).then(data => {
                    this.buildingDetail = data
                    this.buildingActions.save.apiPromise = buildingOrderUpdateApi
                })
            })
        },
        switchStep(step) {
        
            if (!this.textMode) return 
            this.active = step
        }
    }
}
</script>

