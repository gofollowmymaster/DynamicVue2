<template>
    <section class="form-curd-wraper">
        <DynamicCurd
            ref="dynamicCurd"
            :options-props="curdOptions"
            v-bind="bindOptions"
            :api-promises="apiPromises"
            :component-id="item.key"
            mode="dialog"
        />
    </section>
</template>

<script>
import { deepMerge } from '../../utils/tool'
import FormMixin from './mixin'
const textModeCurdOptions = {
    searchOption: null,
    topToolBar: null,
    listOption: {
        properties: {
            border: false
        },
        lineActions: null,
        hasCheckbox: false
    },
    treeOption: null,
    pagination: null
}
const defaultCurdOptions = {
    searchOption: null,
    topToolBar: {
        bulkdelete: null,
        create: {
            componentProperties: {
                type: 'plain'
            },
            saveAction: {
                callback: {
                    showTip: false,
                    refresh: 'formCurd'
                }
            }
        }
    },
    listOption: {
        hasCheckbox: false,
        properties: {
            'header-cell-style': {
                'background-color': '#F5F5F5'
            }
        },

        lineActions: {
            detail: null,
            delete: {
                componentProperties: {
                    type: 'default',
                    size: 'small'
                },
                callback: {
                    showTip: false,
                    refresh: 'formCurd'
                }
            },
            update: {
                componentProperties: {
                    type: 'default',
                    size: 'small'
                },
                saveAction: {
                    callback: {
                        showTip: false,
                        refresh: 'formCurd'
                    }
                }
            }
        }
    },
    pagination: null,
    treeOption: null
}
export default {
    name: 'FormCurd',
    mixins: [FormMixin],
    data() {
        return {
            apiPromises: {
                update: this.tableUpdateApi,
                create: this.tableSaveApi,
                // detail: this.tableDetailApi,
                delete: this.tableDeleteApi,
                list: this.loadtableApi
            }
        }
    },
    computed: {
        curdOptions() {
            let defaultOptions = defaultCurdOptions

            if (this.isTextMode) {
                defaultOptions = textModeCurdOptions
                return deepMerge(this.item.options || {}, defaultOptions)
            }
            // defaultOptions.
            return deepMerge(defaultOptions, this.item.options)
        },
        val: {
            get() {
                return this.value || []
            },

            set(tableList) {
                this.$emit('input', tableList)

                this.formMethods.valueUpdateEvent({
                    [this.item.key]: tableList
                })
            }
        },
        localTableName() {
            return 'locaTable-' + this.item.key
        }
    },

    watch: {
        value: {
            handler(tableList) {
                let tableMap = {}
                if (!Array.isArray(tableList)) {
                    console.warn('FormCurd 表单组件期望值为Array类型，传入值为' + tableList)
                    return 
                }
                tableMap = tableList.reduce((prev, next) => {
                    prev[next.id] = next
                    return prev
                }, {})

                localStorage.setItem(this.localTableName, JSON.stringify(tableMap))
                this.$nextTick(() => {
                    this.$refs.dynamicCurd && this.$refs.dynamicCurd.refresh()
                })
            },
            immediate: true
        }
    },
    mounted() {},
    methods: {
        resetFields() {
            localStorage.removeItem(this.localTableName)
            this.$refs.dynamiCurd && this.$refs.dynamiCurd.refresh()
        },
        loadtableApi(params) {
            const { pageNo, pageSize } = params
            let tableList = localStorage.getItem(this.localTableName)
            if (!tableList) {
                tableList = '{}'
            }
            tableList = JSON.parse(tableList)
            const start = (pageNo - 1) * pageSize
            const end = start + pageSize
            return Promise.resolve().then(() => {
                return {
                    list: Object.values(tableList).slice(start, end),
                    totalCount: tableList.length
                }
            })
        },

        tableUpdateApi(data) {
            let tableList = localStorage.getItem(this.localTableName)
            if (!tableList) {
                tableList = '{}'
            }
            tableList = JSON.parse(tableList)
            tableList[data.id] = { ...tableList[data.id], ...data }
            this.val = Object.values(tableList)

            return Promise.resolve().then(() => ({}))
        },
        tableSaveApi(data) {
            debugger
            let tableList = localStorage.getItem(this.localTableName)
            if (!tableList) {
                tableList = '{}'
            }
            tableList = JSON.parse(tableList)
            const id = new Date().getTime()
            data.id = id
            tableList[id] = data
            this.val = Object.values(tableList)

            return Promise.resolve().then(() => ({}))
        },
        tableDetailApi(data) {
            const id = data.id
            let tableList = localStorage.getItem(this.localTableName)
            if (!tableList) {
                tableList = '{}'
            }
            tableList = JSON.parse(tableList)
            return Promise.resolve().then(() => tableList[id])
        },
        tableDeleteApi(data) {
            const id = data.id
            let tableList = localStorage.getItem(this.localTableName)
            if (!tableList) {
                tableList = '{}'
            }
            tableList = JSON.parse(tableList)
            delete tableList[id]
            this.val = Object.values(tableList)

            return Promise.resolve().then(() => ({}))
        }
    }
}
</script>

<style scoped lang="css">
.hz-low-code .dynamic-form .form-text-mode .el-form-item__content .form-item-box.form-curd-wraper {
 position: relative;
 top: 0px;
 transform: rotateY(0);
 padding-left: 0px;
}

  .hz-low-code .dynamic-form > .form-text-mode .el-form-item__content .hz-text-box {
padding-left: 0;
padding-bottom: 0;
    }
</style>
