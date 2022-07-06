<template>
    <el-dialog
      :title="title"
      :visible.sync="visible.value"
      v-bind="$attrs"
      :show-close="true"
      :close-on-click-modal="true"
      :close-on-click-escape="false"
      :append-to-body="true"
      :modal-append-to-body="true"
      :destroy-on-close="true"
      class="hz-low-code">
    <DynamicSearchForm
      v-if="options.searchFields && options.searchFields.length"
      :fields="options.searchFields"
      :options="options.searchOption"
      @search="onSearch"
    ></DynamicSearchForm>
      <section
        class="flex flex-direction "     >
        <DynamicTable
          class="table-wraper flex1"
          :table="options.listOption"
          :columns="options.tableFields"
          :apiPromise="loadListApiPromise"
          :selected="selectItems"
          @select-all="selectAll"
          @selection-change="selectChange"
          @select="select"
        ></DynamicTable>
        <el-pagination
          class="mt16"
          background
          v-bind="options.pagination"
          :total="total"
          @size-change="handleSizeChange"
          :pageSize.sync="pagination.pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </section>
       <span slot="footer" class="dialog-footer">
      <el-button @click="clear">清 除</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
import {
  buildSearchFields,
  buildTableFields,
  isEmpty,deepMerge
} from '../../utils/tool'
import {
  searchOption,
  pagination,
  tableOption,
} from '../../presetConfig'
export default {
  name: 'tableSelector',
  props: {
    title:String,
    visible:{
      type:Object,
      default(){
        return {value:false}
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
    selected:{
      type:Object,
      default(){
        return {}
      }
    },
    multiple:{
      type:Boolean,
      default:false
    }
    
  
  },
 

  data: function () {
    console.log('--optionsProps--', this.optionsProps)
    
    return {
      isEmpty,
      searchParams: { refreshKey: '' },
      pagination: {
        pageNo: 1,
        pageSize: pagination.pageSize
      },
      total: 1,
      selectItems:{}
 
     
    }
  },
  watch:{
    selected:{
      handler(selected){
        this.selectItems=selected 
      },
      deep:true,
      immediate:true,
    }
  },
  
  computed: {
    options () {
      
      const searchFields = buildSearchFields(this.fields)
      const tableFields = buildTableFields(this.fields)
      tableOption.properties['row-key']='id'
      return deepMerge({
          searchOption:{...searchOption,},
          pagination,
          searchFields,
          tableFields,
          tableOption,
        },this.optionsProps,true)
      
    },
    queryParams () {
      return { ...this.searchParams, ...this.pagination }
    },
    loadListApiPromise () {
      return this.options.tableOption
        .loadListApi(this.queryParams)
        .then((data = {}) => {
          
          data = data.data || data
          this.total = data.totalCount
          this.tableData=data.list
          return data.list
        })
    },

  },
  created () {
    this.pagination.pageSize =
      this.options.pagination.pageSize || this.pagination.pageSize
    
  },

  methods: {
    confirm(){
        if (Object.values(this.selectItems)?.length < 1) {
        this.$alert("您还没有选择任何要素", "", {
          confirmButtonText: "确定",
          showCancelButton: true,
          callback: (action) => {
            if (action === "confirm") {
              this.visible.value = false;
            }
          },
        });
        return;
      }
      this.visible.value = false;
      this.$emit('change',this.selectItems)
    },
    clear(){
      this.selectItems={}
      this.$emit('change',{})

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
    refresh () {
      const refreshKey = this.searchParams.refreshKey++
      this.onSearch({ refreshKey })
    },

    select(data,row){
      debugger
         const mainKey =this.options.tableOption.properties['row-key']||'id'
        if(this.multiple){
            if(  this.selectItems[row[mainKey]]?.[mainKey]){
            delete this.selectItems[row[mainKey]]
              return 
          }
          this.selectItems[row[mainKey]]=row
          return
        }
        //单选
         this.selectItems={
           [row[mainKey]]:row
         }
    },
    selectChange (selected) {
      debugger
    },
    selectAll(data){
      const mainKey =this.options.tableOption.properties['row-key']||'id'
      if(!this.multiple){
          const curSelected=  this.selectItems
          this.selectItems={}
          this.$nextTick(()=>{
                this.selectItems=curSelected
          })
        return 
      }
      if(data.length){
         data.forEach((row)=>{
          this.selectItems[row[mainKey]]=row
         })
      }else{
          this.tableData.forEach((row)=>{
            delete this.selectItems[row[mainKey]]
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-wraper {
  height: 540px;
}
.border-grey {
  border: 1px solid var(--grey);
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
</style>
