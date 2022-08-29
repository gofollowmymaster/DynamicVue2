import { deepMerge, superType, deepCopy } from './utils/tool'

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
    mainNum: 3,
    testTool: false
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
        'cell-style' :{padding:'6px 0px'},
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
    'page-sizes': [10, 20, 30, 40, 50]
    // background:true
}

export const treeOption = {
    lazy: false,
    'node-key': 'id',
    props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
    },
    'current-node-key': null,
    'highlight-current': true,
    fieldName: 'category'
}

export const formOption = {
    formProperties: {
        'hide-required-asterisk': false,
        'label-position': 'right',
        'label-width': '130px'

    // "inline-message":true,
    // size:'medium'
    },
    borderForm: true,
    showFoldBtn: true,
    'label-width': '130px',
    'label-position': 'right',
    pageLabelWidth: '160px',
    colNum: 2,
    testTool: false

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
        textMode: false
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

const popTipOptions = {
    actionPopComponent: 'popConfirm',
    actionPopProperties: {
        'confirm-button-text': '确定',
        'cancel-button-text': '取消',
        title: '确定执行该操作吗？',
        icon: 'el-icon-warning'
    }
}
const msgBoxTipOptions =  {
    
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
    fullscreen: false,
    top: '15vh',
    modal: true,
    'modal-append-to-body': true,
    'append-to-body': false,
    'lock-scroll': true,
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

export const presetConfig = {
    data: {
        baseFormSectionName: '基础信息',
        btnSize: 'small',
        actionTip: 'tip',
        mainKey: 'id',
        defaultDialogActionMode: 'dialog',
        defaultContainerType: 'el-drawer',
        searchOption,
        tableOption,
        pagination,
        treeOption,
        formOption,
        dynamicFormOption,

        drawerProperties,
        dialogProperties,
        pageProperties,
 
        popTipOptions,
        msgBoxTipOptions,
        formWraperClass: ['grid-col-xs-24', 'grid-col-pp-24'],
        detailWraperClass: ['grid-col-xs-24', 'grid-col-pp-24'],
        searchFormWraperClass: [
            'grid-col-sm-8',
            'grid-col-ss-8',
            'grid-col-xs-12',
            'grid-col-pp-24'
        ]
    },

    setCustomConfig(config) {
        Object.keys(config).forEach(key => {
            if (['array', 'object'].includes(superType(this.data[key]))) {
                this.data[key] = deepMerge(this.data[key], config[key])
                return
            }
            this.data[key] = config[key]
        })
        return this.data
    },
    getConfig(key) {
        return deepCopy(this.data[key])
    }
}


export function loadPresetConfig(presetKey) {
    return presetConfig.getConfig(presetKey)
}
export function appendToPreset(presetKey, obj = {}, isDeleteNull = false) {
    const preset = presetConfig.getConfig(presetKey)

    if (!preset) {
        throw new Error('没有找到指定预设配置' + presetKey)
    }
    if (superType(preset) !== superType(obj)) {
        throw new Error('自定义配置与预设配置类型不同' + presetKey + '自定义：' + JSON.stringify(obj))
    }
    if (['array', 'object'].includes(superType(preset))) {
        return deepMerge(preset, obj, isDeleteNull)
    }
}

export default presetConfig
