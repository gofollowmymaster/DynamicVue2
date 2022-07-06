<template>
  <DynamicCurd
    :entityLabel="entityLabel"
    :fields="fields"
    :optionsProps="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurd>
</template>
<script>

import {
  maintainUpdateApi,
  maintainSaveApi,
  protectDetailApi,
  protectListApi,
  maintainDeleteApi
} from '@/network/assetsMaintain.js'
 

import { buildDynamicSelectOption } from "@/network/global";

const entityLabel = '养护记录'
    
  const fields = [
 
  { key: "index", type: "index", label: "序号", tableOption:{width:50}},

   
   {
    label: '固定资产名称',
    key: 'treeManageId',
    type: 'FormOldtreeSelector',
    formOption: {
      
    }
  },
 
  {
    label: '固定资产编号',
    key: 'treeNumber',
    type: 'FormInput',
 
    formOption: {
 
    }
  }, 
 
  {
    label: '管理单位',
    key: 'unitName',
    tableOption: { sort:6 },
    formOption: {
     
    }
  },
  {
    label: '管理人员',
    key: 'manageUserName',
    type: 'FormInput',
    formOption: {
    
    },
    tableOption: { sort:7 },

    
  },
 
  {
    label: '管理人员联系方式',
    key: 'manageUserPhone',
    tableOption: {},
    formOption: {
      rules: ['required'],
        properties: {
        disabled:true
      }
    }
  },
  {
    label: '保护人员',
    key: 'userId',
    type: 'FormInnerOrgSelPersonSelector',
    formOption: {
      rules: ['required'],
      
    },
    tableOption:{
      sort:4,
      key: 'userName',

    }
  },
 
  {
    label: '保护类型',
    key: 'protectType',
    type: 'FormDynamicSelect',
     options:  buildDynamicSelectOption('tree_protect_type'), 
     searchOption:{
       key:'cureType'
     },
    tableOption: {
      sort:3
    },
    formOption: {
      rules: ['required'],
    }
  },
  {
    label: '保护时间',
    key: 'cureTime',
    type:"FormDateTime",
    tableOption: {
      sort:4
    },
    formOption: {
      key:'time',
      rules: ['required'],
    }
  },
    {
    label: '保护时间',
    key: 'handleTime',
    type:"FormDateTimeRange",
      searchOption:{
      wraperProperties:{
        class:['grid-col-6', 'grid-col-lg-6', 'grid-col-sm-6','grid-col-ss-12', 'grid-col-xs-12','grid-col-pp-24']
      }
    }
  },
  
{
  key: "createUserName",
  label: "创建人",
  detailable:true,
},
{
  key: "createTime",
  label: "创建时间",
  detailable:true,

},
{
  key: "lastUpdateTime",
  label: "更新时间",
  detailable:true,
},
  {
    label: ' 保护内容',
    key: 'context',
    type:'FormTextarea',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      },
      rules: ['required'],
    }
  },
{
  key: 'filesBefore',
  label: '养护前照片',
  type: 'FormUpload',
  formSection:'附件信息',
  formOption: {
    wraperProperties: {
      class: ['grid-col-24']
    },
    properties: {
      // disabled: true,
      'list-type': 'picture-card',
      accept:'img',
    },
    extra: {
      btn_text: '上传',
      tip: '单个附件大小限制20Mb，最多上传200个附件',
     
    }
  }
},
 
{
  key: 'filesAfter',
  label: '养护后照片',
  type: 'FormUpload',
  formSection:'附件信息',
  formOption: {
    wraperProperties: {
      class: ['grid-col-24']
    },
    properties: {
      // disabled: true,
       'list-type': 'picture-card',
      accept:'img',
    },
    extra: {
      btn_text: '上传',
      tip: '单个附件大小限制20Mb，最多上传200个附件',
    }
  }
},
  {
    label: '更新时间',
    key: 'lastUpdateTime',
        tableOption: { sort:9 },
  },
  
]
import { appendToPreset } from '@/packages/utils/tool';

export default {
  name: 'protectLog',
  components: {
  },
    props:{
    data:{
      type:[Object,String,Number]
    }
  },
  data () {
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises:{
        list:(params)=>protectListApi({treeMangeId:this.data.id,...params}),
        detail:protectDetailApi,
      },
      pageOptions: {
        topToolBar:null,
        listOption: {
          lineActions:{
             update:null,
             detail:{
                label: '查看',
                 actionType:'routerAction',
                router:(data)=>{
                    return `/assets/manage/protect?id=${data.id}&action=detail`
                },
                routerAction:'push',
             },
             delete:null,
            //  router:'/'
          }
        },
        treeOption:null
      }
    }
  }
}
</script>
<style lang="css" scoped></style>
