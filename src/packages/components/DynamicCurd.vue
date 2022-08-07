<template>
    <curdLayout :mode="!isEmpty(options.treeOption)?'ltb':'tb'" class="relative" :scene="scene">
        <div v-if="!isEmpty(options.treeOption)"
             slot="left" class="tree-container scroll p10 border-main border-r4 grid-col-4 grid-col-xs-12 grid-col-pp-24"
        >
            <el-tree v-bind="options.treeOption" @node-click="treeClick" />
        </div>
        <DynamicSearchForm
            v-if="
                options.searchFields &&
                    options.searchFields.length &&
                    options.searchOption"
            slot="top"
            class="search-form "
            :fields="options.searchFields"
            :options="options.searchOption"

            @search="onSearch"
        />
        <section slot="bottom" class="table-section">
            <DynamicActions
                v-if="!isEmpty(options.topToolBar)" :class="scene=='page'?'mb24':'mb12'"
                :actions="options.topToolBar"
                :action-data="actionData"
                :action-bar-wraper="$parent.$el"
            />
            <component :is="options.tableUp.component" v-if="options.tableUp" v-bind="options.tableUp.properties" />
            <DynamicTable
                class="table-wraper "
                :data="options.data"
                :table="options.listOption"
                :columns="options.tableFields"
                :api-promise="loadListApiPromise"
                @selection-change="selectChange"
            />
            <el-pagination
                v-if="!isEmpty(options.pagination)"
                class="mt16 text-right"
                background
                v-bind="options.pagination"
                :total="total"
                :page-size.sync="pagination.pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </section>

    </curdLayout>
</template>
<script>
import {
    deepMerge,
    isEmpty
} from '../utils/tool'
import {
    buildSearchFields,
    buildTableFields
} from '../utils/fieldsConfigUtil'

import { generateDefaultValue } from '../utils/actionTools'
import presetConfig from '../presetConfig'

import actionPresetMixin from './actionPresetMixin'

export default {
    name: 'DynamicCurd',
    mixins: [actionPresetMixin],
    props: {
        // data: {
        //     type: [Object]
        // },
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

        mode: { type: String },
        apiPromises: {
            type: Object,
            default() {
                return {}
            }
        },
        formSections: {
            type: Object,
            default() {
                return {}
            }
        },
        entityLabel: String,
        componentId: String,
        scene: {
            type: String,
            default: 'component'   
        }
    },
    data: function() {
        return {
            isEmpty,
            searchParams: { refreshKey: '' },
            pagination: {
                pageNo: 1,
                pageSize: 10
            },
            total: 1,
            selected: []
        }
    },
    provide() {
        return {
            refreshComponentKey: this.componentId,
        }
    },
    computed: {
        options() {
            debugger
            const mode = this.mode || presetConfig.getConfig('defaultDialogMode') || 'dialog'
            const {
                createOptions,
                bulkdeleteOptions,
                updateOptions,
                detailOptions,
                deleteOptions
            } = this.generateActionOptions(mode)
            const searchFields = buildSearchFields(this.fields)
            const tableFields = buildTableFields(this.fields)

            const optionsOrigin = deepMerge(
                {
                    searchOption: presetConfig.getConfig('searchOption'),
                    // treeOption,
                    pagination: presetConfig.getConfig('pagination'),
                    topToolBar: {
                        create: createOptions,
                        bulkdelete: bulkdeleteOptions
                    },
                    searchFields,
                    tableFields,
                    listOption: {
                        // ...presetConfig.getConfig('tableOption'),
                        loadListApi: this.apiPromises.list,
                        lineActions: {
                            update: updateOptions,
                            detail: detailOptions,
                            delete: deleteOptions
                        }
                    }
                },
                this.optionsProps,
                true
            )

            return optionsOrigin
        },
        queryParams() {
            return { ...this.searchParams, ...this.pagination }
        },
        loadListApiPromise() {
            if (typeof this.options.listOption.loadListApi === 'function') {
                const queryParams = { ...this.queryParams }
                delete queryParams.refreshKey
                return this.options.listOption
                    .loadListApi(queryParams)
                    .then((data = {}) => {
                        debugger
                        data = data.data || data
                        this.total = data.total||data.totalCount
                        return data.list
                    })
            }
            return null
        },
        actionData() {
            return { selected: this.selected, queryParams: this.queryParams }
        }
    },
    created() {
        this.searchParams = {
            ...this.searchParams,
            ...generateDefaultValue(this.options.searchFields || [])
        }
        this.pagination.pageSize =
            this.options.pagination?.pageSize || this.pagination.pageSize
        debugger
        this.initRefreshEvent()
    },

    mounted() {},

    methods: {
        initRefreshEvent() {
            this.$dynamicBus.$off('dynamicRefresh')
            this.$dynamicBus.$on('dynamicRefresh', () => {
                this.refresh()
            })
            if (this.componentId) {
                this.$dynamicBus.$off('dynamicRefresh:' + this.componentId)
                this.$dynamicBus.$on('dynamicRefresh:' + this.componentId, () => {
                    this.refresh()
                })
            }
        },

        handleSizeChange(pageSize) {
            this.refresh()
        },
        handleCurrentChange(pageNo) {
            this.pagination.pageNo = pageNo
            this.onSearch({ pageNo })
        },

        treeClick(data, node) {
            this.onSearch({
                [this.options.treeOption.fieldName]:
                    data[this.options.treeOption['node-key']]
            })
        },
        onSearch(params) {
            this.searchParams = { ...this.searchParams, ...params }
        },
        refresh() {
            debugger
            const refreshKey = this.searchParams.refreshKey + 1
            this.onSearch({ refreshKey })
        },

        selectChange(selected) {
            this.selected = selected
        }
    }
}
</script>

<style lang="scss" scoped>

.border-main {
    border: 1px solid var(--main-color);
}
.curd-container {
    position: relative;
    .tree-container {
        height: 320px;
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
}

</style>
