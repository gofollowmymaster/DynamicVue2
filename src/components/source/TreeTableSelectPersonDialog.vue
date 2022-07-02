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
  >
    <div class="head_title" slot="title">{{ title }}</div>
    <div class="row">
      <!-- 左侧 -->
      <div class="scroll p10 border" style="width: 180px; height: 580px">
        <el-tree
          v-if="visible"
          ref="treeRef"
          :data="treeData"
          :lazy="lazy"
          :accordion="accordion"
          :nodeKey="treeNodeKey"
          :props="treeProps"
          :current-node-key="treeCurSelectedNodeKey"
          :load="lazyLoadTreeNode"
          :highlight-current="true"
          :default-expand-all="defaultExpandAll"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="treeNodeClick"
        >
        </el-tree>
      </div>
      <!-- 右侧 -->
      <div class="scroll flex1 ml20" style="height: 600px">
        <div class="row">
          <el-input
            placeholder="请输入关键字"
            clearable
            v-model.trim="queryKeyword"
            @keyup.native.enter="handleSearch"
            @clear="handleSearch"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
        </div>
        <BaseTable
          class="mt20"
          ref="baseTableRef"
          :items="basetableItems"
          :data="basetableData"
          :pages="baseTablePages"
          @change="tablePageChange"
          v-if="visible"
        >
          <span slot="checkRadio" slot-scope="scope" class="checkRadio">
            <el-checkbox
              v-if="type == 'checkbox'"
              :key="scope.row[tableNodeKey]"
              v-model="scope.row.$checked"
              @change="(boolean) => tableCheckboxChange(boolean, scope.row)"
            ></el-checkbox>
            <el-radio
              v-else
              v-model="radioVal"
              :label="scope.row[tableNodeKey]"
              @change="tableRadioChange(scope.row)"
            >
              &nbsp;
            </el-radio>
          </span>
          <span slot="index" slot-scope="scope">{{ scope.index + 1 }}</span>
        </BaseTable>
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
export default {
  name: 'TreeTableSelectPersonDialog',
  props: {
    // ***** tree相关配置-开始 *****
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
    treeCurSelectedNode: {
      type: Object,
      default () {
        return null
      }
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
    // ***** tree相关配置-结束 *****
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择负责人'
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    tableItems: {
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
    tableNodeKey: { type: String, default: 'id' },
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
  components: {
    BaseTable
  },
  data () {
    return {
      queryKeyword: '',
      radioVal: null, // 单选值
      tableCheckedList: [], // table选中值
      basetableData: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      currentSelectedNode: null,
      treeData: []
    }
  },
  computed: {
    treeCurSelectedNodeKey () {
      return this.currentSelectedNode
        ? this.currentSelectedNode[this.treeNodeKey]
        : null
    },
    basetableItems () {
      return [
        {
          key: 'checkRadio',
          title: '',
          type: 'slot',
          width: '48',
          fixed: 'left',
          align: 'center'
        },
        {
          type: 'index',
          title: '序号',
        }
      ].concat(this.tableItems)
    }
  },
  methods: {
    handleSearch () {
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 10
      this.getList()
    },
    tablePageChange ({ pageNo, pageSize }) {
      if (pageNo) {
        this.baseTablePages.pageNo = pageNo
      }
      if (pageSize) {
        this.baseTablePages.pageSize = pageSize
      }
      this.getList()
    },
    treeNodeClick (data) {
      this.currentSelectedNode = data
      this.handleSearch()
    },
    ok () {
      if (!this.tableCheckedList.length) {
        this.$message({ type: 'warning', message: '请至少选择一项' })
        return
      }
      this.$emit('ok', this.tableCheckedList, this.currentSelectedNode)
    },
    cancel () {
      this.$emit('cancel')
    },
    getList () {
      this.$emit(
        'loadSearchData',
        {
          ...this.currentSelectedNode,
          keyword: this.queryKeyword,
          pageNo: this.baseTablePages.pageNo,
          pageSize: this.baseTablePages.pageSize
        },
        this.asyncCheckTableRow
      )
    },
    tableRadioChange (row) {
      this.tableCheckedList = [row]
    },
    tableCheckboxChange (boolean, row) {
      if (boolean) {
        this.handlePushTableChecked(row)
      } else {
        this.handleDelTableChecked(row)
      }
    },
    handlePushTableChecked (node) {
      const checkedKeyArr = this.tableCheckedList.map(
        (unit) => unit[this.tableNodeKey]
      )
      if (checkedKeyArr.indexOf(node[this.tableNodeKey]) === -1) {
        this.tableCheckedList.push(node)
      }
    },
    handleDelTableChecked (node) {
      this.tableCheckedList = this.tableCheckedList.filter(
        (unit) => unit[this.tableNodeKey] !== node[this.tableNodeKey]
      )
    },
    asyncCheckTreeNode (node) {
      // 默认选中的tree-node
      this.currentSelectedNode = node
      this.$refs.treeRef.setCurrentKey(node[this.treeNodeKey])
      this.getList()
    },
    asyncCheckTableRow (list, { pageNo, pageSize, total }) {
      if (this.type === 'checkbox') {
        const checkedKeys = this.tableCheckedList.map(
          (unit) => unit[this.tableNodeKey]
        )
        this.basetableData = list.map((unit) => {
          const result = { ...unit }
          if (checkedKeys.indexOf(unit[this.tableNodeKey]) !== -1) {
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

        // 默认选中的tree-node
        this.currentSelectedNode = this.treeData[0]
        this.getList()
      }, 1000)
    }
  },
  mounted () {},
  watch: {
    visible (boolean) {
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 10
      // 清除已选
      this.radioVal = null
      this.queryKeyword = ''

      if (this.type === 'radio') {
        if (this.defaultCheckedList.length) {
          this.tableCheckedList = this.defaultCheckedList[0]
          this.radioVal = this.defaultCheckedList[0][this.tableNodeKey]
        }
      } else {
        // checkbox
        this.tableCheckedList = [...this.defaultCheckedList]
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
.ml20 {
  margin-left: 20px;
}
.p10 {
  padding: 10px;
}
.mt20 {
  margin-top: 20px;
}
.flex1 {
  flex: 1;
}
.border {
  border: 1px solid #ddd;
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
  background: #efefef;
}
.el-tree >>> .el-tree-node > .el-tree-node__children {
  overflow: visible;
}
.checkRadio >>> .el-radio__label {
  display: none;
}
/* .table >>> .el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px;
  height: 15px;
}
.table
  >>> .el-table--scrollable-x
  .el-table__body-wrapper::-webkit-scrollbar-track {
  background: #efefef;
  border-radius: 2px;
}
.table
  >>> .el-table--scrollable-x
  .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 10px;
}
.table
  >>> .el-table--scrollable-x
  .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}
.table
  >>> .el-table--scrollable-x
  .el-table__body-wrapper::-webkit-scrollbar-corner {
  background: #efefef;
} */
</style>
