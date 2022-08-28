<template>
    <DynamicCurd
        class="full-width building-progress"
        :entity-label="entityLabel"
        :fields="fields"
        :options-props="pageOptions"
        :api-promises="apiPromises"
        :data="data"
    />
</template>
<script>
import {
    orderProgressListApi,
    orderProgressUpdateApi
} from '@/api/orderManage.js'
import fields from './progressFields.js'

const entityLabel = '订单进度'

export default {
    name: 'BuildingProgress',
    props: {
        data: {
            type: [Object, String, Number]
        },
        mode: String
    },
    data() {
       
        return {
            entityLabel,
            // form字段
            fields,
            // 页面配置
            apiPromises: {
                update: orderProgressUpdateApi,
                list: params => {
                   
                    params.orderLibraryId = this.data.id
                    return orderProgressListApi(params)
                }
            },
            pageOptions: {
                searchOption: this.mode === 'textMode'
                    ? null
                    : {
                        trigger: 'change',
                        resetable: false
                    },
                topToolBar: null,
                listOption: {
                    hasCheckbox: false,
                    properties: {
                        border: this.mode !== 'textMode'
                    },
                    lineActions: this.mode === 'textMode'
                        ? null
                        : {
                            update: {
                                label: '填报',
                                isShow: data => {
                                    return data.isShow
                                },
                                dialog: {
                                    container: 'el-dialog',
                                    properties: {
                                        title: '填报订单进度',
                                        width: '36%'
                                    }}
                            },
                            detail: null,
                            delete: null
             
                        }
                },
            }
        }
    }
}
</script>
<style lang="css"  >
.building-progress .el-form-item__content .form-item-box {
    width: 100%;
}
</style>
