<template>
  <div>
    <el-table
      ref="myTable"
      :data="treeTableData"
      style="width: 100%"
      :row-key="rowKey || 'id'"
      border
      lazy
      :load="asyncLoadTreeNode"
      @select="tableSelect"
      @select-all="tableSelectAll"
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
      :tree-props="{ children: 'children', hasChildren: 'haveChildNode' }"
      :row-style="{'height': '48px'}"
      :cell-style="{'padding': '4px 16px'}"
      :header-row-style="{height:'48px','line-height':'48px',padding:'0px 16px'}"
      :header-cell-style="{'text-overflow':'ellipsis',padding:'0px 16px',height:'36px','line-height':'36px',}"
    >
      <el-table-column
        v-if="type == 'selection'"
        type="selection"
        width="48"
        align="center"
      ></el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title"
        v-for="(item, index) in tableItems"
        :key="index"
        :align="item.align || 'left'"
        :width="item.width || ''"
        :show-overflow-tooltip="true"
        :min-width="
          item.width ? item.width : item.type == 'index' ? '50px' : '160px'
        "
        :fixed="
          item.fixed ||
          index === 0 ||
          (index == tableItems.length - 1 ? 'right' : null) ||
          false
        "
        :sortable="item.sortable === undefined ? false : item.sortable"
      >
        <template slot-scope="scope">
          <slot
            :name="item.key"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-if="item.type == 'slot' || item.slot"
          ></slot>
          <span v-else-if="item.type == 'index'">{{ scope.$index + 1 }}</span>
          <div v-else-if="item.type == 'html'" class="ellipsis" v-html="item.template(scope.row)"></div>
          <div v-else-if="isTemplateFun(item)" class="ellipsis">{{ item.template(scope.row) }}</div>
          <div v-else class="ellipsis">{{ scope.row[item.key] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    treeTableData: {
      type: Array,
      default: () => { return [] }
    },
    // 加载数据的方法
    loadTreeData: {
      type: Function,
      require: true
    }
  },
  data () {
    return {
      multipleSelection: [],
      asynTreeTableAllData: [],
      treeMap: new Map(),
    }
  },
  computed: {
    tableItems () {
      return this.items.map((unit, index) => {
        if (!unit.key || unit.key === '') {
          unit.key = `key${index}`
        }
        return unit
      })
    }
  },
  methods: {
    isTemplateFun (item) {
      return item.template && item.template instanceof Function
    },
    filterHtml(string){
      let reg=/<(\w+).*>(.*)<\/\1>/
      return string.replace(reg,"$2")
    },
    selectableFun (row, index) {
      if (row.checkable === false) return false
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getChecked () {
      return this.multipleSelection
    },
    async asyncLoadTreeNode (data, treeNode, resolve) {
      this.treeMap.set(data.id, { data, treeNode, resolve })
      this.$emit('loadTreeData', data.id, resolve, (list) => {
        list.forEach((unit) => {
          this.asynTreeTableAllData.push(unit) // 将数据缓存起来
          if (!unit.haveChildNode && this.treeMap.has(unit.id)) {
            this.treeMap.delete(unit.id)
          }
        })
      })
    },
    tableSelect (selection, row) {
      const checked = selection.indexOf(row) > -1
      const vm = this
      ;(function deepChecked (node) {
        vm.asynTreeTableAllData.map((unit) => {
          if (unit.parentId === node.id) {
            // 子项
            vm.$refs.myTable.toggleRowSelection(unit, checked)
            if (unit.haveChildNode) {
              deepChecked(unit)
            }
          }
        })
        if (node.haveChildNode) {
        }
      })(row)
    },
    tableSelectAll (selection) {
      // 清空半选数组，此数组请提前在data中定义
      this.checkIndeRow = []
      // 获得懒数据的数据
      const { lazyTreeNodeMap, isAllSelected } = this.$refs.myTable.store.states
      console.log(
        this.$refs.myTable.store.states,
        lazyTreeNodeMap,
        isAllSelected
      )
      if (isAllSelected) {
        for (const item in lazyTreeNodeMap) {
          lazyTreeNodeMap[item].forEach((unit, i) => {
            if (selection.indexOf(unit) === -1) {
              selection.push(unit)
            }
          })
        }
      } else {
        this.$refs.myTable.store.states.selection = []
      }
    },
    expandChange (row, expanded) {
      const { selection } = this.$refs.myTable.store.states
      const checked = selection.indexOf(row) > -1
      if (expanded) {
        // 展开
        this.asynTreeTableAllData.map((unit) => {
          if (unit.parentId === row.id) {
            // 子项
            this.$refs.myTable.toggleRowSelection(unit, checked)
          }
        })
      }
    },
    // 更新table懒加载的数据
    async asyncUpdateTableData (opeType = 'add', row, newData) {
      // await this.getList()
      const { lazyTreeNodeMap } = this.$refs.myTable.store.states
      if (opeType === 'add') {
        const uniqueCode = row.parentId
        const cacheMap = this.treeMap.get(uniqueCode)
        if (cacheMap) {
          const { data, treeNode, resolve } = cacheMap
          this.$set(lazyTreeNodeMap, uniqueCode, [])
          this.asyncLoadTreeNode(data, treeNode, resolve)
        } else {
          // 直接将新增的节点赋值到lazyTreeNodeMap，table-tree会在刷新时自动添加成下级节点
          // lazyTreeNodeMap[row.parentId] = [row]
          this.forceFreshTreeTable()
        }
      } else if (opeType === 'edit') {
        if (row.parentId !== newData.parentId) {
          // 修改数据改变了父级，需要重新加载原节点的父级
          this.forceFreshTreeTable()
        } else {
          const uniqueCode = newData.parentId
          const cacheMap = this.treeMap.get(uniqueCode)
          if (cacheMap) {
            this.forceFreshTreeTable()
            // const { data, treeNode, resolve } = cacheMap
            // this.$set(lazyTreeNodeMap, uniqueCode, [])
            // this.asyncLoadTreeNode(data, treeNode, resolve)
          }
        }
      } else {
        // del
        const uniqueCode = row.parentId
        const cacheMap = this.treeMap.get(uniqueCode)
        if (cacheMap) {
          const { data, treeNode, resolve } = cacheMap
          this.$set(lazyTreeNodeMap, uniqueCode, [])
          this.asyncLoadTreeNode(data, treeNode, resolve)
        }
      }
    },
    async forceFreshTreeTable () {
      const { lazyTreeNodeMap } = this.$refs.myTable.store.states
      for (const uniqueCode in lazyTreeNodeMap) {
        this.$set(lazyTreeNodeMap, uniqueCode, [])
      }
      for (const uniqueCode in lazyTreeNodeMap) {
        const cacheMap = this.treeMap.get(uniqueCode)
        if (cacheMap) {
          const { data, treeNode, resolve } = cacheMap
          this.$set(lazyTreeNodeMap, uniqueCode, [])
          await this.asyncLoadTreeNode(data, treeNode, resolve)
        }
      }
    },
  },
  mounted () {
    // this.getList()
  }
}
</script>

<style lang="less" scoped>
/deep/.el-tooltip {
  width: 100% !important;
}
/deep/.ys-table-row {
  height: 48px;
}
/deep/.el-table-column--selection {
  padding: 2px 4px !important;
}
/deep/.is-center {
  padding: 2px 4px !important;
  .cell {
    padding: 0px 4px !important;
  }
}
/deep/.el-table__row {
  td:nth-child(2) {
    .cell {
      display: flex;
    }
  }
}
</style>
