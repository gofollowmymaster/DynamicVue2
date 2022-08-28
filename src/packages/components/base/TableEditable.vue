<template>
    <div>
        <section class="relative">
            <DynamicTable
                class="table-wraper "
                :data="tableData"
                :table="tableOption"
                :columns="editableColumns"
                :api-promise="loadListApiPromise"
                @selection-change="selectChange"
            />
            <el-button v-if="tableData.length<1&&!isTextMode" class="center-btn" type="text" size="medium" icon="el-icon-plus" @click="addfirstData"></el-button>
        </section>

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

const defaultTableOptions = deepMerge(presetConfig,{
    hasCheckbox: false,
    properties: {

        'header-cell-style': {
            'background-color': '#F5F5F5'
        }
    },

    lineActions: {}
},true)
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
            let defaultOptions = defaultTableOptions

            if (this.isTextMode) {
                defaultOptions.lineActions = {}

                return deepMerge(defaultOptions, this.table || {})
            }
            defaultOptions= deepMerge(defaultOptions, this.table)
            // const 

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
                          const index = this.tableData.findIndex(item => {
                            return item.dyTbid=== actionData.dyTbid
                        })
                        this.$set(this.tableData[index], 'editable', true)
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
                        const index = this.tableData.findIndex(item => {
                            return item.dyTbid=== actionData.dyTbid
                        })
                        this.$set(this.tableData[index], 'editable', false)
                    }

                },
                add: {
                    actionType: 'customAction',
                    label: '添加',

                    actionHandle: actionData => {
                        const index = this.tableData.findIndex(item => {
                            return item.dyTbid=== actionData.dyTbid
                        })

                        const initValue=this.generateData()

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
                            return item.dyTbid === actionData.dyTbid
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

            return defaultOptions
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
                        this.total = data.total || data.totalCount
                        return data.list
                    })
            }
            return null
        }

    },

    watch: {
        data: {
            handler(data) {
                this.tableData = data.map(item=>{
                    item.dyTbid= Math.floor(Math.random()*100000)
                    return item
                })
            },
            deep: false,
            immediate: true
        }
    },
    mounted() {},
    methods: {
        addfirstData(){
            const initValue = this.generateData()
            this.tableData.splice(1, 0, initValue)
        },
        generateData(){
            const initValue = this.columns.reduce((prev, next) => {
                prev[next.key] = next.defaultValue || null
                return prev
            }, {})
            initValue.editable = true
            initValue.dyTbid = new Date().getTime() 
            return initValue
        },
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
<style lang="css" scoped>
.center-btn{
    position: absolute;
    top: calc(50% + 20px);
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    width: 200px;
}
</style>
 
