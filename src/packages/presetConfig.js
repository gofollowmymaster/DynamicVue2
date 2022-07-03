import {appendToPreset, deepMerge} from "./utils/tool"
const isDebug=window._config?.isDebug
const showTestTool=process.env.NODE_ENV == 'development'?true:isDebug
// const showTestTool=false

export const searchOption = {
  properties: {
    'label-width': '108px',
    'label-position': 'right',
    size:'small'
  },
  // showTestTool,
  borderForm: false,
  trigger: 'click',
  resetable: true,
  searchLabel: '搜索',
  searchClasses: [ 
    'grid-col-6',
    'grid-col-lg-4',
    'grid-col-sm-6',
    'grid-col-ss-8',
    'grid-col-xs-12'
  ],
  mainNum:3
}
export const tableOption = {
  hasCheckbox: true,
  properties: {
    stripe: true,
    border: true,
    'row-class-name': '',
    'highlight-current-row': true,
    selectable: true,
    expand: true,
    'show-header': true,
    'empty-text': '暂无数据',
    align: 'left',
    'row-key': 'id',
    'header-align': 'left',
    'row-style': { height: '48px' },
    // 'cell-style' :{padding:'4px 8px'},
    'header-row-style':{height:'48px','line-height':'48px',padding:'0px 8px',},
    'header-cell-style':{'text-overflow':'ellipsis',padding:'0px 0px 0px 0px',height:'36px','line-height':'36px',}
  },
  colOptions: {
    // width:120,
    minWidth: 90,
    'show-overflow-tooltip': true,
    align: 'left',
    'header-align': 'left'
  },
  actionColWidth:0,    //操作栏宽度
  actionBtnType:'text',  //操作按钮类型
}

export const pagination = {
  small: false,
  'current-page': 1,
  pageSize: 10,
  layout: 'total,sizes, prev, pager, next, jumper',
  'hide-on-single-page': false,
  'page-sizes': [10, 20, 30, 40, 50]
  // background:true
}

export const treeOption = {
  lazy: true,
  'node-key': 'deptId',
  props: {
    label: 'deptName',
    children: 'children',
    isLeaf: 'leaf'
  },
  'current-node-key': null,
  'highlight-current': true,
  fieldName: 'test'
}

export const formOption = {
  formProperties: {
    'hide-required-asterisk': false,
    'label-width': '160px',
    'label-position': 'right',
    // size:'medium'
  },
  borderForm: false,
  showFoldBtn: true,
  showTestTool
}

export const submitActionOption = {
  component: 'el-button',
  permission: '',
  actionType: 'submit',
  isLoadData: false,
  label: '提交',
  apiPromise: () => Promise.resolve(),
  properties: {
    type: 'primary',
    size: 'small'
  },
  callback: {
    closeModal: true,
    showTip: true,
    refresh: true,
    reset: true
  }
}
export const dynamicFormOption = {
  class: ['grid-col-24'],
  // apiPromise: () => Promise.resolve(),
  apiPromise: null,

  formItemList: [],
  formOption: {
    ...formOption,
    textModel: false
  },
  actions: {
    save: deepMerge(submitActionOption, {
      label: '保存'
    }),
    cancel: {
      actionType: 'close',
      label: '取消'
    }
  }
}

export const dynamicConfig={
   actionTip:'tip'
}
 
export default {
  searchOption,tableOption,pagination,treeOption,formOption,dynamicFormOption,
  submitActionOption
}
