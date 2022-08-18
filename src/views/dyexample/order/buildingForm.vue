<template>
    <main>
        <el-steps
            :active="active"
            process-status="process"
            class="mx24 my12"
            align-center simple
        >
            <el-step>
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
            <el-step title="运输中" />
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
                <buildingProgress v-if="orderLibraryId" class="full-width" :data="{id:orderLibraryId}" mode="textMode" />
            </template>
        </DynamicForm>
    </main>
</template>
<script>
import {
    planProjectUpdateApi,
    planProjectSaveApi,
    planProjectDetailApi,
    buildingProjectSaveApi,
    buildingProjectDetailApi,
    buildingProjectUpdateApi
} from '@/api/orderManage.js'
import planFields from './planFields.js'
import buildingFields from './buildingFields.js'
import buildingProgress  from './buildingProgress'

export default {
    name: 'BuildingForm',
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
                }}),
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
                    actionType: 'submitAction',
                    isShow(data) {
                        return !data.id
                    },
                    componentProperties: {
                        size: 'medium'
                    },
                    apiPromise: data => {
                       
                        data.orderLibraryId = this.orderLibraryId
                        return buildingProjectSaveApi(data)
                    }
                },
                update: {
                    actionType: 'submitAction',
                    isShow(data) {
                        return !!data.id
                    },
                    componentProperties: {
                        size: 'medium'
                    },
                    apiPromise: data => {
                        return buildingProjectUpdateApi(data)
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
            orderLibraryId: ''
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
            this.active = 1
            this.buildingActions.save.apiPromise = buildingProjectUpdateApi 
            this.planActions.save.apiPromise = planProjectUpdateApi
        
            buildingProjectDetailApi(data.id).then(data => {
                this.buildingDetail = data
            }).then(() => {
                this.orderLibraryId = this.buildingDetail.orderLibraryId
                planProjectDetailApi(this.orderLibraryId).then(data => {
                    this.planDetail = data
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

