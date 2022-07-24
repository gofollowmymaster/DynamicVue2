<template>
    <div>
        <DynamicTable
            class="table-wraper "
            :data="tableData"
            :table="tableOption"
            :columns="editableColumns"
            :api-promise="loadListApiPromise"
            @selection-change="selectChange"
        />
        <el-pagination
            v-if="!isObjEmpty(pagination)"
            class="mt16  text-right"
            background
            v-bind="pagination"
            :total="total"
            :page-size.sync="pagination.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import { deepMerge, isObjEmpty } from '../../utils/tool'
import presetConfig from '../../presetConfig'

const defaultTableOptions = {
    ...presetConfig.getConfig('tableOption'),
    hasCheckbox: false,
    properties: {
        'header-cell-style': {
            'background-color': '#F5F5F5'
        }
    },

    lineActions: {}
}
export default {
    name: 'TableEditable',
    props: {
        data: {
            type: [Array]
        },
        columns: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        table: {
            type: Object,
            require: true
        },

        apiPromise: {
            type: Promise
        },
        pagination: {
            type: Object,
            default() {
                return {}
            }
        },
        size: {
            type: String,
            default: 'small'
        },
        isTextMode: Boolean

    },
    data() {
        return {
            isObjEmpty,
            total: 10,
            editable: false,
            tableData: []
        }
    },
    computed: {
        tableOption() {
            const defaultOptions = defaultTableOptions

            if (this.isTextMode) {
                defaultOptions.lineActions = {}

                return deepMerge(defaultOptions, this.table || {})
            }

            defaultOptions.lineActions = {
                update: {
                    actionType: 'customAction',
                    label: '编辑',
                    isShow(actionData) {
                        debugger
                        return !actionData.editable
                    },
                    actionHandle: actionData => {
                        debugger
                        this.$set(actionData, 'editable', true)
                    }

                },
                confirm: {
                    actionType: 'customAction',
                    label: '确认',

                    isShow(actionData) {
                        debugger
                        return !!actionData.editable
                    },
                    actionHandle: actionData => {
                        debugger
                        this.$set(actionData, 'editable', false)
                    }

                },
                add: {
                    actionType: 'customAction',
                    label: '添加',

                    actionHandle: actionData => {
                        const index = this.tableData.findIndex(item => {
                            return item === actionData
                        })
                        const initValue = this.columns.reduce((prev, next) => {
                            prev[next.key] = next.defaultValue || null
                            return prev
                        }, {})
                        initValue.editable = true
                        this.tableData.splice(index + 1, 0, initValue)
                        // this.$set(this.tableData,index+1,initValue)
                    }

                },
                delete: {
                    actionType: 'customAction',
                    label: '删除',
                    actionHandle: actionData => {
                        debugger
                        console.log('-tableData-', this.tableData)
                        const index = this.tableData.findIndex(item => {
                            return item === actionData
                        })
                        this.$delete(this.tableData, index)
                    },
                    componentProperties: {
                        type: 'default',
                        size: 'small'
                    },
                    callback: {
                        showTip: false
                    }
                }
            }
            // defaultOptions.
            return deepMerge(defaultOptions, this.table)
        },
        editableColumns() {
            return this.$buildTableFields(this.columns, true)
        },
        // tableFormFields(){
        //   this.$buildTableFields(this.columns)
        // },
        queryParams() {
            return { ...this.searchParams, ...this.pagination }
        },
        loadListApiPromise() {
            if (typeof this.apiPromise === 'function') {
                const queryParams = { ...this.queryParams }
                delete queryParams.refreshKey
                return this.apiPromise(queryParams)
                    .then((data = {}) => {
                        debugger
                        data = data.data || data
                        this.total = data.totalCount
                        return data.list
                    })
            }
            return null
        }

    },

    watch: {
        data: {
            handler(data) {
                this.tableData = data
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {},
    methods: {

        selectChange(selected) {
            this.selected = selected
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
        refresh() {
            debugger
            const refreshKey = this.searchParams.refreshKey + 1
            this.onSearch({ refreshKey })
        }
    }
}
</script>

<style scoped lang="less">
/deep/ .el-input__inner {
    height: ;
}
</style>
