<template>
  <el-dialog
    :visible="visible"
    v-if="visible"
    :fullscreen="false"
    ref="dialogRef"
    :close-on-click-modal="false"
    @close="$emit('cancel')"
    :width="width"
    :modal="true"
    :destroy-on-close="true"
    :modal-append-to-body="true"
  >
    <div class="head_title" slot="title">{{ title || 'title' }}</div>
    <div class="content scroll">
      <!-- 搜索条件 -->
      <ContainerInput
        ref="containerInputRef"
        :items="inputItems"
        @ok="inputSearch"
        @reset="clearQuery"
      >
      </ContainerInput>
      <el-table
        ref="multipleTable"
        :data="basetableData"
        border
        highlight-current-row
        style="width: 100%"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="55" v-if="limit === 1">
          <template slot-scope="scope">
            <div class="tc">
              <el-radio
                v-model="radioVal"
                :label="scope.row[rowkey]"
                @change="chooseSingle(scope.row)"
              ></el-radio>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
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
    <footer slot="footer">
      <div>
        <el-button type="primary" @click="ok">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </footer>
  </el-dialog>
</template>
<script>
import ContainerInput from 'components/BaseBackend/ContainerInput.vue'
import { SysDictDataSelectDictDataInfo } from 'network/home'
import { formDataPureValue, formDataEchoData } from '@/common/utils.js'
export default {
  props: {
    width: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number || null,
      default: null
    },
    rowkey: {
      type: String,
      default: 'id'
    },
    tableOptions: {
      type: Object,
      default: () => ({
        height: 520,
        items: []
      })
    },
    searchOptions: {
      type: Object,
      default: () => ({
        slot: [],
        httpRequst: () => {},
        beforeRequst: () => {},
        items: []
      })
    }
  },
  components: { ContainerInput },
  computed: {
    tableHeight () {
      return this.tableOptions.height || 520
    },
    basetableItems () {
      return this.tableOptions.items || []
    }
  },
  data () {
    const inputItems = (this.searchOptions.items || []).map((unit) => {
      if (unit.httpDict) {
        this.getDictionary(unit.key, unit.httpDict)
      }
      if (unit.httpPromise) {
        unit.httpPromise().then((list) => {
          this.updateItemsDataList(unit.key, list)
        })
      }
      return unit
    })
    return {
      radioVal: '',
      inputItems,
      multipleSelection: [],
      basetableData: [],
      baseTablePages: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
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
    chooseSingle (row) {
      this.multipleSelection = [row]
    },
    inputSearch () {
      this.getList()
    },
    clearQuery () {
      this.getList()
    },
    handleSelectionChange (list) {
      this.multipleSelection = list
    },
    handleSizeChange (pageSize) {
      this.baseTablePages.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange (pageNum) {
      this.baseTablePages.pageNo = pageNum
      this.getList()
    },
    ok () {
      if (!this.multipleSelection.length) {
        this.$message({
          type: 'warning',
          message: '请选择数据'
        })
        return
      }
      if (this.limit && this.multipleSelection.length > this.limit) {
        this.$message({
          type: 'warning',
          message: `所选数据，不允许超过${this.limit}条`
        })
        return
      }
      this.$emit('ok', this.multipleSelection)
    },
    cancel () {
      this.$emit('cancel')
    },
    updateItemsDataList (key, list) {
      this.inputItems = this.inputItems.map((unit) => {
        if (unit.key === key) {
          unit.dataList = list
        }
        return unit
      })
    },
    // 获取数据字典数据
    getDictionary (key, ditcKey) {
      SysDictDataSelectDictDataInfo({ params: { dictType: ditcKey } }).then(
        (res) => {
          const list = (res?.data ?? []).map((unit) => ({
            ...unit,
            label: unit.dictLabel,
            value: unit.id
          }))
          this.updateItemsDataList(key, list)
        }
      )
    },
    getList () {
      this.$refs.containerInputRef.getData().then((condition) => {
        const searchOptions = this.searchOptions
        let condParams = formDataPureValue(this.inputItems, condition)
        if (searchOptions.beforeRequst) {
          condParams = searchOptions.beforeRequst(condParams)
        }
        searchOptions
          .httpRequst({
            ...condParams,
            pageNo: this.baseTablePages.pageNo,
            pageSize: this.baseTablePages.pageSize
          })
          .then((res) => {
            this.basetableData = res.list || []
            this.baseTablePages = {
              pageNo: res?.pageNo ?? 1,
              pageSize: res?.pageSize ?? 10,
              total: res?.total ?? 1
            }
          })
      })
    }
  },
  mounted () {},
  watch: {
    visible (boolean) {
      if (boolean) {
        // 回显数据
        this.radioVal = ''
        this.multipleSelection = []
        formDataEchoData({ items: this.inputItems })
        this.$nextTick(() => {
          this.getList()
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-radio__label {
  display: none;
}
</style>
