<template>
    <main>
        <el-steps
            :active="active"
            process-status="process"
            class="mx24 my12"
            align-center simple
        >
            <el-step simple>
                <template slot="icon">
                    <span class="circle" @click="switchStep(0)">1</span>
                </template>
                <template slot="title">
                    <span @click="switchStep(0)">下单中</span>
                </template>
            </el-step>
            <el-step>
                <template slot="icon">
                    <span class="circle" @click="switchStep(1)">2</span>
                </template>
                <template slot="title">
                    <span @click="switchStep(1)">处理中</span>
                </template>
            </el-step>
            <el-step title="运输中">
                <template slot="icon">
                    <span class="circle" @click="switchStep(2)">3</span>
                </template>
                <template slot="title">
                    <span @click="switchStep(2)">运输中</span>
                </template>
            </el-step>
            <el-step title="完成">
                <template slot="icon">
                    <span class="circle" @click="switchStep(3)">4</span>
                </template>
                <template slot="title">
                    <span @click="switchStep(3)">完成</span>
                </template>
            </el-step>
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
   
        <DynamicForm
            v-show="active===3"
            class="relative"
            :form-option="formOption"
            :form-item-list="completeFormItemList"
            :actions="completeActions"
            :data="completeDetail"
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
    transOrderUpdateApi,
    completeOrderSaveApi,
    completeOrderUpdateApi,
    completeOrderDetailApi
} from '@/api/orderManage.js'
import planFields from './planFields.js'
import buildingFields from './buildingFields.js'
import transFields from './transFields.js'
import completeFields from './completeFields.js'

import buildingProgress  from './buildingProgress'

export default {
    name: 'CompleteForm',
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
            formOption: this.$appendToPreset('formOption', {
                textMode: this.textMode,
                formProperties: {
                    'label-width': '150px'
                    // 'label-position': this.textMode?'right':'top'
                }
            }),
            planFormItemList: this.$buildFormFields(planFields),
            planActions: {
                save: {
                    actionType: 'submitAction',
                    apiPromise: planOrderSaveApi,
                    label: '下一步',
                    componentProperties: {
                        size: 'medium'
                    },
                    callback: {
                        next: (vm, res) => {
                           
                            this.active = 1

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
                    isShow(data) {
                       
                        return !data.id
                    },
                    componentProperties: {
                        size: 'medium'
                    },
                    apiPromise: data => {
               
                        data.orderLibraryId = this.orderLibraryId   
                        return buildingOrderSaveApi(data)
                    },
                    callback: {
                        closeModal: false,
                        refresh: true,
                        showTip: false,
                        reset: true,
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
                    apiPromise: data => {
                    
                        return transOrderSaveApi(data)
                    },
                    label: '下一步',
                    componentProperties: {
                        size: 'medium'
                    },
                    isShow(data) {
                       
                        return !data.id
                    },
                    callback: {
                        next: (vm, res) => {
                           
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
                        reset: false,
                        next: (vm, res) => {
                            this.orderLibraryId = res.data
                            this.active = 3
                        }
                    }
                },
                
                prev: {
                    actionType: 'prev',
                    label: '上一步',
                    componentProperties: {
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
            transDetail: {},
            completeFormItemList: this.$buildFormFields(completeFields),
            completeActions: {
        
                save: {
                    actionType: 'submitActionOption',
                    apiPromise: completeOrderSaveApi,
                    label: '保存',
                    componentProperties: {
                        size: 'medium'
                    },
                    callback: {
                        next: (vm, res) => {
                            
                        },
                        closeModal: false,
                        refresh: true,
                        showTip: true,
                        reset: true,
                        back:-1
                    }
                },
                prev: {
                    actionType: 'prev',
                    label: '上一步',
                    componentProperties: {
                        size: 'medium'
                    },
                    isLoadData: false,
                    actionHandle: data => {
                        this.active = 2
                        this.transActions.save.apiPromise = data => {
                            return transOrderUpdateApi(data)
                        }
                    }
                }
            },
            completeDetail: {}
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
        loadDetail(info) {
           
            this.active = 3
            completeOrderDetailApi(info).then(data => {
               
                this.completeDetail = data
                this.completeActions.save.apiPromise = completeOrderUpdateApi 
                this.orderLibraryId = this.completeDetail.orderLibraryId || info.orderLibraryId
                transOrderDetailApi(this.orderLibraryId).then(data => {
                    this.transDetail = data
                    this.transActions.save.apiPromise = transOrderUpdateApi 
                })
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

