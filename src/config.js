const dev = '//23.13.5.135:8090'
const amapWebKey = 'ffe3f53e63db6ca6bbe1d85264a8fc5b'
const amapWebMapKey = '467fddcf60be0b46a5506d94cd2cc858'
const tandiMapKey = 'b0c8343e73356d02148906ef935c9cf8'
const amapStyleConfig = {
  zoom: 15,
  zooms: [13, 18],
  showLabel: false,
  expandZoomRange: false,
  animateEnable: true,
  jogEnable: true,
  center: [106.559675, 29.559168],
  labelzIndex: 120,
  lockMapBound: 10000,
  regionPath: []
}
const isDebug = false
const host = dev

export const searchOption = {
  properties: {
    'label-width': '108px',
    'label-position': 'right',
    size: 'small'
  },
  borderForm: false,
  trigger: 'click',
  resetable: true,
  searchLabel: '搜索1',
  searchClasses: [
    'grid-col-6',
    'grid-col-lg-4',
    'grid-col-sm-6',
    'grid-col-ss-8',
    'grid-col-xs-12'
  ],
  mainNum: 3
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
    'empty-text': '暂无数据1',
    align: 'left',
    'row-key': 'id',
    'header-align': 'left',
    'row-style': { height: '48px' },
    // 'cell-style' :{padding:'4px 8px'},
    'header-row-style': { height: '48px', 'line-height': '48px', padding: '0px 8px' },
    'header-cell-style': { 'text-overflow': 'ellipsis', padding: '0px 0px 0px 0px', height: '36px', 'line-height': '36px' }
  },
  colOptions: {
    // width:120,
    minWidth: 90,
    'show-overflow-tooltip': true,
    align: 'left',
    'header-align': 'left'
  },
  actionColWidth: 0, // 操作栏宽度
  actionBtnType: 'text' // 操作按钮类型
}

export const pagination = {
  // small: false,
  // 'current-page': 1,
  // pageSize: 10,
  // layout: 'total,sizes, prev, pager, next, jumper',
  // 'hide-on-single-page': false,
  // 'page-sizes': [10, 20, 30, 40, 50]
  // background:true
}

export const treeOption = {
  // lazy: true,
  // 'node-key': 'deptId',
  // props: {
  //   label: 'deptName',
  //   children: 'children',
  //   isLeaf: 'leaf'
  // },
  // 'current-node-key': null,
  // 'highlight-current': true,
  // fieldName: 'test'
}

export const formOption = {
  // formProperties: {
  //   'hide-required-asterisk': false,
  //   'label-width': '160px',
  //   'label-position': 'right',
  //   // size:'medium'
  // },
  // borderForm: false,
  // showFoldBtn: true,

}

export default {
  actionTip: 'msg',
  isDebug,
  host,
  staticHost: 'http:' + host + '/file/static',
  amapWebKey,
  amapWebMapKey,
  tandiMapKey,
  amapStyleConfig,
  regionCode: '500103000000',
  defaultDialogMode: 'dialog',
  searchOption,
  tableOption,
  pagination,
  treeOption,
  formOption
}
