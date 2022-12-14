<template>
  <!-- <main class="curd-container grid-wrap mt12   " :class="[scene+'-table']"> -->
      <curdLayout :mode="!isEmpty(options.treeOption)?'ltb':'tb'" class="relative" :scene="scene">
    <div slot="left"
      class="tree-container scroll p10 border-main border-r4 grid-col-4 grid-col-xs-12 grid-col-pp-24" v-if="!isEmpty(options.treeOption)">
      <el-tree v-bind="options.treeOption" @node-click="treeClick"> </el-tree>
    </div>
    <!-- <section class=" full-width  flex1   flex flex-direction   "
      :class="[  options.treeOption? ' pl1 grid-col-20  grid-col-xs-12 grid-col-pp-24 with-tree': ' grid-col-24']"> -->
        <DynamicSearchForm
        v-if="
          options.searchFields &&
          options.searchFields.length &&
          options.searchOption"
           slot="top"
        class="search-form "
        :fields="options.searchFields"
        :options="options.searchOption"
        :data="data"
        @search="onSearch"
      ></DynamicSearchForm>
      <!-- <div class="table-gap"></div> -->
      <section class="table-section"     slot="bottom">

      <DynamicActions
        :class="scene=='page'?'mb24':'mb12'" v-if="!isEmpty(options.topToolBar)"
        :actions="options.topToolBar"
        :actionData="actionData"
        :actionBarWraper="$parent.$el"
      ></DynamicActions>
      <component v-if="options.tableUp" :is="options.tableUp.component" v-bind="options.tableUp.properties"></component>
      <DynamicTable
        class="table-wraper "
        :data="options.data"
        :table="options.listOption"
        :columns="options.tableFields"
        :apiPromise="loadListApiPromise"
        @selection-change="selectChange"
      ></DynamicTable>
      <el-pagination
        v-if="!isEmpty(options.pagination)"
        class="mt16 text-right"
        background
        v-bind="options.pagination"
        :total="total"
        @size-change="handleSizeChange"
        :pageSize.sync="pagination.pageSize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
      </section>

    <!-- </section> -->
      </curdLayout>
  <!-- </main> -->
</template>
<script>
import {
  deepMerge,
  isEmpty
} from '../utils/tool'
import {
  buildSearchFields,
  buildTableFields
} from '../utils/fieldsConfigUtil'

import { generateDefaultValue } from '../utils/actionTools'
import presetConfig from '../presetConfig'

import actionPresetMixin from './actionPresetMixin'

export default {
  name: 'DynamicCurd',
  mixins: [actionPresetMixin],
  props: {
    data: {
      type: [Object]
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

    mode: { type: String },
    apiPromises: {
      type: Object,
      default () {
        return {}
      }
    },
    formSections: {
      type: Object,
      default () {
        return {}
      }
    },
    entityLabel: String,
    randomId: String,
    scene: {
      type: String,
      default: 'component'
    }
  },
  data: function () {
    return {
      isEmpty,
      searchParams: { refreshKey: '' },
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 1,
      selected: []
    }
  },

  computed: {
    options () {
      debugger
      const mode = this.mode || presetConfig.getConfig('defaultDialogMode') || 'dialog'
      const {
        createOptions,
        bulkdeleteOptions,
        updateOptions,
        detailOptions,
        deleteOptions
      } = this.generateActionOptions(mode)
      const searchFields = buildSearchFields(this.fields)
      const tableFields = buildTableFields(this.fields)

      const optionsOrigin = deepMerge(
        {
          searchOption: presetConfig.getConfig('searchOption'),
          // treeOption,
          pagination: presetConfig.getConfig('pagination'),
          topToolBar: {
            create: createOptions,
            bulkdelete: bulkdeleteOptions
          },
          searchFields,
          tableFields,
          listOption: {
            ...presetConfig.getConfig('tableOption'),
            loadListApi: this.apiPromises.list,
            lineActions: {
              update: updateOptions,
              detail: detailOptions,
              delete: deleteOptions
            }
          }
        },
        this.optionsProps,
        true
      )

      return optionsOrigin
    },
    queryParams () {
      return { ...this.searchParams, ...this.pagination }
    },
    loadListApiPromise () {
      if (typeof this.options.listOption.loadListApi === 'function') {
        const queryParams = { ...this.queryParams }
        delete queryParams.refreshKey
        return this.options.listOption
          .loadListApi(queryParams)
          .then((data = {}) => {
            debugger
            data = data.data || data
            this.total = data.totalCount
            return data.list
          })
      }
      return null
    },
    actionData () {
      return { selected: this.selected, queryParams: this.queryParams }
    }
  },
  created () {
    this.searchParams = {
      ...this.searchParams,
      ...generateDefaultValue(this.options.searchFields || [])
    }
    this.pagination.pageSize =
      this.options.pagination?.pageSize || this.pagination.pageSize
    debugger
    this.initRefreshEvent()
  },

  mounted () {},

  methods: {
    initRefreshEvent () {
      this.$dynamicBus.$off('dynamicRefresh')
      this.$dynamicBus.$on('dynamicRefresh', () => {
        this.refresh()
      })
      if (this.randomId) {
        this.$dynamicBus.$off('dynamicRefresh:' + this.randomId)
        this.$dynamicBus.$on('dynamicRefresh:' + this.randomId, () => {
          this.refresh()
        })
      }
    },

    handleSizeChange (pageSize) {
      this.refresh()
    },
    handleCurrentChange (pageNo) {
      this.pagination.pageNo = pageNo
      this.onSearch({ pageNo })
    },

    treeClick (data, node) {
      this.onSearch({
        [this.options.treeOption.fieldName]:
          data[this.options.treeOption['node-key']]
      })
    },
    onSearch (params) {
      this.searchParams = { ...this.searchParams, ...params }
    },
    refresh () {
      debugger
      const refreshKey = this.searchParams.refreshKey + 1
      this.onSearch({ refreshKey })
    },

    selectChange (selected) {
      this.selected = selected
    }
  }
}
</script>

<style lang="less" scoped>

.border-main {
  border: 1px solid var(--main-color);
}
.curd-container {
   position: relative;
    .tree-container{
      height: 320px;

    }

  .scroll {
    overflow: auto;
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #efefef;
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #bbb;
    }
    ::-webkit-scrollbar-corner {
      background: #efefef;
    }
  }
}

</style>
