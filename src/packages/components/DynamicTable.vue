<template>
    <main class="dynamic-table-container">
        <el-table
            v-bind="tableOption.properties"
            ref="table"
            :data="tableData"
            :class="{'table-center':tableOption.properties['header-align']=='center'}"
            v-on="$listeners"
        >
            <template v-for="col in columnsComputed">
                <el-table-column
                    v-if="col.type == 'index'"
                    :key="col.key"
                    v-bind="{ ...col.colProperties }"
                    type="index"
                    :index="indexHandle"
                />
                <el-table-column
                    v-else-if="col.type == 'selection'"
                    v-bind="{ ...col.colProperties }"
                    :key="col.key"
                    type="selection"
                    :reserve-selection="tableOption.properties['row-key']?true:false"
                />
                <el-table-column
                    v-else-if="col.type == 'lineActions'"
                    v-bind="{ ...tableOption.colOptions, ...col.colProperties }"
                    :key="col.key"
                >
                    <template slot-scope="scope">
                        <DynamicActions
                            :actions="col.actions"
                            :action-data="scope.row"
                            :action-bar-wraper="$parent.$el"
                            mode="table"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    v-bind="{ ...tableOption.colOptions, ...col.colProperties }"
                    :key="col.key"
                    :prop="col.key"
                >
                    <template v-if="col.labelTip" #header>
                        <LabelWithTip :label="col.label" :tip="col.labelTip" />
                    </template>
                    <template slot-scope="scope">
                        <ColFormItem v-if="scope.row.editable" :row-data="scope.row" :col-options="col" />
                        <component :is="tableColComponent(col,scope.row)"
                                   v-else
                                   :row-data="scope.row"
                                   :col-options="col"
                                   :style="col.style || {}"
                                   :class="`form-unqiue-${col.key}`"
                                   class="table-col-box"
                        />
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </main>
</template>
<script>
import { deepCopy,  } from '../utils/tool'
import {  loadPresetConfig } from '../presetConfig'


export default {
    name: 'DanamicTable',
    components: {},
    props: {
        data: {
            type: Array,
            default: function() {
                return []
            }
        },
        columns: {
            type: Array,
            default: function() {
                return []
            }
        },
        table: {
            type: Object,
            default: function() {
                return loadPresetConfig('tableOption')
            }
        },

        apiPromise: {
            type: Promise,
            default: function() {
                return null
            }
        },
        editable: {
            type: Boolean,
            default: false
        },
        selected: {
            type: [Object],
            default() {
                return {}
            }
        }
    },
    data: function() {
        return {
            tableData: []
        }
    },
    computed: {
        tableOption() {
            return this.$appendToPreset('tableOption', this.table)
        },
        columnsComputed() {
            const columns = this.columns.map((item, index) => {
                return {
                    ...item,
                    colProperties: {
                        ...item.colProperties,
                        label: item.label
                    }
                }
            })
            if (this.tableOption.indexCol) {
                columns.unshift({
                    key: 'index',
                    type: 'index',
                    colProperties: {
                        'class-name': 'index-col',
                        ...this.tableOption.indexCol
                    }
                })
            }
            if (this.tableOption.hasCheckbox) {
                columns.unshift({
                    key: 'selection',
                    type: 'selection',
                    colProperties: {
                        width: 48,
                        fixed: 'left'
                    }
                })
            }
            //
            const actionNum = this.tableOption.lineActions ? Object.keys(this.tableOption.lineActions).length : 0

            if (actionNum > 0) {
                const lineActions = deepCopy(this.tableOption.lineActions)

                for (const key in lineActions) {
                    const action = lineActions[key]
                    action.componentProperties = { ...action.componentProperties, type: this.tableOption.actionBtnType }
                    lineActions[key] = this.$generateActionOption(action.actionType, action)
                }

                columns.push({
                    type: 'lineActions',
                    key: 'lineActions',
                    colProperties: {
                        width: this.tableOption.actionColWidth || (actionNum * 60),
                        label: '操作',
                        fixed: 'right'
                    },
                    actions: lineActions // 引用在map中被修改
                })
            }

            return columns
        }
    },
    watch: {
        apiPromise: {
            handler(api) {
                if (api instanceof Promise) {
                    api.then(dataList => {
                        this.tableData = dataList
                    })
                }
            },
            deep: true,
            immediate: true
        },
        tableData: {
            handler(tableData) {
                this.$nextTick(() => {
                    debugger
                    this.$refs.table && this.$refs.table.doLayout()
                    this.$forceUpdate()

                    this.selectRefresh()
                })
            },
            deep: true
            // immediate: true
        },
        selected: {
            handler(selected) {
                this.selectRefresh(selected)
            },
            deep: true,
            immediate: true

        },
        data: {
            handler(data) {
                debugger
                if (data) {

                    this.tableData = data
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {},
    methods: {
        tableColComponent(col, data) {
            if (col.component) {
                return col.component
            } else {
                return 'ColTeml'
            }
        },
        selectRefresh() {
            this.$nextTick(() => {
                const mainKey = this.tableOption.properties['row-key']
                if (!mainKey) return
                this.tableData.forEach(row => {
                    if (this.selected[row[mainKey]]) {
                        this.$refs.table.toggleRowSelection(row, true)
                        return
                    }
                    this.$refs.table.toggleRowSelection(row, false)
                })
            })
        },
        indexHandle(index) {
            return index + 1
        }
    }
}
</script>

<style lang="css"  >
.dynamic-table-container ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

</style>
