<template>
  <section class="tree-searchable-container px12 py8">
    <div class="row">
      <el-input
        v-model.trim="queryKeyword"
        placeholder="请输入关键字"
        clearable
        @keyup.native.enter="handleSearch"
        @clear="handleSearch"
        size="mini"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-search"
          @click="handleSearch"
        ></i>
      </el-input>
    </div>
    <!-- 搜索数据 -->
    <div
      class="scroll"
      style="width: 100%; box-sizing: border-box; height: 400px"
      v-show="searching"
    >
      <dynamic-table
        class="mt20"
        :columns="tableItems"
        :dataList="dataList"
        :table="options.listOption"
        @row-click="handleRowClick"
      >
      </dynamic-table>
      <el-pagination
        class="margin-top16"
        background
        v-bind="options.pagination"
        @current-change="pageChangeHandle"
        :total="total"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
    <div v-show="!searching">
      <div
        class="radius5 scroll mt10"
        style="
          width: 100%;
          box-sizing: border-box;
          padding: 8px 0;
          height: 400px;
        "
      >
        <el-tree
          v-if="!searching"
          ref="radioTreeRef"
          :load="lazyLoadTreeNode"
          v-bind="options.treeOption"
          :nodeKey="options.nodeKey"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
    </div>
  </section>
</template>
<script>
import {regionPath} from "@/network/amapData/region" 

export default {
  name: 'TreeSearchable',
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    },

    lazyLoadTreeNodeApi: {
      type: Function,
      required: true
    },
    searchApi: {
      type: Function,
      required: true
    },
    tableNodeKey: { type: String, default: 'id' },
    tableItems: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      queryKeyword: '',
      searching: false, // 正在搜索数据
      dataList: [],

      treeData: [],
      treeSelectedKey: null,
      treeSelectedNode: null,
      treeCheckedNodes: [],
      total: 1,
      currentPage: 1
    }
  },
  computed: {
    defaultCheckedKeys () {
      return this.defaultCheckedList.map((unit) => unit[this.treeNodeKey])
    }
  },
  methods: {
    handleSearch () {
      if (this.queryKeyword === '') {
        this.searching = false
        this.dataList = []
        return
      } else {
        this.searching = true
      }
      this.searchApi({
        pageNo: this.currentPage,
        pageSize: this.options.pagination.pageSize,
        keyword: this.queryKeyword
      }).then((list) => {
        this.dataList = list
      })
    },
    handleRowClick (row, col, event) {
      this.$emit('node-click', row)
    },
    handleNodeClick (data) {
      // const streetKey = data.key
      this.$emit('node-click', data)
    },
    pageChangeHandle (pageNo) {
      this.currentPage = pageNo
      this.handleSearch()
    },


    lazyLoadTreeNode (node, resolve) {
      // 注意：异步加载时，需要先处理node.level===0的第一级数据，再去处理下级node.data的异步加载
      if(node.level===0){
      
          resolve([{"id":"2115","admName":"渝中区","ancestorAdmName":"重庆市渝中区","admCode":"500103000000","parentAdmCode":"500000000000","haveChildNode":true,path:regionPath}])
        return
      }
      this.lazyLoadTreeNodeApi({
        parentAdmCode:
          node.level === 0 ? this.options.treeRootCode : node.data.admCode
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          leaf: !unit.haveChildNode
        }))
  
        resolve(list)
      })
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
  watch: {}
}
</script>
<style scoped lang="css">
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

.tree-searchable-container >>> .el-table td.el-table__cell,
.tree-searchable-container >>> .el-table th.el-table__cell.is-leaf {
  border-bottom: none;
}
.tree-searchable-container >>> .el-input__inner {
  border-radius: 0px;
  border: none;
  border-bottom: solid 1px var(--grey);
}

.tree-searchable-container
  >>> .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  color: var(--main-color);
  font-weight: 600;
  height: 32px;
}
.tree-searchable-container >>> .el-tree-node__content {
  height: 32px;
}
.tree-searchable-container
  >>> .el-table__body
  tr.current-row
  > td.el-table__cell {
  color: var(--main-color);
  font-weight: 600;
}
.tree-searchable-container >>> .el-table--border::after,
.tree-searchable-container >>> .el-table--group::after,
.tree-searchable-container >>> .el-table::before {
  border: none;
  height: 0px;
}
</style>
