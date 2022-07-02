<template>
  <div>
    <el-button @click="openAddDialog">新增</el-button>
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
        :label="item.title || item.label"
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editRow(scope)">编辑</el-button>
          <el-button type="text" @click="delRow(scope)">删除</el-button>
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
      :total="this.tableData.length"
      style="margin-top: 15px; text-align: right"
    ></el-pagination>
    <BaseModal
      ref="modalRef"
      v-if="modalVisible"
      :visible="modalVisible"
      :items="modalItems"
      :type="modalType"
      :title="modalTitle"
      labelWidth="120px"
      :shadow="false"
      width="600px"
      :span="24"
      @add="modalAdd"
      @edit="modalEdit"
      @cancel="modalCancel"
      @error="modalError"
    ></BaseModal>
  </div>
</template>
<script>
import BaseModal from '@/components/BaseBackend/BaseModal.vue'
export default {
  name: 'BaseAddTable',
  model: {
    prop: 'tableData',
    event: 'change'
  },
  props: {
    height: { type: Number, default: 529 },
    items: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    addExtraData: {
      type: Object,
      default: () => ({})
    }
  },
  components: { BaseModal },
  computed: {
    modalItems () {
      return this.items
    },
    basetableItems () {
      return this.items
    },
    basetableData () {
      const { pageNo, pageSize } = this.baseTablePages
      const startIndex = (pageNo - 1) * pageSize
      const endIndex = pageNo * pageSize
      return this.tableData.filter(
        (unit, index) => index >= startIndex && index < endIndex
      )
    }
  },
  data () {
    return {
      modalVisible: false,
      modalType: 'add',
      modalTitle: '新增',
      modalParams: {},
      multipleSelection: [],
      operateIndex: 0, // 正在操作项的index
      baseTablePages: {
        pageNo: 1,
        pageSize: 10,
        sizes: [10, 20, 30, 40, 50]
      }
    }
  },
  methods: {
    isTemplateFun (item) {
      return item.template && item.template instanceof Function
    },
    isSelectable (row, index) {
      if (row.checkable === false) return false
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (pageSize) {
      this.baseTablePages.pageSize = pageSize
    },
    handleCurrentChange (pageNum) {
      this.baseTablePages.pageNo = pageNum
    },
    openAddDialog () {
      this.modalType = 'add'
      this.modalVisible = true
    },
    openEditDialog () {
      this.modalType = 'edit'
      this.modalVisible = true
    },
    modalAdd (formData) {
      this.$emit('change', [
        ...this.tableData,
        { ...this.addExtraData, ...formData }
      ])
      this.modalCancel()
    },
    modalEdit (formData) {
      this.$emit(
        'change',
        this.tableData.map((unit, index) => {
          if (index === this.operateIndex) {
            return { ...this.addExtraData, ...formData }
          } else {
            return unit
          }
        })
      )
      this.modalCancel()
    },
    modalCancel () {
      this.modalVisible = false
    },
    modalError () {},
    editRow (scope) {
      this.openEditDialog()
      const { row, $index } = scope
      this.operateIndex = $index
      this.$nextTick(() => {
        for (const key in row) {
          this.$refs.modalRef.formData[key] = row[key]
        }
      })
      this.$emit('operate-edit', row)
    },
    delRow (scope) {
      const { $index } = scope
      this.$emit(
        'change',
        this.tableData.filter((unit, index) => index !== $index)
      )
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped></style>
