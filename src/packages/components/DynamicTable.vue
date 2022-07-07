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
          v-bind="{ ...col.tableOption }"
          type="index"
          :index="indexHandle"
        >
        </el-table-column>
        <el-table-column
          v-else-if="col.type == 'selection'"
          v-bind="{ ...col.tableOption }"
          :key="col.key"
          type="selection"
          :reserve-selection="table.properties['row-key']?true:false"
        >
        </el-table-column>
        <el-table-column
          v-else-if="col.type == 'lineActions'"
          v-bind="{ ...table.colOptions, ...col.tableOption }"
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
          v-bind="{ ...table.colOptions, ...col.tableOption }"
          :key="col.key"
        >
          <template slot-scope="scope">
            <component
              v-if="
                col.tableOption.template &&
                col.tableOption.template(scope.row, col.key) &&
                col.tableOption.template(scope.row, col.key).component
              "
              :is="col.tableOption.template(scope.row, col.key).component"
              :rowData="scope.row"
              :field="col.key"
              :key="scope.row[col.key]"
              :item="col.tableOption.template(scope.row, col.key)"
              :colOptions="col"
            ></component>
            <ColTeml v-else   :rowData="scope.row"  :field="col.key" :colOptions="col" >
              </ColTeml>
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
        if (item.type === 'index') {
          item.tableOption = {
            ...item.tableOption,
            width: 56,
            fixed: 'left'
          }
        } else if (index < 2) {
          item.tableOption = {
            ...item.tableOption,
            fixed: 'left'
          }
        }
        return {
          ...item,
          tableOption: {
            ...item.tableOption,
            label: item.tableOption?.label || item.label

          }
        }
      })

      if (this.table.hasCheckbox) {
        columns.unshift({
          key: 'selection',
          type: 'selection',
          tableOption: {
            width: 48,
            fixed: 'left'
          }
        })
      }
      //
      const lineActions = deepCopy(this.table.lineActions)

      if (lineActions) {
        const actions = Object.values(lineActions).map(action => {
          debugger
          action.componentProperties = { ...action.componentProperties, type: this.table.actionBtnType }
          return action
        })
        columns.push({
          type: 'lineActions',
          key: 'lineActions',
          tableOption: {
            width: this.table.actionColWidth || (actions.length * 60),
            label: '操作',
            fixed: 'right'
          },
          actions: lineActions // 引用在map中被修改
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
