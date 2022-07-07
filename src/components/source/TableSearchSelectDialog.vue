<template>
  <el-dialog
    :visible="visible"
    :fullscreen="fullScreen"
    ref="dialogRef"
    :close-on-click-modal="false"
    @close="cancel"
    :width="'1080px'"
    :modal="shadow ? true : false"
    :destroy-on-close="true"
  >
    <div class="head_title" slot="title">{{ title }}</div>
    <div class="scroll" style="height: 480px">
      <el-form
        :model="searchData"
        ref="formRef"
        :label-width="'100px'"
        :inline="false"
        label-position="right"
      >
        <el-row>
          <el-col
            v-for="item in searchItems"
            :span="item.span || span"
            class="unit"
            :key="item.key"
          >
            <!-- 行政区划选择 -->
            <adm-select
              v-if="item.type == 'admSelect'"
              :label="item.title"
              v-model="searchData[item.key]"
            />
            <!-- 人口选择 -->
            <el-form-item
              v-else-if="item.type == 'populationType'"
              :class="item.hide ? 'hide' : 'block h40px'"
              :label-width="item.labelWidth"
              :label="item.title"
              :prop="item.key"
            >
              <el-select
                style="flex: 1"
                v-model="searchData[item.key]"
                :placeholder="item.placeholder || `请输入${item.title}`"
              >
                <el-option label="户籍人口" value="0"></el-option>
                <el-option label="流动人口" value="1"></el-option>
                <el-option label="境外人口" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else
              :class="item.hide ? 'hide' : 'block h40px'"
              :label-width="item.labelWidth"
              :label="item.title"
              :prop="item.key"
            >
              <el-input
                style="flex: 1"
                v-model="searchData[item.key]"
                :maxlength="item.maxLength || 50"
                :placeholder="item.placeholder || `请输入${item.title}`"
                autocomplete="off"
                :disabled="disabled || item.disabled"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="pl20 mb10">
              <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
              <el-button type="primary" size="small" plain @click="resetHandleSearch"> 重置 </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
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
        <span slot="index" slot-scope="scope">{{ scope.index + 1 }}</span>
      </BaseTable>
      <!-- <div v-if="type == 'checkbox'">ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</div> -->
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
import AdmSelect from 'components/common/BaseInput/AdmSelect.vue'

const initSearchData = (searchItems) => {
  const searchData = {}
  searchItems.forEach(item => {
    if (item.type == 'admSelect') {
      searchData[item.key] = []
    } else {
      searchData[item.key] = item.data !== undefined && item.data !== null ? item.data : ''
    }
  })
  return searchData
}

export default {
  name: 'TableSelectDialog',
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
    searchItems: {
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
    },
    span: {
      type: Number,
      default: 8
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BaseTable,
    AdmSelect
  },
  data () {
    // const searchData = {}
    // ;(this.$props.searchItems || []).forEach(item => {
    //   if (item.type == 'admSelect') {
    //     searchData[item.key] = []
    //   } else {
    //     searchData[item.key] = item.data !== undefined && item.data !== null ? item.data : ''
    //   }
    // })
    // console.log('dddddddddddddddddddddddddddddddddddd.............', searchData)
    const searchData = initSearchData(this.$props.searchItems || [])
    return {
      searchData,
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
          width: '48',
          fixed: 'left'
        },
        {
          title: '序号',
          type: 'index',
          fixed: 'left'
        }
      ].concat(this.tableItems)
    }
  },
  methods: {
    handleSearch () {
      this.$refs.formRef.validate((boolean, obj) => {
        if (boolean) {
          this.baseTablePages.pageNo = 1
          this.baseTablePages.pageSize = 5
          this.getList()
        }
      })
    },
    resetHandleSearch () {
      // this.$refs.formRef.resetFields()
      this.searchData = initSearchData(this.searchItems || [])
      this.handleSearch()
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
      const params = {
        ...this.searchData,
        pageNo: this.baseTablePages.pageNo,
        pageSize: this.baseTablePages.pageSize
      }
      this.$emit(
        'loadSearchData',
        params,
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
        this.searchData = initSearchData(this.searchItems || [])
        this.getList()

        if (this.type === 'radio') {
          if (this.defaultCheckedList.length) {
            this.tableCheckedList = this.defaultCheckedList[0]
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
