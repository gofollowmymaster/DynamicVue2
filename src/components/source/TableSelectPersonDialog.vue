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
    <div class="scroll" style="height: 500px">
      <div class="row">
        <el-input
          placeholder="请输入关键字"
          clearable
          v-model.trim="queryKeyword"
          @keyup.native.enter="handleSearch"
          @clear="handleSearch"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
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
            :key="scope.row[tableNodeKey]"
            :label="scope.row[tableNodeKey]"
            @change="tableRadioChange(scope.row)"
          >
            &nbsp;
          </el-radio>
        </span>
      </BaseTable>
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
  name: 'TableSelectPersonDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择上级行政区划'
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
      radioVal: '',
      tableCheckedList: [],
      basetableData: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 5,
        total: 0,
        sizes: [5, 10, 15, 20, 25]
      }
    }
  },
  computed: {
    basetableItems () {
      return [
        {
          key: 'checkRadio',
          title: '',
          type: 'slot',
          align: 'center',
          width: '48',
          fixed: 'left'
        },
        {
          type: 'index',
          title: '序号',
          fixed: 'left'
        }
      ].concat(this.tableItems)
    }
  },
  methods: {
    handleSearch () {
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 5
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
    ok () {
      if (!this.tableCheckedList.length) {
        this.$message({ type: 'warning', message: '请至少选择一项' })
        return
      }
      this.$emit('ok', this.tableCheckedList)
    },
    cancel () {
      this.$emit('cancel')
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
    getList () {
      this.$emit(
        'loadSearchData',
        {
          keyword: this.queryKeyword,
          pageNo: this.baseTablePages.pageNo,
          pageSize: this.baseTablePages.pageSize
        },
        this.asyncCheckTableRow
      )
    }
  },
  mounted () {},
  watch: {
    visible (boolean) {
      this.baseTablePages.pageNo = 1
      this.baseTablePages.pageSize = 5
      if (boolean) {
        // 清除已选
        this.radioVal = null
        this.queryKeyword = ''

        this.getList()

        if (this.type === 'radio') {
          if (this.defaultCheckedList.length) {
            this.tableCheckedList = [this.defaultCheckedList[0]]
            this.radioVal = this.defaultCheckedList[0][this.tableNodeKey]
          }
        } else {
          // checkbox
          this.tableCheckedList = [...this.defaultCheckedList]
        }
      }
    }
  }
}
</script>
<style scoped>
.row {
  display: flex;
}
.mt20 {
  margin-top: 20px;
}
.checkRadio >>> .el-radio__label {
  display: none;
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
</style>
