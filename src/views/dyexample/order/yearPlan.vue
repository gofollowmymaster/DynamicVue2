<template>
    <DynamicCurdPage
        v-if="pageOptions"
        :entity-label="entityLabel"
        :fields="fields"
        :page-optionsprops="pageOptions"
        :api-promises="apiPromises"
    />
</template>
<script>
import {
    yearPlanListApi,
    yearPlanUpdateApi,
    // assetsDetailApi,
    // assetsListApi,
    // assetsDeleteApi,
    // assetsEditDetailApi,
    exportYearPlanApi
} from '@/api/orderManage.js'
 
import { fields, modifyFields } from './yearPlanFields.js'

const entityLabel = '年度建设计划监管'

export default {
    name: 'YearPlan',
    data() {
        return {
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                list: yearPlanListApi
            },
            pageOptions: {
                topToolBar: {
                    create: null,
                    bulkdelete: null,
                    export: {
                        apiPromise: exportYearPlanApi,
                        actionType: 'downloadAction',
                        label: '导出',
                        actionDataKey: 'queryParams'
                    }
                },
                listOption: {
                    properties: {
                        'show-summary': true,
                        'summary-method': function({ columns, data }) {
                 
                            const sums = []
                            columns.forEach((column, index) => {
                                if (index === 0) {
                                    sums[index] = '合计'
                                    return
                                }
                                const values = data.map(item => Number(item[column.property]))
                                if (['orderCode', 'orderName', 'orderAttributeDictLabel', 'orderTypeDictLabel'].includes(column.property)) {
                                    return sums[index] = '/'
                                } else if (!values.every(value => isNaN(value))) {
                                    sums[index] = values.reduce((prev, curr) => {
                                        const value = Number(curr)
                                        if (!isNaN(value)) {
                                            return prev + curr
                                        } else {
                                            return prev
                                        }
                                    }, 0).toFixed(2)
                                    // sums[index] += ' 元';
                                } else {
                                    sums[index] = '/'
                                }
                            })

                            return sums
                        }
                    },
                    actionColWidth: 120,
          
                    lineActions: {
                        detail: null,
                        update: null,
                        delete: null,
                        modify: {
                            label: '调整年度计划',
                            actionType: 'dialogFormAction',
                            permission: '调整年度计划',
                            containerProperties: {
                                title: '调整年度计划',
                                width: '480px'
                            },
                            colNum: 1,       
                            formItemList: this.$buildFormFields(modifyFields),
                            'label-width': '140px',
                            saveAction: {
                                apiPromise: yearPlanUpdateApi
                            }
          
                        }
                    }
                }
        
            }
        }
    }
}
</script>

