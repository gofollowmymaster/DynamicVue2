<template>
  <el-dialog
    :visible="visible"
    :fullscreen="fullScreen"
    ref="dialogRef"
    :close-on-click-modal="false"
    @close="cancel"
    :width="width || '800px'"
    :modal="shadow ? true : false"
    :destroy-on-close="true"
     :append-to-body="true"
  >
    <div class="head_title" slot="title">{{ title }}</div>
    <div class="row">
      <el-input
        v-model.trim="queryKeyword"
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
      style="width: 100%; box-sizing: border-box; height: 400px"
      v-show="searching"
    >
      <BaseTable
        class="mt20"
        ref="baseTableRef"
        :items="basetableItems"
        :data="basetableData"
        :pages="baseTablePages"
        @change="tablePageChange"
        v-if="searching"
      >
        <span slot="checkRadio" slot-scope="scope" class="checkRadio">
          <el-checkbox
            v-if="type == 'checkbox'"
            :key="scope.row[tableNodeKey]"
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
        <span slot="index" slot-scope="scope">{{ scope.index + 1 }}</span>
      </BaseTable>
    </div>
    <div v-show="!searching">
      <!-- 单选 -->
      <div class="mt20" v-if="type === 'radio'">
        <div
          class="border radius5 scroll"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 8px 0;
            height: 400px;
          "
        >
          <el-tree
            v-if="visible"
            ref="radioTreeRef"
            :highlight-current="true"
            :data="treeData"
            :lazy="lazy"
            :accordion="accordion"
            :nodeKey="treeNodeKey"
            :props="treeProps"
            :current-node-key="treeCurrentClickNodeKey"
            :load="lazyLoadTreeNode"
            :expand-on-click-node="true"
            :default-expand-all="defaultExpandAll"
            :default-expanded-keys="defaultExpandedKeys"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span @click.stop="clickRadio">
                <el-radio
                  v-model="treeSelectedKey"
                  @change="treeRadioChange"
                  :label="data[treeNodeKey]"
                ></el-radio
              ></span>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <!-- 多选 -->
      <div class="mt20 between" v-if="type === 'checkbox'">
        <div
          class="border radius5 scroll"
          style="
            width: 48%;
            box-sizing: border-box;
            padding: 8px 0;
            height: 400px;
          "
        >
          <el-tree
            v-if="visible"
            ref="checkboxTreeRef"
            :highlight-current="true"
            :data="treeData"
            :lazy="lazy"
            :accordion="accordion"
            :nodeKey="treeNodeKey"
            :props="treeProps"
            :load="lazyLoadTreeNode"
            :show-checkbox="true"
            :check-strictly="checkStrictly"
            :expand-on-click-node="true"
            :default-expand-all="defaultExpandAll"
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultCheckedKeys"
            @check-change="treeCheckChange"
          >
          </el-tree>
        </div>
        <div
          class="border radius5 scroll"
          style="
            width: 48%;
            box-sizing: border-box;
            padding: 8px 0;
            height: 400px;
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
import BaseTable from 'components/BaseBackend/BaseTable.vue'

// import { GlobalAsyncLoadTreeSelectTreeData } from 'network/home'

export default {
  name: 'TreeSelectDialog',
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
      default: '选择上级行政区划'
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
    tableItems: {
      type: Array,
      default () {
        return []
      }
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  components: { BaseTable },
  data () {
    return {
      queryKeyword: '',
      searching: false, // 正在搜索数据
      basetableData: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 5,
        total: 0,
        sizes: [5, 10, 15, 20, 25]
      },
      defaultCheckedTargetList: [],
      treeCurrentClickNodeKey: null,
      treeData: [],
      treeSelectedKey: null,
      treeSelectedNode: null,
      treeCheckedNodes: []
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
        }
      ].concat(this.tableItems)
    },
    defaultCheckedKeys () {
      return this.defaultCheckedTargetList.map((unit) => unit[this.treeNodeKey])
    }
  },
  methods: {
    handleSearch () {
      if (this.queryKeyword === '') {
        this.searching = false
        this.basetableData = []
        return
      } else {
        this.searching = true
      }
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 5
      this.$emit(
        'loadSearchData',
        {
          keyword: this.queryKeyword,
          pageNo: this.baseTablePages.pageNo,
          pageSize: this.baseTablePages.pageSize
        },
        this.asyncCheckTableRow
      )
    },
    tablePageChange ({ pageNo, pageSize }) {
      if (pageNo) {
        this.baseTablePages.pageNo = pageNo
      }
      if (pageSize) {
        this.baseTablePages.pageSize = pageSize
      }
      this.$emit(
        'loadSearchData',
        {
          keyword: this.queryKeyword,
          pageNo: this.baseTablePages.pageNo,
          pageSize: this.baseTablePages.pageSize
        },
        this.asyncCheckTableRow
      )
    },
    asyncCheckTableRow (list, { pageNo, pageSize, total }) {
      if (this.type === 'checkbox') {
        const checkedKeys = this.treeCheckedNodes.map(
          (unit) => unit[this.treeNodeKey]
        )
        this.basetableData = list.map((unit) => {
          const result = { ...unit }
          if (checkedKeys.indexOf(unit[this.treeNodeKey]) !== -1) {
            result.$checked = true
          }
          return result
        })
      } else {
        // radio
        this.basetableData = list
      }
      this.baseTablePages.pageNo = pageNo
      this.baseTablePages.pageSize = pageSize
      this.baseTablePages.total = total
    },
    treeCheckChange (data, checked, indeterminate) {
      if (checked) {
        this.handlePushTreeChecked(data)
      } else {
        this.handleDelTreeChecked(data)
      }
    },
    removeChecked (index) {
      const tableNodeKey = this.tableNodeKey
      const node = this.treeCheckedNodes[index]
      this.treeCheckedNodes.splice(index, 1)
      this.$refs.checkboxTreeRef.setChecked(node, false, !this.checkStrictly)
      this.defaultCheckedTargetList = this.defaultCheckedTargetList.filter(
        (unit) => unit[tableNodeKey] !== node[tableNodeKey]
      )
    },
    treeRadioChange (val) {
      const node = this.$refs.radioTreeRef.getNode(val)
      this.treeSelectedNode = node.data
    },
    tableRadioChange (row) {
      this.treeSelectedNode = row
    },
    tableCheckboxChange (boolean, row) {
      const node = row
      this.$refs.checkboxTreeRef.setChecked(node, boolean, !this.checkStrictly)
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
      if (this.type === 'radio') {
        // const node = this.$refs.radioTreeRef.getCurrentNode()
        if (this.treeSelectedNode) {
          this.$emit('ok', [this.treeSelectedNode], {})
        } else {
          this.$message({ type: 'warning', message: '请至少选择一项' })
        }
      } else {
        if (this.treeCheckedNodes.length) {
          const checkedNodes = this.$refs.checkboxTreeRef.getCheckedNodes()
          const halfCheckedNodes =
            this.$refs.checkboxTreeRef.getHalfCheckedNodes()
          this.$emit('ok', this.treeCheckedNodes, {
            checked: checkedNodes,
            halfChecked: halfCheckedNodes
          })
        } else {
          this.$message({ type: 'warning', message: '请至少选择一项' })
        }
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    asyncCheckTreeNode (list) {
      const checkedKeys = this.treeCheckedNodes.map(
        (unit) => unit[this.treeNodeKey]
      )
      list.forEach((unit) => {
        const nodeKey = unit[this.treeNodeKey]
        if (checkedKeys.indexOf(nodeKey) !== -1) {
          this.$refs.checkboxTreeRef.setChecked(
            nodeKey,
            true,
            !this.checkStrictly
          )
        }
      })
    },
    lazyLoadTreeNode (node, resolve) {
      this.$emit('asyncLoadTreeData', node, resolve, this.asyncCheckTreeNode)
    },
    // 获取tree全量数据(非懒加载时)
    getAllTreeData () {
      this.treeData = []
      setTimeout(() => {
        this.treeData = [
          {
            name: Math.random(),
            children: [{ name: '下级001' }, { name: '下级002' }]
          },
          {
            name: Math.random()
          },
          { name: Math.random() }
        ]
      }, 1000)
    }
  },
  watch: {
    visible (boolean) {
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 5
      this.searching = false
      this.queryKeyword = ''
      if (this.type === 'radio') {
        if (this.defaultCheckedList.length) {
          this.treeSelectedKey = this.defaultCheckedList[0][this.treeNodeKey]
          this.treeSelectedNode = this.defaultCheckedList[0]
          this.treeCurrentClickNodeKey =
            this.defaultCheckedList[0][this.treeNodeKey]
        } else {
          this.treeSelectedKey = null
          this.treeSelectedNode = null
          this.treeCurrentClickNodeKey = null
        }
      } else {
        // checkbox
        this.defaultCheckedTargetList = [...this.defaultCheckedList]
        this.treeCheckedNodes = [...this.defaultCheckedList]
      }
      if (boolean && !this.lazy) {
        this.getAllTreeData()
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
