<template>
    <el-dialog
        ref="dialogRef"
        :visible="visible"
        :fullscreen="fullScreen"
        :close-on-click-modal="false"
        :width="width || '600px'"
        :custom-class="'tree_select_dialog'"
        :modal="shadow ? true : false"
        :destroy-on-close="true"
        :append-to-body="true"
        @close="cancel"
    >
        <div slot="title" class="head_title">{{ title }}</div>
        <!-- 搜索框 -->
        <div class="search-container">
            <el-input
                v-model.trim="queryKeyword"
                placeholder="请输入关键字"
                clearable
                :size="'small'"
                :style="{width: '320px'}"
                :suffix-icon="'el-icon-search'"
                @keyup.native.enter="handleSearch"
                @clear="handleSearch"
            />
        </div>
        <!-- 搜索数据 -->
        <div class="action-container">
            <div v-infinite-scroll="loadListInfo" class="action-container-left scroll" :infinite-scroll-disabled="scrollDisabled" :infinite-scroll-immediate="false">
                <el-checkbox-group v-if="type === 'checkbox'" v-model="currentCheckboxKeys" class="custom-checkbox-group">
                    <div v-for="(item, i) in listDatas" :key="i" class="list-item">
                        <el-checkbox :key="item[listNodeKey]" :value="item.checked" :label="item[listNodeKey]" @change="(value) => { onCheckBoxChange(value, item) }" />
                        <span class="item-label">{{ item.roleName }}</span>
                    </div>
                </el-checkbox-group>
                <el-radio-group v-if="type === 'radio'" v-model="currentRadioKey" class="custom-radio-group">
                    <div v-for="(item, i) in listDatas" :key="i" class="list-item">
                        <el-radio :key="item[listNodeKey]" :label="item[listNodeKey]" />
                        <span class="item-label">{{ item.roleName }}</span>
                    </div>
                </el-radio-group>
            </div>
            <!-- <div class="action-container-left scroll infinite-list" v-infinite-scroll="listDatas">
        <div v-for="item in listDatas" :key="item[listNodeKey]">{{item.roleName}}</div>
      </div> -->
            <div v-if="type == 'checkbox'" class="action-container-right">
                <div class="selected-title-container">
                    <el-checkbox v-model="isSelectedAll" @change="onSelectAllChange" />
                    <span style="margin-left: 8px;">已选</span>
                </div>
                <div class="selected-tree-container scroll">
                    <el-checkbox-group v-model="selectedKeys" class="custom-checkbox-group" @change="onSelectAllGroupChange">
                        <div v-for="(item, i) in currentCheckboxNodes" :key="i" class="list-item">
                            <el-checkbox :key="item[listNodeKey]" :label="item[listNodeKey]" />
                            <span class="item-label">{{ item.roleName }}</span>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <footer class="footer-container">
            <div class="flex1" />
            <div>
                <el-button size="small" @click="cancel">取消</el-button>
                <el-button size="small" type="primary" @click="ok">确定</el-button>
            </div>
        </footer>
    </el-dialog>
</template>
<script>

export default {
    name: 'BaseListSelect',
    props: {
        // ***** tree相关配置-开始 *****
        type: {
            // 类型，radio/checkbox
            type: String,
            default: 'checkbox'
        },
        listNodeKey: { type: String, default: 'id' },
        defaultCheckedList: {
            type: Array,
            default: () => { return [] }
        },
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '树形选择'
        },
        width: {
            type: String,
            default: '600px'
        },
        shadow: {
            type: Boolean,
            default: false
        },
        fullScreen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            queryKeyword: '',
            // 当前分页信息
            pageInfo: {
                pageNo: 1,
                pageSize: 10,
                total: 0,
                totalPage: 1
            },
            scrollDisabled: false,
            // 单选
            currentRadioKey: '',
            // 多选
            currentCheckboxKeys: [],
            selectedKeys: [],
            currentCheckboxNodes: [],
            // 列表数据
            listDatas: [],
            // 是否选中全部
            isSelectedAll: false
        }
    },
    computed: {
    },
    watch: {
        visible: {
            handler(boolean) {
                // 清空搜索框
                this.queryKeyword = ''
                this.listDatas = []
                // 当前全选状态
                this.isSelectedAll = this.defaultCheckedList.length !== 0
                if (this.type == 'radio') {
                    this.currentRadioKey = this.defaultCheckedList.length === 0 ? '' : this.defaultCheckedList[0][this.listNodeKey]
                } else {
                    this.currentCheckboxKeys = (this.defaultCheckedList || []).map(item => item[this.listNodeKey])
                    this.selectedKeys = [ ...this.currentCheckboxKeys ]
                    this.currentCheckboxNodes = [ ...this.defaultCheckedList ]
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        ok() {
            if (this.type === 'radio') {
                const selectedNodes = this.listDatas.filter(item => { return item[this.listNodeKey] === this.currentRadioKey })
                if (selectedNodes.length) {
                    this.$emit('ok', selectedNodes, {})
                } else {
                    this.$message({ type: 'warning', message: '请至少选择一项' })
                }
            } else {
                // 获取选中的数据
                const checkedNodes = this.currentCheckboxNodes.filter(node => { return this.selectedKeys.includes(node[this.listNodeKey]) })
                if (checkedNodes.length) {
                    this.$emit('ok', checkedNodes, {
                        checked: checkedNodes,
                        halfChecked: this.treeCheckedNodes || []
                    })
                } else {
                    this.$message({ type: 'warning', message: '请至少选择一项' })
                }
            }
        },
        onCheckBoxChange(value, node) {
            if (value) {
                // 选中状态
                this.currentCheckboxNodes.push(node)
                this.$nextTick(() => {
                    this.selectedKeys.push(node[this.listNodeKey])
                    this.isSelectedAll = this.selectedKeys.length == this.currentCheckboxNodes.length
                })
            } else {
                const arr = this.currentCheckboxNodes.filter(item => { return item[this.listNodeKey] != node[this.listNodeKey] })
                this.currentCheckboxNodes = [ ...arr ]
                const index = this.selectedKeys.indexOf(node[this.listNodeKey])
                if (index != -1) this.selectedKeys.splice(index, 1)
            }
            this.isSelectedAll = this.selectedKeys.length == this.currentCheckboxNodes.length
        },
        onSelectAllGroupChange(value) {
            this.isSelectedAll = value.length === this.currentCheckboxNodes.length
        },
        afterLoadInfo(list, pageInfo) {
            this.listDatas.push(...list)
            this.pageInfo = {
                ...this.pageInfo,
                pageNo: pageInfo.pageNo,
                pageSize: pageInfo.pageSize,
                total: pageInfo.total,
                totalPage: pageInfo.totalPage
            }
            this.scrollDisabled = this.pageInfo.pageNo == this.pageInfo.totalPage
            debugger
            console.log(this.listDatas, pageInfo)
        },
        handleSearch() {
            // 重置查询条件
            this.pageInfo = {
                pageNo: 1,
                pageSize: 10,
                totalPage: 1,
                total: 0
            }
            this.listDatas = []
            this.loadListInfo()
        },
        loadListInfo() {
            this.$emit('loadListData', {
                keyword: this.queryKeyword,
                pageNo: this.pageInfo.pageNo,
                pageSize: this.pageInfo.pageSize
            }, this.afterLoadInfo)
        },
        onSelectAllChange(value) {
            this.selectedKeys = value ? this.currentCheckboxKeys : []
        }
    }
}
</script>
<style lang="scss" scoped>
:deep.ys-selected-tree.el-tree {
    .el-tree-node__expand-icon {
        display: none !important;
    }
}
:deep.custom-checkbox-group {
    font-size: 14px;
    .el-checkbox__label {
        display: none;
    }
}
:deep.custom-radio-group {
    font-size: 14px;
    .el-radio {
        margin-right: 0 !important;
    }
    .el-radio__label {
        display: none;
    }
}
:deep.el-dialog.tree_select_dialog {
    .scroll {
        overflow: auto;
    }
    .scroll::-webkit-scrollbar {
        width: 4px;
        height: 8px;
    }
    .scroll::-webkit-scrollbar-track {
        background: #efefef;
        border-radius: 2px;
    }
    .scroll::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 10px;
    }
    .scroll::-webkit-scrollbar-thumb:hover {
        background: #bbb;
    }
    .scroll::-webkit-scrollbar-corner {
        background: #ddd;
    }
    .el-dialog__body {
        padding: 16px 24px 30px !important;
        .head_title {
            font-size: 16px;
        }
        .action-container {
            margin-top: 16px;
            display: flex;
            .action-container-left {
                flex: 1;
                height: 300px;
                // height: 80px;
                border: 1px #dcdcdc solid;
                padding: 0 16px 10px;
                .list-item {
                    line-height: 32px;
                    height: 32px;
                    margin-top: 8px;
                    .item-label {
                        margin-left: 8px;
                    }
                }
            }
            .action-container-right {
                margin-left: 16px;
                width: 216px;
                height: 300px;
                border: 1px #dcdcdc solid;
                .selected-title-container {
                    padding-left: 16px;
                    height: 48px;
                    line-height: 48px;
                    border-bottom: 1px #dcdcdc solid;
                }
                .selected-tree-container {
                    padding: 8px 16px;
                    height: 250px;
                    .list-item {
                        line-height: 32px;
                        height: 32px;
                        margin-top: 8px;
                        .item-label {
                            margin-left: 8px;
                        }
                    }
                }
            }
        }
        .footer-container {
            display: flex;
            margin-top: 16px;
        }
    }
}
</style>
