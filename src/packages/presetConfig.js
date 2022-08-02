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
    actionBtnType: 'text', // 操作按钮类型
    indexCol: {
        width: 48,
        fixed: 'left',
        label: '序号',
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
    colNum: 2

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

// export const actionPopProperties = {
//     'confirm-button-text': '好的',
//     'cancel-button-text': '不用了',
//     title: '确定执行该操作吗？',
//     icon: 'el-icon-warning'
// }

// export const msgBoxProperties = {
//     title: '提示',
//     message: '确定执行该操作吗？',
//     showCancelButton: true,
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//     lockScroll: true
// }

export const presetConfig = {
    data: {
        baseFormSectionName: '基础信息',
        dialogWidth: '50%',
        btnSize: 'small',
        actionTip: 'tip',
        mainKey: 'id',
        defaultDialogMode: 'router',
        searchOption,
        tableOption,
        pagination,
        treeOption,
        formOption,
        dynamicFormOption,
        // actionPopProperties,
        // msgBoxProperties,
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

export default presetConfig
