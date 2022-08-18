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
                    <span @click="switchStep(0)">计划</span>
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
        </DynamicForm>
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
    planProjectUpdateApi,
    planProjectSaveApi,
    planProjectDetailApi,
    buildingProjectSaveApi,
    buildingProjectDetailApi,
    buildingProjectUpdateApi,
    transProjectSaveApi,
    transProjectDetailApi,
    transProjectUpdateApi,
    completeProjectSaveApi,
    completeProjectUpdateApi,
    completeProjectDetailApi
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
                    apiPromise: planProjectSaveApi,
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
                    isShow(data) {
                       
                        return !data.id
                    },
                    componentProperties: {
                        size: 'medium'
                    },
                    apiPromise: data => {
                       
                        console.log('----this.orderLibraryId---', this.orderLibraryId)
                        if (!this.orderLibraryId) {
                            console.error('没有orderLibraryId ')
                            return 
                        }
                        data.orderLibraryId = this.orderLibraryId   
                        return buildingProjectSaveApi(data)
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
                update: {
                    actionType: 'submitActionOption',
                    label: '下一步',
                    isShow(data) {
                       
                        return !!data.id
                    },
                    componentProperties: {
                        size: 'medium'
                    },
                    apiPromise: data => {
                       
                        if (!this.orderLibraryId) {
                            console.error('没有orderLibraryId ')
                            return 
                        }
                        // data.id=this.orderLibraryId
                        return buildingProjectUpdateApi(data)
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
                    actionType: '',
                    isLoadData: false,
                    actionHandle: data => {
                        this.active = 0
                        this.planActions.save.apiPromise = data => {

                            return planProjectUpdateApi(data)
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
                        console.log('----this.orderLibraryId---', this.orderLibraryId)
                        if (!this.orderLibraryId) {
                            console.error('没有orderLibraryId ')
                            return 
                        }
                        return transProjectSaveApi(data)
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
                update: {
                    actionType: 'submitActionOption',
                    label: '下一步',
                    isShow(data) {
                       
                        return !!data.id
                    },
                    componentProperties: {
                        size: 'medium'
                    },
                    apiPromise: data => {
                       
                        console.log('----this.orderLibraryId---', this.orderLibraryId)
                        if (!this.orderLibraryId) {
                            console.error('没有orderLibraryId ')
                            return 
                        }
                        return transProjectSaveApi(data)
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
                    actionType: '',
                    isLoadData: false,
                    actionHandle: data => {
                        this.active = 1
                        this.buildingActions.save.apiPromise = data => {

                            return buildingProjectUpdateApi(data)
                        }
                    }
                }
            },
            transDetail: {},
            completeFormItemList: this.$buildFormFields(completeFields),
            completeActions: {
        
                save: {
                    actionType: 'submitActionOption',
                    apiPromise: completeProjectSaveApi,
                    label: '保存',
                    componentProperties: {
                        size: 'medium'
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
                        reset: false
                    }
                },
                prev: {
                    actionType: 'prev',
                    label: '上一步',
                    componentProperties: {
                        size: 'medium'
                    },
                    actionType: '',
                    isLoadData: false,
                    actionHandle: data => {
                        this.active = 2
                        this.transActions.save.apiPromise = data => {
                            return transProjectUpdateApi(data)
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
            completeProjectDetailApi(info).then(data => {
               
                this.completeDetail = data
                this.completeActions.save.apiPromise = completeProjectUpdateApi 
                this.orderLibraryId = this.completeDetail.orderLibraryId || info.orderLibraryId
                transProjectDetailApi(this.orderLibraryId).then(data => {
                    this.transDetail = data
                    this.transActions.save.apiPromise = transProjectUpdateApi 
                })
                planProjectDetailApi(this.orderLibraryId).then(data => {
                    this.planDetail = data
                    this.planActions.save.apiPromise = planProjectUpdateApi
                })
                buildingProjectDetailApi(this.orderLibraryId).then(data => {
                    this.buildingDetail = data
                    this.buildingActions.save.apiPromise = buildingProjectUpdateApi
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

