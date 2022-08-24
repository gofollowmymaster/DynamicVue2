<template>
    <div class=" ">
        <DynamicPageWrapper :actions="{...pendingPageOptions.listOption.lineActions}" :api-promises="pendingApiPromises" entity-label="不动产管理">
            <LayoutTabs class="pt12 ">
                <DynamicCurd
                    class=""
                    :entity-label="entityLabel"
                    :fields="warningFields"
                    :options-props="pendingPageOptions"
                    :api-promises="pendingApiPromises"
                    scene="page"
                    mode="dialog"
                    label="待处理警告"
                    component-id="pending"
                />

                <DynamicCurd
                    class=""
                    scene="page"
                    mode="dialog"
                    :entity-label="entityLabel"
                    :fields="warningProcessedFields"
                    :options-props="processedPageOptions"
                    :api-promises="processedApiPromises"
                    label="已处理警告"
                    component-id="processed"
                />
            </LayoutTabs>
        </DynamicPageWrapper>
    </div>
</template>
<script>
import {
    warningUnhandleApi,
    warningHandleApi,
    warningDetailApi,
    warningPendingListApi,
    warningProcessedListApi,
    warningInfoDeleteApi,
    warningPendingDeleteApi
} from '@/api/assets.js'
import {
    eventFields,
    warningFields,
    handleFields,
    unhandleFields,
    warningProcessedFields
} from './warningFields'

const entityLabel = '告警信息'

export default {
    name: 'WarningManage',
    components: {},
    data() {
        return {
            entityLabel,
            // form字段
            warningFields,
            warningProcessedFields,
            // 页面配置
            pendingApiPromises: {
                bulkdelete: warningPendingDeleteApi,
                list: warningPendingListApi,
                detail: warningDetailApi
            },
            processedApiPromises: {
                list: warningProcessedListApi,
                detail: warningDetailApi,
                bulkdelete: warningInfoDeleteApi
            },

            pendingPageOptions: {
                topToolBar: null,
                listOption: {
                    lineActions: {
                        update: null,
                        atransToEvent: {
                            actionType: 'routerDialogFormAction',
                            label: '转事件',
                            sort: 0,
                            permission: '',
                            // container:'dy-page',
                            containerProperties: {
                                title: '转事件'
                                // width: '70%'
                            },
                            colNum: 2,

                            // props: formOption,
                            formItemList: this.$buildFormFields(eventFields),
                            formDataUpdateHandle(formVm, param) {},
                            saveAction: {
                                label: '转事件提交',
                                apiPromise: () => Promise.resolve()
                            }

                        },
                        handleForm: {
                            label: '处理',
                            actionType: 'dialogFormAction',
                            sort: 1,
                            permission: '',
                            dataAdapter: data => {
                                return { treeGiveAnAlarmId: data.id, treatmentMethod: 2 }
                            },
                            title: '现场处理',
                            containerProperties: {
                                width: '36%'
                            },

                            formItemList: this.$buildFormFields(handleFields),
                            colNum: 1,
                            saveAction: {
                                label: '处理',
                                apiPromise: warningHandleApi
                            }
                        },
                        
                        unhandleForm: {
                            label: '不予处理',
                            actionType: 'dialogFormAction',

                            sort: 1,
                            permission: '',
                            dataAdapter: data => {
                               
                                return { treeGiveAnAlarmId: data.id, treatmentMethod: 3 }
                            },
                            container: 'el-dialog',
                            containerProperties: {
                                title: '不予处理',
                                width: '36%'
                            },

                            colNum: 1,

                            formItemList: this.$buildFormFields(unhandleFields),
                            formDataUpdateHandle(formVm, param) {},
                            saveAction: {
                                label: '不予处理',
                                apiPromise: warningUnhandleApi
                            }
                        }
                      
                    }
                }
            },
            processedPageOptions: {
                topToolBar: null,
                listOption: {
                    lineActions: {
                        update: null
                    }
                }

            }
        }
    }
}
</script>
<style lang="css" scoped>
:deep .el-tabs__content {
    position: static;
}
:deep .el-tabs__header .el-tabs__nav {
    margin: 0 24px;
}
</style>
