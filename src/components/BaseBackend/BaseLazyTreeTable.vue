<template>
  <div>
    <!-- 搜索table -->
    <div v-if="searching">
      <el-table
        ref="multipleTable"
        :data="basetableData"
        border
        highlight-current-row
        style="width: 100%"
        :height="height"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="isSelectable"
        ></el-table-column>
        <el-table-column
          :prop="item.key"
          :label="item.title"
          v-for="(item, index) in basetableItems"
          :key="index"
          align="center"
          :width="item.width || ''"
          :fixed="item.fixed || false"
          :sortable="item.sortable === undefined ? false : item.sortable"
        >
          <template slot-scope="scope">
            <slot
              :name="item.key"
              :index="scope.$index"
              :row="scope.row"

              :column="scope.column"
              v-if="item.type == 'slot'"
            ></slot>
            <slot
              :name="item.slot"
              :index="scope.$index"
              :row="scope.row"
              :column="scope.column"
              v-else-if="item.slot"
            ></slot>
            <span v-else-if="item.type == 'index'">{{ scope.$index + 1 }}</span>
            <span v-else-if="isTemplateFun(item)">{{
              item.template(scope.row)
            }}</span>
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="baseTablePages.pageNum || baseTablePages.pageNo"
        :hide-on-single-page="false"
        background
        :page-sizes="baseTablePages.sizes"
        :page-size="baseTablePages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="baseTablePages.total"
        style="margin-top: 15px; text-align: right"
      ></el-pagination>
    </div>
    <!-- <BaseTable
      :height="529"
      class="table"
      ref="baseTableRef"
      :items="basetableItems"
      :data="basetableData"
      :pages="baseTablePages"
      type="selection"
      @change="tablePageChange"
    >
      <template slot="col1" slot-scope="scope">
        <slot
          name="operate"
          :index="scope.$index"
          :row="scope.row"
          :column="scope.column"
        ></slot>
      </template>
    </BaseTable> -->
    <!-- 懒加载table -->
    <el-table
      v-else
      ref="myTable"
      :data="treeTableData"
      style="width: 100%; margin-bottom: 20px"
      :row-key="rowKey"
      border
      lazy
      :load="asyncLoadTreeNode"
      @select="tableSelect"
      @select-all="tableSelectAll"
      @expand-change="expandChange"
      :tree-props="{ children: 'children', hasChildren: 'haveChildNode' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title"
        v-for="(item, index) in basetableItems"
        :key="index"
        align="center"
        :width="item.width || ''"
        :fixed="item.fixed || false"
        :sortable="item.sortable === undefined ? false : item.sortable"
      >
        <template slot-scope="scope">
          <slot
            :name="item.key"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-if="item.type == 'slot'"
          ></slot>
          <slot
            :name="item.slot"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-else-if="item.slot"
          ></slot>
          <span v-else-if="item.type == 'index'">{{ scope.$index + 1 }}</span>
          <span v-else-if="isTemplateFun(item)">{{
            item.template(scope.row)
          }}</span>
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    searching: {
      type: Boolean,
      default: false
    },
    height: { type: Number, default: 529 },
    tableItems: {
      type: Array,
      default: () => []
    },
    // 请求数据的配置{search:{},tree:{}}
    lazyRequest: {
      type: Object,
      default: null
    },
    query: {
      type: Object,
      default: null
    }
  },
  components: {},
  computed: {
    parentKey () {
      return this.lazyRequest.tree.parentKey || 'parentId'
    },
    rowKey () {
      return this.lazyRequest.tree.rowKey || 'parentId'
    },
    basetableItems () {
      return this.tableItems
    }
  },
  data () {
    return {
      multipleSelection: [],
      basetableData: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        sizes: [10, 20, 30, 40, 50]
      },
      treeTableData: [],
      treeMap: new Map(),
      asynTreeTableAllData: [], // 异步加载的treeTable的所有数据

      expandParams: null,
      staticParams: null,
      initialParams: null
    }
  },
  methods: {
    // baseTable相关方法
    isTemplateFun (item) {
      return item.template && item.template instanceof Function
    },
    isSelectable (row, index) {
      if (row.checkable === false) return false
      return true
    },
    handleSelectionChange (list) {
      debugger
      this.multipleSelection = list
      this.$emit('selection-change', list)
    },
    handleSizeChange (pageSize) {
      this.baseTablePages.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange (pageNum) {
      this.baseTablePages.pageNo = pageNum
      this.getList()
    },
    // 更新table懒加载的数据
    async asyncUpdateTableData (opeType = 'add', row, newData) {
      await this.getList()
      const { lazyTreeNodeMap } = this.$refs.myTable.store.states
      if (opeType === 'add') {
        const uniqueCode = row[this.parentKey]
        const cacheMap = this.treeMap.get(uniqueCode)
        if (cacheMap) {
          const { data, treeNode, resolve } = cacheMap
          this.$set(lazyTreeNodeMap, uniqueCode, [])
          this.asyncLoadTreeNode(data, treeNode, resolve)
        } else {
          // 直接将新增的节点赋值到lazyTreeNodeMap，table-tree会在刷新时自动添加成下级节点
          // lazyTreeNodeMap[row[this.parentKey]] = [row]
          this.forceFreshTreeTable()
        }
      } else if (opeType === 'edit') {
        if (row[this.parentKey] !== newData[this.parentKey]) {
          // 修改数据改变了父级，需要重新加载原节点的父级
          this.forceFreshTreeTable()
        } else {
          const uniqueCode = newData[this.parentKey]
          const cacheMap = this.treeMap.get(uniqueCode)
          if (cacheMap) {
            const { data, treeNode, resolve } = cacheMap
            this.$set(lazyTreeNodeMap, uniqueCode, [])
            this.asyncLoadTreeNode(data, treeNode, resolve)
          }
        }
      } else {
        // del
        const uniqueCode = row[this.parentKey]
        const cacheMap = this.treeMap.get(uniqueCode)
        if (cacheMap) {
          this.forceFreshTreeTable()
          // const { data, treeNode, resolve } = cacheMap
          // this.$set(lazyTreeNodeMap, uniqueCode, [])
          // this.asyncLoadTreeNode(data, treeNode, resolve)
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
    tableSelect (selection, row) {
      const checked = selection.indexOf(row) > -1
      const vm = this
      ;(function deepChecked (node) {
        vm.asynTreeTableAllData.map((unit) => {
          if (unit[vm.parentKey] === node[vm.rowKey]) {
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
      // 获得懒数据的数据
      const { lazyTreeNodeMap, isAllSelected } = this.$refs.myTable.store.states
      // console.log(
      //   this.$refs.myTable.store.states,
      //   lazyTreeNodeMap,
      //   isAllSelected,
      //   selection === this.$refs.myTable.store.states.selection
      // )
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
          if (unit[this.parentKey] === row[this.rowKey]) {
            // 子项
            this.$refs.myTable.toggleRowSelection(unit, checked)
          }
        })
      }
    },
    async asyncLoadTreeNode (data, treeNode, resolve) {
      this.treeMap.set(data[this.rowKey], { data, treeNode, resolve })
      const options = this.lazyRequest.tree
      this.expandParams = this.expandParams || {
        ...options.axios._expandParams
      }
      delete options.axios._expandParams
      const params = Object.fromEntries(
        Object.entries(this.expandParams).map(([key, value]) => {
          let result = value
          if (value.includes('$row')) {
            result = result.split('.').slice(1)
            result = result.reduce((prev, cur) => prev[cur], data)
          }
          return [key, result]
        })
      )
      await options
        .request({
          ...options.axios,
          params
        })
        .then((res) => {
          const list = (res?.data ?? []).map((unit) => {
            this.asynTreeTableAllData.push(unit) // 将数据缓存起来
            if (!unit.haveChildNode && this.treeMap.has(unit.id)) {
              this.treeMap.delete(unit.id)
            }
            return unit
          })
          resolve(list)
        })
    },
    getList () {
      if (this.searching) {
        const options = this.lazyRequest.search
        this.staticParams = this.staticParams || {
          ...options.axios._staticParams
        }
        delete options.axios._staticParams
        options
          .request({
            ...options.axios,
            params: {
              ...this.staticParams,
              ...this.query,
              pageNo: this.baseTablePages.pageNo,
              pageSize: this.baseTablePages.pageSize
            }
          })
          .then((res) => {
            this.basetableData = res?.data?.list ?? []
            this.baseTablePages = {
              pageNo: res?.data?.currPage ?? 1,
              pageSize: res?.data?.pageSize ?? 10,
              total: res?.data?.totalCount ?? 1
            }
          })
      } else {
        const options = this.lazyRequest.tree
        this.staticParams = this.staticParams || {
          ...options.axios._staticParams
        }
        delete options.axios._staticParams
        this.initialParams = this.initialParams || {
          ...options.axios._initialParams
        }
        delete options.axios._initialParams
        options
          .request({
            ...options.axios,
            params: {
              ...this.staticParams,
              ...this.initialParams,
              ...this.query
            }
          })
          .then((res) => {
            this.treeTableData = res?.data ?? []
          })
      }
    },
    /* ******************* 暴露以下方法给外部调用，通过$refs.xxx.getChecked *******************  */
    getChecked () {
      return this.multipleSelection
    }
  },
  mounted () {
    this.getList()
  },
  watch: {
    searching () {
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 10
      this.getList()
    }
  }
}
</script>
<style scoped></style>
