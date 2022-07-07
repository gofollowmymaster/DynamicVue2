<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="data"
      border
      highlight-current-row
      :height="height"
      @selection-change="handleSelectionChange"
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
        :selectable="selectableFun"
      ></el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title"
        v-for="(item, index) in tableItems"
        :key="index"
        :align="item.align ? item.align : item.type == 'index' ? 'center' : 'left'"
        :width="item.width ? item.width : item.type == 'index' ? '56' : ''"
        :show-overflow-tooltip="true"
        :min-width="
          item.width ? item.width : item.type == 'index' ? '56px' : '160px'
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
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            :content="scope.row[item.key] + ''"
            placement="top"
          >
            <div class="ellipsis">{{ scope.row[item.key] }}</div>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!(hidePage === true)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum || pages.pageNo"
      :hide-on-single-page="hideSingle"
      background
      :page-sizes="sizes"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      style="margin-top: 15px; text-align: right"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    pages: {
      type: Object || null,
      default: null
    },
    data: {
      type: Array,
      required: true
    },
    height: {
      // type: Number,
      default: null
    },
    hidePage: {
      type: Boolean,
      required: false
    },
    hideSingle: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      multipleSelection: []
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
    },
    sizes () {
      if (this.pages.sizes && this.pages.sizes.length) {
        return this.pages.sizes
      }
      return [10, 20, 30, 40, 50]
    }
  },
  methods: {
    isTemplateFun (item) {
      return item.template && item.template instanceof Function
    },
    filterHtml (string) {
      const reg = /<(\w+).*>(.*)<\/\1>/
      return string.replace(reg, '$2')
    },
    selectableFun (row, index) {
      if (row.checkable === false) return false
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (pageSize) {
      this.$emit('change', { pageSize })
    },
    handleCurrentChange (pageNum) {
      this.$emit('change', { pageNum, pageNo: pageNum })
    },
    getChecked () {
      return this.multipleSelection
    }
  },
  mounted () {}
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
    &.el-tooltip {
      min-width: 40px !important;
    }
  }
}
</style>
