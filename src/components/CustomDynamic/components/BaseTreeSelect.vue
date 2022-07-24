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
            <div v-show="searching" v-infinite-scroll="loadListInfo" class="action-container-left scroll" :infinite-scroll-disabled="scrollDisabled" :infinite-scroll-immediate="false">
                <div v-for="(item, i) in listInfo" :key="i" class="list-item">
                    <el-checkbox v-if="type == 'checkbox'" :key="item[nodeKey]" :value="isChecked(item[nodeKey])" :label="item[nodeKey]" @change="(value) => { treeCheckChange(value, item) }" />
                    <el-radio v-else v-model="currentRadioKey" :label="item[nodeKey]" @change="() => { treeRadioChange(item) }" />
                    <span class="item-label">{{ item[nodeLabel] }}</span>
                </div>
            </div>
            <div v-show="!searching" class="action-container-left scroll">
                <el-tree
                    ref="treeRef"
                    :highlight-current="true"
                    :data="treeData"
                    :lazy="true"
                    :accordion="accordion"
                    :node-key="nodeKey"
                    :props="treeProps"
                    :load="lazyLoadTreeNode"
                    :show-checkbox="false"
                    :check-strictly="checkStrictly"
                    :expand-on-click-node="true"
                    :default-expand-all="defaultExpandAll"
                    :default-expanded-keys="defaultExpandedKeys"
                    :default-checked-keys="currentCheckboxKeys"
                >
                    <span slot-scope="{ node, data }" class="custom-tree-node">
                        <span v-if="type == 'radio'" @click.stop="clickRadio">
                            <el-radio
                                :key="data[nodeKey]"
                                v-model="currentRadioKey"
                                :label="data[nodeKey]"
                                @change="() => { treeRadioChange(data) }"
                            >{{ data[nodeLabel] }}</el-radio>
                        </span>
                        <span v-if="type == 'checkbox'" @click.stop="clickRadio">
                            <el-checkbox
                                :key="data[nodeKey]"
                                :value="isChecked(data[nodeKey])"
                                :label="data[nodeLabel]"
                                @change="(value) => { treeCheckChange(value, data, node)}"
                            />
                        </span>
                    </span>
                </el-tree>
            </div>
            <div v-if="type === 'checkbox'" class="action-container-right">
                <div class="selected-title-container">
                    <el-checkbox v-model="isSelectedAll" @change="onSelectAllChange" />
                    <span style="margin-left: 8px;">已选</span>
                </div>
                <div class="selected-tree-container scroll">
                    <el-checkbox-group v-model="selectedKeys" class="custom-checkbox-group" @change="onSelectAllGroupChange">
                        <div v-for="(item, i) in currentCheckboxNodes" :key="i" class="list-item">
                            <el-checkbox :key="item[nodeKey]" :label="item[nodeKey]" />
                            <span class="item-label">{{ item[nodeLabel] }}</span>
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
    name: 'OrgTabSelect',
    props: {
        // ***** 公共配置 *****
        type: { type: String, default: 'radio' },
        nodeKey: { type: String, default: 'id' },
        nodeLabel: { type: String, default: 'id' },
        defaultCheckedList: { type: Array, default: () => { return [] } },
        // ***** 弹窗配置 *****
        visible: { type: Boolean, default: false },
        title: { type: String, default: '树形选择' },
        width: { type: String, default: '600px' },
        shadow: { type: Boolean, default: false },
        fullScreen: { type: Boolean, default: false },
        // ***** Tree公共配置 *****
        // 父子节点是否不关联,true表是不关联
        checkStrictly: { type: Boolean, default: true},
        // 默认展开all
        defaultExpandAll: { type: Boolean, default: false },
        // 默认展开的key
        defaultExpandedKeys: { type: Array, default() { return [] }},
        // 手风琴
        accordion: { type: Boolean, default: true }
    },
    data() {
        return {
            queryKeyword: '',
            searching: false,
            // ******* 滚动列表 *****
            pageInfo: {
                pageNo: 0,
                pageSize: 10,
                total: 0,
                totalPage: 0
            },
            // 列表数据
            // 是否禁止加载数据
            scrollDisabled: false,
            listInfo: [],
            // 树形数据
            treeData: [],
            // 单选
            currentRadioKey: '',
            currentRadioNode: null,
            // 多选
            currentCheckboxKeys: [],
            currentCheckboxNodes: [],
            // ******* 选择结果 *****
            selectedKeys: [],
            // 是否选中全部
            isSelectedAll: false
        }
    },
    computed: {
        treeProps() {
            return { label: this.nodeLabel, children: 'children', isLeaf: 'leaf' }
        }
    },
    watch: {
        visible: {
            handler(boolean) {
                if (boolean) {
                    this.queryKeyword = ''
                    this.searching = false
                    this.listDatas = []
                    this.currentTab = this.orgType === 'all' ? 'internal' : this.orgType
                    if (this.type == 'radio') {
                        this.currentRadioKey = this.defaultCheckedList.length === 0 ? '' : this.defaultCheckedList[0][this.nodeKey]
                    } else {
                        this.isSelectedAll = this.defaultCheckedList.length !== 0
                        this.currentCheckboxKeys = (this.defaultCheckedList || []).map(item => item[this.nodeKey])
                        this.selectedKeys = [ ...this.currentCheckboxKeys ]
                        this.currentCheckboxNodes = [ ...this.defaultCheckedList ]
                    }
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        lazyLoadTreeNode(node, resolve) {
            this.$emit('asyncLoadTreeData', node, resolve, this.asyncCheckTreeNode)
        },
        asyncCheckTreeNode(list) {},
        clickRadio() {},
        isChecked(key) {
            return this.currentCheckboxKeys.includes(key)
        },
        treeRadioChange(data) {
            this.currentRadioKey = data[this.nodeKey]
            this.currentRadioNode = { ...data }
        },
        treeCheckChange(checked, data) {
            if (checked) {
                this.handlePushTreeChecked(data)
            } else {
                this.handleDelTreeChecked(data)
            }
        },
        handlePushTreeChecked(node) {
            // 选择节点加入到已选中
            this.currentCheckboxNodes.push(node)
            this.currentCheckboxKeys.push(node[this.nodeKey])
            this.selectedKeys.push(node[this.nodeKey])
            this.isSelectedAll = this.selectedKeys.length === this.currentCheckboxNodes.length
        },
        handleDelTreeChecked(node) {
            let index = this.currentCheckboxKeys.indexOf(node[this.nodeKey])
            if (index !== -1) {
                this.currentCheckboxKeys.splice(index, 1)
                this.currentCheckboxNodes.splice(index, 1)
            }
            index = this.selectedKeys.indexOf(node[this.nodeKey])
            if (index !== -1) this.selectedKeys.splice(index, 1)
            this.isSelectedAll = this.selectedKeys.length === this.currentCheckboxNodes.length
        },
        cancel() {
            this.$emit('cancel')
        },
        ok() {
            if (this.type === 'radio') {
                if (this.currentRadioNode && this.currentRadioNode[this.nodeKey]) {
                    this.$emit('ok', [ this.currentRadioNode ], {})
                } else {
                    this.$message({ type: 'warning', message: '请至少选择一项' })
                }
            } else {
                const checkedNodes = this.currentCheckboxNodes.filter(node => { return this.selectedKeys.includes(node[this.nodeKey]) })
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
        onSelectAllGroupChange(value) {
            this.isSelectedAll = value.length === this.currentCheckboxNodes.length
        },
        loadAfter(list, pageInfo) {
            this.listInfo.push(...list)
            this.pageInfo = { ...pageInfo }
            this.scrollDisabled = this.pageInfo.pageNo == this.pageInfo.totalPage
        },
        handleSearch() {
            if (this.queryKeyword == '') {
                this.searching = false
            } else {
                this.searching = true
                this.listInfo = []
                this.pageInfo = { pageNo: 0, pageSize: 10, total: 0, totalPage: 0}
                this.loadListInfo()
            }
        },
        loadListInfo() {
            // 加载下一页数据
            this.pageInfo.pageNo = this.pageInfo.pageNo + 1
            this.$emit('loadListData', {
                ...this.pageInfo,
                keyword: this.queryKeyword
            }, this.loadAfter)
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
:deep.el-tree-node__content {
    line-height: 32px;
    height: 32px;
}
:deep.custom-checkbox-group {
    font-size: 14px;
    .el-checkbox__label {
        display: none;
    }
}
:deep.list-item {
    line-height: 32px;
    height: 32px;
    .item-label {
        margin-left: 8px;
    }
    .el-radio {
        margin-right: 0 !important;
    }
    .el-radio__label {
        display: none;
    }
    .el-checkbox__label {
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
        .tab-container {
            display: flex;
            margin-bottom: 16px;
            .tab-item {
                display: inline-block;
                padding: 0 16px;
                line-height: 32px;
                height: 32px;
                border: 1px solid #dcdcdc;
                border-left: none;
                cursor: pointer;
                &.selected {
                    background-color: #129e9e;
                    color: white;
                }
                &:first-child {
                    border-left: 1px solid #dcdcdc;
                }
            }
        }
        .action-container {
            margin-top: 16px;
            display: flex;
            .action-container-left {
                flex: 1;
                height: 300px;
                // height: 80px;
                border: 1px #dcdcdc solid;
                padding: 10px 16px 10px;
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
