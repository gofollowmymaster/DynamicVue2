<template>
    <el-dialog
        :title="title"
        :visible.sync="visible.value"
        v-bind="$attrs"
        :show-close="true"
        :close-on-click-modal="true"
        :close-on-click-escape="false"
        :append-to-body="true"
        :modal-append-to-body="true"
        :destroy-on-close="true"
        class="hz-low-code"
    >
        <DynamicSearchForm
            v-if="options.searchFields && options.searchFields.length"
            :fields="options.searchFields"
            :options="options.searchOption"
            @search="onSearch"
        />
        <section  class="flex flex-direction " >
            <DynamicTable
                class="table-wraper flex1"
                :table="options.listOption"
                :columns="options.tableFields"
                :api-promise="loadListApiPromise"
                :selected="selectItems"
                @select-all="selectAll"
                @selection-change="selectChange"
                @select="select"
            />
            <el-pagination
                class="mt16"
                background
                v-bind="options.pagination"
                :total="total"
                :page-size.sync="pagination.pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </section>
        <span slot="footer" class="dialog-footer">
            <el-button @click="clear">清 除</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {
    isEmpty, deepMerge
} from '../../utils/tool'
import {
    buildSearchFields,
    buildTableFields
} from '../../utils/fieldsConfigUtil'

import presetConfig from '../../presetConfig'
export default {
    name: 'TableSelector',
    props: {
        title: String,
        visible: {
            type: Object,
            default() {
                return { value: false }
            }
        },
        fields: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        optionsProps: {
            type: Object,
            require: true
        },
        selected: {
            type: Object,
            default() {
                return {}
            }
        },
        multiple: {
            type: Boolean,
            default: false
        }

    },

    data: function() {
        console.log('--optionsProps--', this.optionsProps)

        return {
            isEmpty,
            searchParams: { refreshKey: '' },
            pagination: {
                pageNo: 1,
                pageSize: pagination.pageSize
            },
            total: 1,
            selectItems: {}

        }
    },

    computed: {
        options() {
            const searchFields = buildSearchFields(this.fields)
            const tableFields = buildTableFields(this.fields)
            // tableOption.properties['row-key'] = 'id'
            return deepMerge({
                searchOption: { ...presetConfig.getConfig('searchOption') },
                pagination: presetConfig.getConfig('pagination'),
                searchFields,
                tableFields,
                listOption: presetConfig.getConfig('tableOption')
            }, this.optionsProps, true)
        },
        queryParams() {
            return { ...this.searchParams, ...this.pagination }
        },
        loadListApiPromise() {
            return this.options.tableOption
                .loadListApi(this.queryParams)
                .then((data = {}) => {
                    data = data.data || data
                    this.total = data.totalCount
                    this.tableData = data.list
                    return data.list
                })
        }

    },
    watch: {
        selected: {
            handler(selected) {
                this.selectItems = selected
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.pagination.pageSize =
            this.options.pagination.pageSize || this.pagination.pageSize
    },

    methods: {
        confirm() {
            if (Object.values(this.selectItems)?.length < 1) {
                this.$alert('您还没有选择任何要素', '', {
                    confirmButtonText: '确定',
                    showCancelButton: true,
                    callback: action => {
                        if (action === 'confirm') {
                            this.visible.value = false
                        }
                    }
                })
                return
            }
            this.visible.value = false
            this.$emit('change', this.selectItems)
        },
        clear() {
            this.selectItems = {}
            this.$emit('change', {})
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
            const refreshKey = this.searchParams.refreshKey + 1
            this.onSearch({ refreshKey })
        },

        select(data, row) {
            debugger
            const mainKey = this.options.tableOption.properties['row-key'] || 'id'
            if (this.multiple) {
                if (this.selectItems[row[mainKey]]?.[mainKey]) {
                    delete this.selectItems[row[mainKey]]
                    return
                }
                this.selectItems[row[mainKey]] = row
                return
            }
            // 单选
            this.selectItems = {
                [row[mainKey]]: row
            }
        },
        selectChange(selected) {
            debugger
        },
        selectAll(data) {
            const mainKey = this.options.tableOption.properties['row-key'] || 'id'
            if (!this.multiple) {
                const curSelected = this.selectItems
                this.selectItems = {}
                this.$nextTick(() => {
                    this.selectItems = curSelected
                })
                return
            }
            if (data.length) {
                data.forEach(row => {
                    this.selectItems[row[mainKey]] = row
                })
            } else {
                this.tableData.forEach(row => {
                    delete this.selectItems[row[mainKey]]
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.table-wraper {
    height: 540px;
}
.border-grey {
    border: 1px solid var(--grey);
}
.scroll {
    overflow: auto;
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #efefef;
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #bbb;
    }
    ::-webkit-scrollbar-corner {
        background: #efefef;
    }
}
</style>
