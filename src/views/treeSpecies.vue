<template>
  <div class="main-container hz-low-code flex flex-direction">
    <BrandBar>
      <span slot="title">资产类型管理</span>
    </BrandBar>
      <DynamicPageWrapper class="flex1   "   :actions="{...topToolBar,...lineActions}"   entityLabel="不动产管理"     >
     <curdLayout mode="tb" scene="page">
      <DynamicSearchForm
        slot="top"
        :fields="searchFields"
        :options="searchOption"
        @search="onSearch"
      ></DynamicSearchForm>
      <main slot="bottom">
      <DynamicActions
                :actions="topToolBar"
                :actionData="{selected}"
                :actionBarWraper="$el"
              ></DynamicActions>
      <section class="grid-wrap margin-top16 full-width">
        <section class="flex flex-direction" :class="['grid-col-24']">
          <BaseLazyTreeTable
            ref="treeTable"
            :searching="searching"
            :query="queryParams"
            :tableItems="lazyTreeTableItems"
            :lazyRequest="lazyTreeRequest"
            :selection-change="selecctChange"
          >
            <template v-slot:operate="scope">
              <DynamicActions
                :actions="lineActions"
                :actionData="scope.row"
                 mode="table"
              ></DynamicActions>
            </template>
          </BaseLazyTreeTable>
        </section>
      </section>
      </main>
      
    </curdLayout>
      </DynamicPageWrapper>
  </div>
</template>
<script>
import {
  buildFormFields,
  buildSearchFields,appendToPreset
} from '@/common/dynamicPage/utils/tool'
import {loadActionTipConfig} from "@/common/dynamicPage/utils/actionTools"
import {
  treeSpeciesUpdateApi,
  treeSpeciesSaveApi,
  treeSpeciesListApi,
  treeSpeciesDetailApi,
  treeSpeciesDeleteApi,
  treeSpeciesTreeApi
} from '@/network/oldtree.js'

import fields from './treeSpecies'
import BrandBar from 'components/content/BrandBar/BrandBar.vue'
import BaseLazyTreeTable from '@/components/BaseBackend/BaseLazyTreeTable'
import {
  tableOption,
} from '@/common/dynamicPage/presetConfig'


const formFields = buildFormFields(fields)
const searchFields = buildSearchFields(fields)
const searchFieldsEmptyValues = searchFields[0].children.reduce(
  (prev, next) => {
    next.key && (prev[next.key] = '')
    return prev
  },
  {}
)

export default {
  name: 'treeSpecies',
  components: { BrandBar, BaseLazyTreeTable },
  data: function () {
    return {
      searching: false,
 
      lazyTreeTableItems: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '中文名',
          key: 'name'
        },
        {
          title: '编码',
          key: 'code'
        },
        {
          title: '创建人',
          key: 'createUserName'
        },

        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新时间',
          key: 'lastUpdateTime'
        },
        {
          title: '操作',
          key: 'operate',
          width: 220,
          type: 'slot'
        }
      ],
      lazyTreeRequest: {
        search: {
          request: treeSpeciesListApi,
          axios: {
            // method: 'post',
            _staticParams: {
              // 请求中的一些常量参数
            }
          }
        },
        tree: {
          parentKey: 'parentId',
          rowKey: 'id',
          request: treeSpeciesTreeApi,
          axios: {
            // method: 'post',
            _initialParams: {
              // 只在初始加载root时起作用
              parentId: '-1' // 资产的根节点
            },
            _staticParams: {
              // 请求中的一些常量参数
            },
            _expandParams: {
              // tree展开下级节点时,传的参数
              parentId: '$row.id'
            }
          }
        }
      },
      searchFields,
      searchOption: appendToPreset('searchOption', {
        // properties: { 'label-width': '100px' }
      }),
      topToolBar: {
        create: {
          label:'新增',
          actionType:'dialogFormAction',
          isLoadData: false,
          componentProperties:{
            type:'primary',
            icon:'el-icon-plus'
          },
           singleCol: true,
           containerProperties:{
              title: "新增资产类型",
              width: "36%",
            },
              formItemList: formFields,
              saveAction: {
                  apiPromise: treeSpeciesSaveApi,
                },
        },

        bulkdelete:  {
          label: "批量删除",
          actionType:'requestApiAction',
          isLoadData: true,
          actionDataKey:'selected',
          apiPromise: treeSpeciesDeleteApi,
          ...loadActionTipConfig(this)
        },
      },

      lineActions: {
        update:  {
          label: '更新',
          actionType:'dialogFormAction',
          apiPromise: treeSpeciesDetailApi,
          componentProperties:{
             type:tableOption.actionBtnType
          },
            containerProperties:{
              title: "更新资产类型",
              width: "36%",
            },
            singleCol: true,
  
              formItemList: formFields,
                saveAction: {
                  apiPromise: treeSpeciesUpdateApi,
                },
                
        },
        detail: {
          label: '查看',
          actionType:'dialogFormAction',
          apiPromise: treeSpeciesDetailApi,
          componentProperties:{
             type:tableOption.actionBtnType
          },
          containerProperties:{
              title: "资产类型详情",
              width: "36%",
            },
                textModel: true,
                singleCol: true,
                formProperties: {
                  'label-width': '120px',
                  'label-position': 'right'
                },
         
              formItemList: formFields,
              saveAction: null
       
       
        },
        delete:   {
          label: '删除',
          actionType:'requestApiAction',
          apiPromise: treeSpeciesDeleteApi,
          componentProperties:{
             class:['text-grey-dark2'],
             type:'text'
          },
          ...loadActionTipConfig(this)
        }
      },
      searchParams: searchFieldsEmptyValues,
      total: 1
    }
  },
  computed: {
    queryParams () {
      return { ...this.searchParams, ...this.pagination }
    },
 
  },
  watch:{
    queryParams(queryParams){
         
        this.searching=true
    }
  },
  created () {
    this.selected = []
    this.$dynamicBus.$on('dynamicRefresh', () => {
      debugger
      this.refresh()
    })
  },

  methods: {
    bulkDelete(){
      
    },
   
    refresh () {
       this.$refs.treeTable.forceFreshTreeTable()
    },
    
    onSearch (params) {
      this.searchParams = { ...this.searchParams, ...params }
    },

     
    selecctChange (selected) {
      debugger
      this.selected = selected
    }
  }
}
</script>

<style lang="less" scoped>
.BackStageFrameWork {
  height: 100%;
  padding: 20px;
}
.margin-top16 {
  margin-top: 16px;
}
.table-wraper {
  height: 540px;
}
.tree-section {
  border: 1px solid grey;
}
</style>
