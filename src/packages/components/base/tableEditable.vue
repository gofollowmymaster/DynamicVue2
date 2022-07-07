<template>
<el-table
          ref="multipleTable"
          :data="allData"
          tooltip-effect="dark"
          style="width: 100%"
          @select="currentChange"
          :header-cell-class-name="cellClass"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column
            prop="fieldNameZh"
            align="center"
            label="字段名"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dataTypeVoName"
            align="center"
            label="字段类型"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="aliasName" align="center" label="别名">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.aliasName"
                @change="changeValue(2, scope.row.id)"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="centerFlag"
            align="center"
            label="是否居中"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.centerFlag"
                @change="changeSwitchValue(scope.row.centerFlag, scope.row.id)"
                active-color="#129E9E"
                inactive-color="#C5C5C5"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>

</template>
<script>

export default {
  name: 'tableEditable',
  props: {
    title: String,
    visible: {
      type: Object,
      default () {
        return { value: false }
      }
    },
    fields: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    optionsProps: {
      type: Object,
      require: true
    },
    selected: {
      type: Object,
      default () {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default: false
    }

  },

  data: function () {
    console.log('--optionsProps--', this.optionsProps)

    return {

    }
  },
  watch: {

  },

  computed: {

  },
  created () {
    this.pagination.pageSize =
      this.options.pagination.pageSize || this.pagination.pageSize
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
