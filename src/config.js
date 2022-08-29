const amapWebKey = 'ffe3f53e63db6ca6bbe1d85264a8fc5b'
const amapWebMapKey = '467fddcf60be0b46a5506d94cd2cc858'
const tandiMapKey = 'b0c8343e73356d02148906ef935c9cf8'

const TK_KEY = 'af3a42f19a33f75acc37a6f5b7e81331'
const vecLayer = `http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=vec_w&tk=${TK_KEY}&x=[x]&y=[y]&l=[z]`
const cvaLayer = `http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=cva_w&tk=${TK_KEY}&x=[x]&y=[y]&l=[z]`


const amapStyleConfig = {
    zoom: 15,
    zooms: [13, 18],
    showLabel: true,
    expandZoomRange: false,
    animateEnable: true,
    jogEnable: true,
    center: [106.559675, 29.559168],
    labelzIndex: 120,
    lockMapBound: 10000,
    regionPath: [],
    // layers: [   { type: 'tile', url: cvaLayer },{ type: 'tile', url: vecLayer }],
}
const isDebug = true

export const searchOption = {
    properties: {
        'label-width': '108px',
        'label-position': 'right',
        size: 'small'
    },
    borderForm: false,
    trigger: 'click',
    resetable: true,
    searchLabel: '搜索',
    searchClasses: [
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
        'empty-text': '暂无数据',
        align: 'left',
        'row-key': 'id',
        'header-align': 'left',
        'row-style': { height: '42px' },
        'cell-style' :{padding:'8px 0px'},
        'header-row-style': { height: '42px', 'line-height': '42px', padding: '0px 8px' },
        'header-cell-style': { 'text-overflow': 'ellipsis', padding: '0px 0px 0px 0px', height: '32px', 'line-height': '32px' }
    },
    colOptions: {
    // width:120,
        minWidth: 90,
        'show-overflow-tooltip': true,
        align: 'left',
        'header-align': 'left'
    },
    actionColWidth: 0, // 操作栏宽度
    actionBtnType: 'text', // 操作按钮类型
    indexCol: {
        width: 48,
        fixed: 'left',
        label: '序号'
    }
}

export const pagination = {
    small: false,
    'current-page': 1,
    pageSize: 10,
    layout: 'total,sizes, prev, pager, next, jumper',
    'hide-on-single-page': false,
    'page-sizes': [10, 20, 30, 40, 50],
    background:true
}

export const treeOption = {
    lazy: false,
    'node-key': 'id',
    props: {
      label: 'label',
      children: 'children',
      isLeaf: 'leaf'
    },
    'current-node-key': null,
    'highlight-current': true,
    // fieldName: 'test'
}

export const formOption = {
    
    formProperties: {
        'hide-required-asterisk': false,
        'label-position': 'right',
        'label-width': '130px'

        // "inline-message":true,
        // size:'medium'
    },
    borderForm: false,
    showFoldBtn: true,
    'label-width': '130px',
    'label-position': 'right',
    pageLabelWidth: '160px',
    colNum: 2,
    testTool: true

}

export const popTipOptions = {
    actionPopComponent: 'popConfirm',
    actionPopProperties: {
        'confirm-button-text': '确定',
        'cancel-button-text': '取消',
        title: '确定执行该操作吗？',
        icon: 'el-icon-warning'
    }
}

export const msgBoxTipOptions = {
    title: '提示',
    message: '确定执行该操作吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    lockScroll: true
}

export const drawerProperties = {
    size: '40%',
    modal: true,
    'modal-append-to-body': true,
    'append-to-body': false,
    'lock-scroll': false,
    'wrapperClosable': true,
    'close-on-press-escape': true,
    'show-close': true,
    'center': false,
    'destroy-on-close': false,
    direction: 'rtl',
    withHeader: true

}
export const dialogProperties = {
    width: '40%',
    fullscreen: false,
    top: '15vh',
    modal: true,
    'modal-append-to-body': true,
    'append-to-body': false,
    'lock-scroll': true,
    'close-on-click-modal': false,
    'close-on-press-escape': true,
    'show-close': true,
    'center': false,
    'destroy-on-close': false
}
export const pageProperties = {
   
}

export default {
    //模板项目配置用
    tinymceLanguageUrl: '/DynamicVue2/static/tinymce/langs/zh_CN.js',
    tinymceSkinUrl: '/DynamicVue2/static/tinymce/skins/ui/oxide',
    amapWebKey,
    amapWebMapKey,
    mapCenter: [106.680603, 29.402348],
    tandiMapKey,
    amapStyleConfig,


    //dyVue 全局配置
    baseFormSectionName: '基本信息',       //表单默认区块（formSection）默认名字
    btnSize: 'mini',                      //按钮尺寸
    mainKey: 'id',                        //主键
    isDebug,                              //是否调试模式  调试模式时在开发环境中会出现自动填充表单按钮
    defaultDialogActionMode: 'router',   //打开‘弹窗’操作 默认模式 router  dailog 可选
    defaultContainerType: 'el-dialog',   //弹窗    默认容器    （defaultDialogActionMode = dialog 有效）
    searchOption,                        //搜索表单配置
    tableOption,                         //表格配置
    pagination,                          //分页配置
    treeOption,                          //树配置
    formOption,                          //表单配置
    popTipOptions,                       //操作提示气泡配置
    msgBoxTipOptions,                    //操作提示消息配置
    actionTip: 'msg',                    //操作提示方式  气泡（tip）、消息（msg）可选
    drawerProperties,                    //抽屉属性
    dialogProperties,                    //弹窗属性
    pageProperties,                         
    // dynamicFormOption,
    // formWraperClass: ['grid-col-xs-24', 'grid-col-pp-24'],    // 表单
    // detailWraperClass: ['grid-col-xs-24', 'grid-col-pp-24'],  //
    // searchFormWraperClass: [                                  //
    //     'grid-col-sm-8',
    //     'grid-col-ss-8',
    //     'grid-col-xs-12',
    //     'grid-col-pp-24'
    // ]
}