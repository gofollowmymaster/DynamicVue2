<template>
    <main>
        <el-steps simple
                  :active="active"
                  process-status="process"
                  class="mx24 my12"
                  align-center
        >
            <el-step title="计划" @click="active = 0" />
            <el-step title="处理中" />
            <el-step title="运输中" />
            <el-step title="完成" />
        </el-steps>
        <DynamicForm
            class="relative"
            :form-option="formOption"
            :form-item-list="formItemList"
            :actions="actions"
            :data="planDetail"
        />
    </main>
</template>
<script>
import {
    planOrderUpdateApi,
    planOrderSaveApi,
    planOrderDetailApi
} from '@/api/orderManage.js'
import fields from './planFields.js'

export default {
    name: 'PlanForm',
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
            formItemList: this.$buildFormFields(fields),
            actions: {
                save: {
                    apiPromise: planOrderSaveApi,
                    actionType: 'submitAction',
                    componentProperties: {
                        size: 'medium'
                    },
                    label: '保存'
                }
            },
            planDetail: {}
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
            planOrderDetailApi(data.id).then(data => {
           
                this.planDetail = data
                this.actions.save.apiPromise = planOrderUpdateApi
            })
        }
    }
}
</script>

