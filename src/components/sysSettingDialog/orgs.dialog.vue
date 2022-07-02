<template>
  <!-- 内/外部组织同时存在 dialog -->
  <el-dialog
    class="dialog"
    :visible="visible"
    :fullscreen="fullScreen"
    ref="dialogRef"
    :close-on-click-modal="false"
    @close="cancel"
    :width="width || '800px'"
    :modal="shadow ? true : false"
    :destroy-on-close="true"
  >
    <div class="head_title" slot="title">{{ title }}</div>
    <div class="row">
      <el-input
        v-model="queryKeyword"
        placeholder="请输入关键字"
        clearable
        @keyup.native.enter="handleSearch"
        @clear="handleSearch"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      ></el-button>
    </div>
    <!-- 搜索数据 -->
    <div
      class="scroll"
      style="width: 100%; box-sizing: border-box; height: 580px"
      v-show="searching"
    >
      <div v-if="searching">
        <el-table border height="500" class="mt20" :data="basetableData">
          <el-table-column width="60">
            <template slot="header"></template>
            <template slot-scope="scope">
              <span class="checkRadio">
                <el-checkbox
                  :key="scope.row[tableNodeKey]"
                  v-if="type == 'checkbox'"
                  @change="(boolean) => tableCheckboxChange(boolean, scope.row)"
                  v-model="scope.row.$checked"
                ></el-checkbox>
                <el-radio
                  v-else
                  v-model="treeSelectedKey"
                  @change="tableRadioChange(scope.row)"
                  :label="scope.row[treeNodeKey]"
                >
                  &nbsp;
                </el-radio>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="deptName"
          ></el-table-column>
          <el-table-column align="center" label="类型" prop="deptType">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.deptType == 1"
                >内部组织</el-tag
              >
              <el-tag v-if="scope.row.deptType == 2">外部组织</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="(pageSize) => tablePageChange({ pageSize })"
          @current-change="(pageNo) => tablePageChange({ pageNo })"
          :current-page="baseTablePages.pageNo"
          :hide-on-single-page="false"
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="baseTablePages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="baseTablePages.total"
          style="margin-top: 15px; text-align: right"
        ></el-pagination>
      </div>
    </div>
    <div v-show="!searching">
      <!-- 多选 -->
      <div class="mt20 between">
        <div style="width: 48%">
          <div
            class="border radius5 scroll"
            style="
              width: 100%;
              box-sizing: border-box;
              padding: 8px 0;
              height: 280px;
            "
          >
            <div class="px10 mb8">内部组织</div>
            <el-tree
              v-if="visible"
              ref="innerOrgTreeRef"
              :highlight-current="true"
              :data="treeData"
              :lazy="lazy"
              :accordion="accordion"
              :nodeKey="treeNodeKey"
              :props="treeProps"
              :load="lazyLoadInnerTreeNode"
              :show-checkbox="true"
              :check-strictly="checkStrictly"
              :expand-on-click-node="true"
              :default-expand-all="defaultExpandAll"
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              @check-change="
                (data, checked, indeterminate) =>
                  treeCheckChange(data, checked, indeterminate, 'inner')
              "
            >
            </el-tree>
          </div>
          <div
            class="border radius5 scroll mt20"
            style="
              width: 100%;
              box-sizing: border-box;
              padding: 8px 0;
              height: 280px;
            "
          >
            <div class="px10 mb8">外部组织</div>
            <el-tree
              v-if="visible"
              ref="outerOrgTreeRef"
              :highlight-current="true"
              :data="treeData"
              :lazy="lazy"
              :accordion="accordion"
              :nodeKey="treeNodeKey"
              :props="treeProps"
              :load="lazyLoadOuterTreeNode"
              :show-checkbox="true"
              :check-strictly="checkStrictly"
              :expand-on-click-node="true"
              :default-expand-all="defaultExpandAll"
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              @check-change="
                (data, checked, indeterminate) =>
                  treeCheckChange(data, checked, indeterminate, 'outer')
              "
            >
            </el-tree>
          </div>
        </div>
        <div
          class="border radius5 scroll"
          style="
            width: 48%;
            box-sizing: border-box;
            padding: 8px 0;
            height: 580px;
          "
        >
          <div
            v-for="(item, index) in treeCheckedNodes"
            :key="index"
            class="px10 between"
            style="line-height: 28px"
          >
            <div class="ellipsis" style="width: 90%">
              {{ item[treeProps.label] }}
            </div>
            <div>
              <i
                @click="removeChecked(index)"
                class="pointer el-icon-circle-close"
                style="position: relative; top: 3px; font-size: 20px"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer slot="footer">
      <div>
        <el-button type="primary" @click="ok">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </footer>
  </el-dialog>
</template>
<script>
import {
  SysDeptListDeptTreeInfo,
  SysOutsideListDeptOutsideTreeInfo
} from '@/network/home'
import { globalSysDeptPageAllDeptInfo } from '@/network/global.js'

export default {
  props: {
    // ***** tree相关配置-开始 *****
    type: {
      // 类型，radio/checkbox
      type: String,
      default: 'checkbox'
    },
    lazy: {
      // 懒加载
      type: Boolean,
      default: true
    },
    accordion: {
      // 手风琴
      type: Boolean,
      default: true
    },
    treeNodeKey: { type: String, default: 'id' },
    treeProps: {
      type: Object,
      default () {
        return {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        }
      }
    },
    checkStrictly: {
      // 父子节点是否不关联,true表是不关联
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      // 默认展开all
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      // 默认展开的key
      type: Array,
      default () {
        return []
      }
    },
    defaultCheckedList: {
      // 默认选中key
      type: Array,
      default () {
        return []
      }
    },
    // ***** tree相关配置-结束 *****

    tableNodeKey: { type: String, default: 'id' },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择组织'
    },
    width: {
      type: String,
      default: '800px'
    },
    params: {
      type: Object,
      default () {
        return {}
      }
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
  components: {},
  data () {
    return {
      queryKeyword: '',
      searching: false, // 正在搜索数据
      basetableData: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      defaultCheckedTargetList: [],
      treeCurrentClickNodeKey: null,
      treeData: [],
      treeSelectedKey: null,
      treeSelectedNode: null,
      treeCheckedNodes: [],
      innerDepTreeRootCode: '0', // 内部组织根节点code
      outerDepTreeRootCode: '0' // 外部组织根节点code
    }
  },
  computed: {
    basetableItems () {
      return [
        {
          key: 'checkRadio',
          title: '',
          type: 'slot',
          width: '50',
          fixed: 'left'
        },
        {
          key: 'index',
          title: '序号',
          type: 'slot',
          width: '50',
          fixed: 'left'
        },
        {
          key: 'name',
          title: '名称'
        }
      ]
    },
    defaultCheckedKeys () {
      return this.defaultCheckedTargetList.map((unit) => unit[this.treeNodeKey])
    }
  },
  methods: {
    handleSearch () {
      if (this.queryKeyword.trim() === '') {
        this.searching = false
      } else {
        this.searching = true
        globalSysDeptPageAllDeptInfo({
          keyword: this.queryKeyword,
          pageNo: this.baseTablePages.pageNo,
          pageSize: this.baseTablePages.pageSize
        }).then((res) => {
          let list = (res?.data?.list ?? []).map((unit) => ({
            ...unit,
            name: unit.deptName
          }))
          if (this.type === 'checkbox') {
            const checkedKeys = this.treeCheckedNodes.map(
              (unit) => unit[this.treeNodeKey]
            )
            list = list.map((unit) => {
              const result = { ...unit }
              if (checkedKeys.indexOf(unit[this.treeNodeKey]) !== -1) {
                result.$checked = true
              }
              return result
            })
          }
          this.baseTablePages = {
            pageNo: res?.data?.currPage ?? 1,
            pageSize: res?.data?.pageSize ?? 10,
            total: res?.data?.totalCount ?? 1
          }
          this.basetableData = list
        })
      }
    },
    tablePageChange ({ pageNo, pageSize }) {
      if (pageNo) {
        this.baseTablePages.pageNo = pageNo
      }
      if (pageSize) {
        this.baseTablePages.pageSize = pageSize
      }
      this.searching = true
      this.handleSearch()
    },
    treeCheckChange (data, checked, indeterminate, innerOuter) {
      if (checked) {
        this.handlePushTreeChecked({ ...data, $type: innerOuter })
      } else {
        this.handleDelTreeChecked({ ...data, $type: innerOuter })
      }
    },
    removeChecked (index) {
      const tableNodeKey = this.tableNodeKey
      const node = this.treeCheckedNodes[index]
      this.treeCheckedNodes.splice(index, 1)
      this.$refs.innerOrgTreeRef.setChecked(node, false, !this.checkStrictly)
      this.$refs.outerOrgTreeRef.setChecked(node, false, !this.checkStrictly)
      this.defaultCheckedTargetList = this.defaultCheckedTargetList.filter(
        (unit) => unit[tableNodeKey] !== node[tableNodeKey]
      )
      // if (node.$type === 'inner') {
      //   this.$refs.innerOrgTreeRef.setChecked(node, false, !this.checkStrictly)
      // } else {
      //   this.$refs.outerOrgTreeRef.setChecked(node, false, !this.checkStrictly)
      // }
    },
    treeSelectedChange (val) {
      const node = this.$refs.radioTreeRef.getNode(val)
      this.treeSelectedNode = node
    },
    tableRadioChange (row) {
      this.treeSelectedNode = row
    },
    tableCheckboxChange (boolean, row) {
      const node = row
      this.$refs.innerOrgTreeRef.setChecked(node, boolean, !this.checkStrictly)
      if (boolean) {
        this.handlePushTreeChecked(row)
      } else {
        this.handleDelTreeChecked(row)
      }
    },
    handlePushTreeChecked (node) {
      const checkedKeyArr = this.treeCheckedNodes.map(
        (unit) => unit[this.treeNodeKey]
      )
      if (checkedKeyArr.indexOf(node[this.treeNodeKey]) === -1) {
        this.treeCheckedNodes.push(node)
      }
    },
    handleDelTreeChecked (node) {
      this.treeCheckedNodes = this.treeCheckedNodes.filter(
        (unit) => unit[this.treeNodeKey] !== node[this.treeNodeKey]
      )
    },
    clickRadio (e) {
      // e.stopPropagation()
    },
    ok () {
      const checkedNodes = this.$refs.innerOrgTreeRef.getCheckedNodes()
      const halfCheckedNodes = this.$refs.innerOrgTreeRef.getHalfCheckedNodes()
      this.$emit('ok', this.treeCheckedNodes, {
        checked: checkedNodes,
        halfChecked: halfCheckedNodes
      })
    },
    cancel () {
      this.$emit('cancel')
      this.$emit('close')
    },
    lazyLoadInnerTreeNode (node, resolve) {
      SysDeptListDeptTreeInfo({
        method: 'get',
        params: {
          parentId: node.level === 0 ? this.innerDepTreeRootCode : node.data.id
        }
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          name: unit.deptName,
          leaf: !unit.haveChildNode
        }))
        resolve(list)
        // this.$refs.innerOrgTreeRef.setChecked(5, true, !this.checkStrictly)
      })
    },
    lazyLoadOuterTreeNode (node, resolve) {
      SysOutsideListDeptOutsideTreeInfo({
        method: 'get',
        params: {
          parentId: node.level === 0 ? this.outerDepTreeRootCode : node.data.id
        }
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          name: unit.deptName,
          id: unit.deptId,
          leaf: !unit.haveChildNode
        }))
        resolve(list)
      })
    }
  },
  watch: {
    visible (boolean) {
      if (boolean) {
        this.baseTablePages.pageNo = 1
        this.baseTablePages.pageSize = 10
        this.searching = false
        this.queryKeyword = ''
        this.defaultCheckedTargetList = [...this.defaultCheckedList]
        this.treeCheckedNodes = [...this.defaultCheckedList]
      }
    }
  }
}
</script>
<style scoped>
.row {
  display: flex;
}
.between {
  display: flex;
  justify-content: space-between;
}
.mb8 {
  margin-bottom: 8px;
}
.mt20 {
  margin-top: 20px;
}
.px10 {
  padding: 0 10px;
}
.border {
  border: 1px solid #ddd;
}
.radius5 {
  border-radius: 5px;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pointer {
  cursor: pointer;
}
.scroll {
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  width: 8px;
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

.dialog >>> .el-dialog {
  margin-top: 5vh !important;
}
.checkRadio >>> .el-radio__label {
  display: none;
}
.custom-tree-node >>> .el-radio__label {
  display: none;
}
.custom-tree-node >>> .el-radio {
  margin-right: 10px;
}
</style>
