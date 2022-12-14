<template>
  <main class="dynamic-table-container">
    <el-table
      :data="tableData"
      v-bind="table.properties"
      :class="{'table-center':table.properties['header-align']=='center'}"
      ref="table"
      v-on="$listeners"
    >
      <template v-for="col in columnsComputed">
        <el-table-column
          v-if="col.type == 'index'"
          :key="col.key"
          v-bind="{ ...col.colProperties }"
          type="index"
          :index="indexHandle"
        >
        </el-table-column>
        <el-table-column
          v-else-if="col.type == 'selection'"
          v-bind="{ ...col.colProperties }"
          :key="col.key"
          type="selection"
          :reserve-selection="table.properties['row-key']?true:false"
        >
        </el-table-column>
        <el-table-column
          v-else-if="col.type == 'lineActions'"
          v-bind="{ ...table.colOptions, ...col.colProperties }"
          :key="col.key"
        >
          <template slot-scope="scope">
            <DynamicActions
              :actions="col.actions"
              :actionData="scope.row"
              :actionBarWraper="$parent.$el"
              mode="table"
            ></DynamicActions>

          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="col.key"
          v-bind="{ ...table.colOptions, ...col.colProperties }"
          :key="col.key"
        >
          <template v-if="col.labelInfo" v-slot:header>
            <LabelWithTip :label="col.label" :tip="col.labelInfo"></LabelWithTip>
          </template>
          <template slot-scope="scope">
             <ColFormItem v-if="scope.row.editable"  :rowData="scope.row"  :colOptions="col" ></ColFormItem>
            <component v-else
              :is="tableColComponent(col,scope.row)"
              :rowData="scope.row"
              :colOptions="col"
            ></component>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </main>
</template>
<script>
import { deepCopy, loadPresetConfig } from '../utils/tool'

export default {
  name: 'DanamicTable',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    table: {
      type: Object,
      default: function () {
        return loadPresetConfig('tableOption')
      }
    },

    apiPromise: {
      type: Promise,
      default: function () {
        return null
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: [Object],
      default () {
        return {}
      }
    }
  },
  data: function () {
    return {
      tableData: []
    }
  },
  computed: {
    columnsComputed () {
      const columns = this.columns.map((item, index) => {
        if (index < 1) {
          item.colProperties = {
            ...item.colProperties,
            fixed: 'left'
          }
        }
        return {
          ...item,
          colProperties: {
            ...item.colProperties,
            label: item.label

          }
        }
      })
      if (this.table.indexColWidth) {
        columns.unshift({
          key: 'index',
          type: 'index',
          colProperties: {
            width: this.table.indexColWidth,
            fixed: 'left',
            label: '??????'

          }
        })
      }
      if (this.table.hasCheckbox) {
        columns.unshift({
          key: 'selection',
          type: 'selection',
          colProperties: {
            width: 48,
            fixed: 'left'
          }
        })
      }
      //
      const actionNum = this.table.lineActions ? Object.keys(this.table.lineActions).length : 0

      if (actionNum > 0) {
        const lineActions = deepCopy(this.table.lineActions)

        for (const key in lineActions) {
          const action = lineActions[key]
          action.componentProperties = { ...action.componentProperties, type: this.table.actionBtnType }
          lineActions[key] = this.$generateActionOption(action.actionType, action)
        }

        columns.push({
          type: 'lineActions',
          key: 'lineActions',
          colProperties: {
            width: this.table.actionColWidth || (actionNum * 60),
            label: '??????',
            fixed: 'right'
          },
          actions: lineActions // ?????????map????????????
        })
      }

      return columns
    }
  },
  watch: {
    apiPromise: {
      handler (api) {
        if (api instanceof Promise) {
          api.then((dataList) => {
            this.tableData = dataList
          })
        }
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler (tableData) {
        this.$nextTick(() => {
          debugger
          // this.$refs.table&&this.$refs.table.doLayout()
          this.$forceUpdate()

          this.selectRefresh()
        })
      },
      deep: true,
      immediate: true
    },
    selected: {
      handler (selected) {
        this.selectRefresh(selected)
      },
      deep: true,
      immediate: true

    },
    data: {
      handler (data) {
        if (data) {
          this.tableData = data
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {},
  components: {},
  methods: {
    tableColComponent (col, data) {
      if (col.component) {
        return col.component
      } else {
        return 'ColTeml'
      }
    },
    selectRefresh () {
      this.$nextTick(() => {
        const mainKey = this.table.properties['row-key']
        if (!mainKey) return
        this.tableData.forEach(row => {
          if (this.selected[row[mainKey]]) {
            this.$refs.table.toggleRowSelection(row, true)
            return
          }
          this.$refs.table.toggleRowSelection(row, false)
        })
      })
    },
    indexHandle (index) {
      debugger
      return index + 1
    }
  }
}
</script>

<style lang="less"  >
.dynamic-table-container  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

</style>
