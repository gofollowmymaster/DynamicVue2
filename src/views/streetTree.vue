<template>
  <div class="main-container hz-low-code flex flex-direction">
    <dyBrandBar>
      <span slot="title">不动产管理</span>
    </dyBrandBar>
    <DynamicPageWrapper
      class="flex1"
      :actions="{ ...topToolBar, ...tableOption.lineActions }"
      entityLabel="不动产管理"
    >
      <curdLayout mode="tb" scene="page">
        <DynamicSearchForm
          slot="top"
          :fields="searchFields"
          :options="searchOption"
          @search="onSearch"
        ></DynamicSearchForm>
        <section slot="bottom">
          <DynamicActions
            :actions="topToolBar"
            :actionData="selected"
            :actionBarWraper="$el"
          ></DynamicActions>
          <section class="grid-wrap mt24 full-width">
            <section class="flex flex-direction" :class="['grid-col-24']">
              <DynamicTable
                class="table-wraper flex1"
                :table="tableOption"
                :columns="tableFields"
                :apiPromise="loadListApi"
                @selection-change="selectChange"
              ></DynamicTable>
              <el-pagination
                class="mt24 text-right"
                background
                v-bind="pagination"
                :total="total"
                @size-change="handleSizeChange"
                :pageSize.sync="pagination.pageSize"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </section>
          </section>
        </section>
      </curdLayout>
    </DynamicPageWrapper>

    <!-- <DynamicFormDialog v-bind="currentDialogForm"> </DynamicFormDialog> -->
    <!-- <DynamicFormDialog v-bind="currentDialogForm"> </DynamicFormDialog>
      <DynamicPageDialog v-bind="currentDialogPage"> </DynamicPageDialog> -->
  </div>
</template>
<script>
import {
  buildFormFields,
  buildTableFields,
  buildSearchFields
} from '@/packages/utils/fieldsConfigUtil'
import {
  treeStreetUpdateApi,
  treeStreetSaveApi,
  treeStreetListApi,
  treeStreetDetailApi,
  treeStreetDeleteApi
} from '@/network/assets.js'
import { pagination } from '@/packages/presetConfig'
import fields from './streetTreeFields'
 

const formFields = buildFormFields(fields)
const searchFields = buildSearchFields(fields)
const tableFields = buildTableFields(fields)

export default {
  name: 'streetTree',
  data: function () {
    return {
      fields,
      apiPromises: {
        save: treeStreetSaveApi
      },
      searchFields,
      searchOption: this.$dynamicConfig.searchOption,
      topToolBar: {
        create: {
          isLoadData: false,
          label: '新增',
          actionType: 'routerDialogFormAction',
          componentProperties: {
            icon: 'el-icon-plus',
            type: 'primary'
          },
          container: 'dy-page',
          containerProperties: {
            title: '新增不动产'
          },
          formItemList: formFields,
          saveAction: {
            actionType: 'submit',
            label: '保存',
            apiPromise: treeStreetSaveApi
          }
        },

        bulkdelete: {
          label: '批量删除',
          actionType: 'requestApiAction',
          apiPromise: treeStreetDeleteApi,
          ...this.$dynamicConfig['msgBoxOptions']
        }
      },
      tableOption: this.$appendToPreset('tableOption', {
        loadListApi: treeStreetListApi,
        'current-change': 'handleCurrentChange', // 事件 暂不支持
        lineActions: {
          update: {
            label: '编辑',
            actionType: 'routerDialogFormAction',
            apiPromise: treeStreetDetailApi,
            container: 'dy-page',
            containerProperties: {
              title: '更新不动产'
            },
            colNum: 3,
            formItemList: formFields,
            saveAction: {
              apiPromise: treeStreetUpdateApi
            }
          },
          detail: {
            label: '查看',
            actionType: 'routerDialogFormAction',
            container: 'dy-page',
            apiPromise: treeStreetDetailApi,
            containerProperties: {
              title: '查看不动产',
              width: '60%'
            },
            borderForm: false,
            textModel: true,
            'label-position': 'right',
            // 'label-width': '140px'
            formItemList: formFields
          },
          delete: {
            label: '删除',
            actionType: 'requestApiAction',
            componentProperties: {
              class: ['text-grey-dark2']
            },
            apiPromise: treeStreetDeleteApi,
            ...this.$dynamicConfig['msgBoxOptions']
          }
        }
      }),
      tableFields,
      pagination: { ...pagination, pageNo: 1 },

      searchParams: { refreshKey: '' },
      selected: [],
      total: 1,
      currentDialogForm: {
        visible: { value: false }
      },
      currentDialogPage: {
        visible: { value: false }
      }
    }
  },

  computed: {
    queryParams () {
      return { ...this.searchParams, pageNo: this.pagination.pageNo, pageSize: this.pagination.pageSize }
    },
    loadListApi () {
      return this.tableOption.loadListApi(this.queryParams).then((data) => {
        data = data.data || data
        this.total = data.totalCount
        return data.list
      })
    }
  },
  created () {},
  mounted () {
    this.$dynamicBus.$on('dynamicRefresh', () => {
      this.refresh()
    })
  },

  methods: {
    refresh () {
      const refreshKey = this.searchParams.refreshKey + 1
      this.onSearch({ refreshKey })
    },
    handleSizeChange (pageSize) {
      this.refresh()
    },
    handleCurrentChange (pageNo) {
      this.pagination.pageNo = pageNo
      this.onSearch({ pageNo })
    },

    onSearch (params) {
      this.searchParams = { ...this.searchParams, ...params }
    },

    selectChange (selected) {
      debugger
      this.selected = selected
    }
  }
}
</script>

<style lang="css" scoped>
.BackStageFrameWork {
  height: 100%;
  padding: 20px;
}

.table-wraper {
  height: 540px;
}
.tree-section {
  border: 1px solid grey;
}
</style>
