<template>
    <div class=" hz-low-code  ">
        <DynamicPageWrapper
            class="flex1"
            :actions="{ ...topToolBar, ...tableOption.lineActions }"
            entity-label="不动产管理"
        >
            <dyBrandBar>
                <span slot="title">不动产管理</span>
            </dyBrandBar>
            <curdLayout mode="tb" scene="page">
                <DynamicSearchForm
                    slot="top"
                    :fields="searchFields"
                    @search="onSearch"
                />
                <section slot="bottom">
                    <DynamicActions
                        :actions="topToolBar"
                        :action-data="selected"
                        :action-bar-wraper="$el"
                    />
                    <section class="grid-wrap mt24 full-width">
                        <section class="flex flex-direction" :class="['grid-col-24']">
                            <DynamicTable
                                class="table-wraper flex1"
                                :table="tableOption"
                                :columns="tableFields"
                                :api-promise="loadListApi"
                                @selection-change="selectChange"
                            />
                            <el-pagination
                                class="mt24 text-right"
                                background
                                v-bind="pagination"
                                :total="total"
                                :page-size.sync="pagination.pageSize"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                            />
                        </section>
                    </section>
                </section>
            </curdLayout>
        </DynamicPageWrapper>
 
    </div>
</template>
<script>
import {
    buildFormFields,
    buildTableFields,
    buildSearchFields
} from '@/packages/utils/fieldsConfigUtil'
import {
    treeStreetUpdateApi,
    treeStreetSaveApi,
    treeStreetListApi,
    treeStreetDetailApi,
    treeStreetDeleteApi
} from '@/api/assets.js'
import fields from './fixedAssetsFields'
import {formSections} from './fixedAssetsFields'

const formFields = buildFormFields(fields,formSections)
const searchFields = buildSearchFields(fields)
const tableFields = buildTableFields(fields)

export default {
    name: 'StreetTree',
    data: function() {
        return {
            fields,
            apiPromises: {
                save: treeStreetSaveApi
            },
            searchFields,
            topToolBar: {
                create: {
                    isLoadData: false,
                    label: '新增',
                    actionType: 'routerDialogFormAction',
                    componentProperties: {
                        icon: 'el-icon-plus',
                        type: 'primary'
                    },
                    container: 'dy-page',
                    containerProperties: {
                        title: '新增不动产'
                    },
                    formItemList: formFields,
                    saveAction: {
                        actionType: 'submit',
                        label: '保存',
                        apiPromise: treeStreetSaveApi
                    }
                },

                bulkdelete: {
                    label: '批量删除',
                    actionType: 'requestApiAction',
                    apiPromise: treeStreetDeleteApi,
                     msgBox:this.$dynamicConfig['msgBoxTipOptions']
                }
            },
            tableOption:  {
                loadListApi: treeStreetListApi,
                'current-change': 'handleCurrentChange', // 事件 暂不支持
                lineActions: {
                    update: {
                        label: '编辑',
                        actionType: 'routerDialogFormAction',
                        apiPromise: treeStreetDetailApi,
                        container: 'dy-page',
                        containerProperties: {
                            title: '更新不动产'
                        },
                        colNum: 3,
                        formItemList: formFields,
                        saveAction: {
                            apiPromise: treeStreetUpdateApi
                        }
                    },
                    detail: {
                        label: '查看',
                        actionType: 'routerDialogFormAction',
                        container: 'dy-page',
                        apiPromise: treeStreetDetailApi,
                        containerProperties: {
                            title: '查看不动产',
                            width: '60%'
                        },
                        borderForm: false,
                        textMode: true,
                        'label-position': 'right',
                        // 'label-width': '140px'
                        formItemList: formFields
                    },
                    delete: {
                        label: '删除',
                        actionType: 'requestApiAction',
                        componentProperties: {
                            class: ['text-grey-dark2']
                        },
                        apiPromise: treeStreetDeleteApi,
                        msgBox:this.$dynamicConfig['msgBoxTipOptions']
                    }
                }
            },
            tableFields,
            pagination: { ...this.$dynamicConfig['pagination'], pageNo: 1 },

            searchParams: { refreshKey: '' },
            selected: [],
            total: 1,
       
        }
    },

    computed: {
        queryParams() {
            return { ...this.searchParams, pageNo: this.pagination.pageNo, pageSize: this.pagination.pageSize }
        },
        loadListApi() {
            return this.tableOption.loadListApi(this.queryParams).then(data => {
                data = data.data || data
                this.total = data.totalCount
                return data.list
            })
        }
    },
    created() {},
    mounted() {
        this.$dynamicBus.$on('dynamicRefresh', () => {
            this.refresh()
        })
    },

    methods: {
        refresh() {
            const refreshKey = this.searchParams.refreshKey + 1
            this.onSearch({ refreshKey })
        },
        handleSizeChange(pageSize) {
            this.refresh()
        },
        handleCurrentChange(pageNo) {
            this.pagination.pageNo = pageNo
            this.onSearch({ pageNo })
        },

        onSearch(params) {
            this.searchParams = { ...this.searchParams, ...params }
        },

        selectChange(selected) {
           
            this.selected = selected
        }
    }
}
</script>

<style lang="css" scoped>
.BackStageFrameWork {
    height: 100%;
    padding: 20px;
}
.table-wraper {
    height: 540px;
}
.tree-section {
    border: 1px solid grey;
}
</style>
