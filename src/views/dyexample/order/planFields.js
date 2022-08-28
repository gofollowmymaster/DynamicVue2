import {    elementUploadFileApi, globalDownloadFileById } from '@/api/global'

export default  [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchOption: true },
    { key: 'id', type: 'FormHide', label: '', formOption: {},  formSection: '基础信息'  
    },

    {
        'key': 'orderCode',
        'label': '订单编号',
        formSection: '基础信息',  
        'type': 'FormInput',
        'formOption': {
            rules: ['required']
        },
        'tableOption': {}
    },
    {
        'key': 'orderName',
        'label': '订单名称',
        formSection: '基础信息',  
        'type': 'FormInput',
        'formOption': {
            rules: ['required']

        },
        'tableOption': {}
    },
    
    {
        'key': 'capitalBudgeting',
        'label': '投资预算',
        formSection: '基础信息',  
        'type': 'FormNumber',
        'formOption': {
            rules: ['required'],
            append: '元'
        },
        'tableOption': {}
    },
    {
        'key': 'buildType',
        'label': '客户来源',
        formSection: '基础信息',  
        'type': 'FormSelect',
        options: [{
            value: '0',
            label: '新建'

        }, {
            value: '1',
            label: '占绿恢复'
        },
        {
            value: '2',
            label: '改建'
        }],
        'formOption': {
        },
        'tableOption': {},
        searchOption: {}
    },
    {
        'key': 'useLandDictId',
        'label': '支付方式',
        formSection: '基础信息',  
        'type': 'FormDynamicSelect', 
        dictType: ('order_use_land'), 
        'formOption': {},
        searchOption: {},
        tableOption: {
            key: 'useLandDictLabel'
        }
    },
    {
        'key': 'orderAttributeDictId',
        'label': '订单属性',
        formSection: '基础信息',  
        'type': 'FormDynamicSelect', 
        dictType: ('order_attribute'), 
        tableOption: {
            key: 'orderAttributeDictLabel'
        },
        searchOption: {}
    },
    {
        'key': 'orderTypeDictId',
        'label': '订单类别',
        formSection: '基础信息',  
        'type': 'FormDynamicSelect', 
        dictType: ('order_type'), 
        'formOption': {
            key: 'orderTypeDictLabel'
        },
        searchOption: {}
    },
 
    {
        'key': 'orderPosition',
        'label': '订单位置',
        formSection: '基础信息',
        'type': 'FormSelectPoint',
        'formOption': {
            rules: ['required']
        }
    },
    {
        'key': 'deptId',
        'label': '责任单位',
        formSection: '基础信息',
        'type': 'FormInput',
        'formOption': {},
        'tableOption': {
            key: 'deptName'
        }
    },
    {
        'key': 'geogId',
        'label': '地理区域',
        formSection: '基础信息',
        'type': 'FormDrawElement',
        'formOption': {
            defaultValue: []
        }
    },
    {
        'key': 'planStartTime',
        'label': '计划处理日期',
        formSection: '基础信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        },
        'tableOption': {}
    },
    {
        'key': 'planEndTime',
        'label': '计划完成日期',
        formSection: '基础信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        },
        'tableOption': {}
    },
   
   
    {
        'key': 'description',
        'label': '订单简介',
        formSection: '基础信息',
        'type': 'FormTextarea',
        'formOption': {
            col: 2,
            maxlength: 500
        }
    },
    {
        'key': 'planFileIds',
        'label': '附件',
        formSection: '基础信息',
        'type': 'FormUpload',
        'formOption': {
            col: 2,
            'list-type': 'table',
            accept: '*',
            'auto-upload': false,
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制200Mb，最多上传20个附件',
                apiPromise: elementUploadFileApi,
                downloadApi: globalDownloadFileById
            }
        }
    },
    {
        'key': 'designUnit',
        'label': '客户单位',
        formSection: '客户信息',
        'type': 'FormInput',
        'formOption': {
            rules: ['required'],
            maxlength: 50
        }
    },
    {
        'key': 'designUser',
        'label': '客户人',
        formSection: '客户信息',
        'type': 'FormInput',
        'formOption': {
            maxlength: 50
        }
    },
    {
        'key': 'designDate',
        'label': '客户完成时间',
        formSection: '客户信息',
        'type': 'FormDate',
        'formOption': {

        }
    },
    {
        'key': 'designFileIds',
        'label': '附件',
        formSection: '客户信息',
        'type': 'FormUpload',
        'formOption': {
            col: 2,
            'list-type': 'table',
            accept: '*',
            'auto-load': false,
            extra: {
                btn_text: '上传',
                tip: '单个附件大小限制200Mb，最多上传20个附件',
                apiPromise: elementUploadFileApi,
                downloadApi: globalDownloadFileById
            }
        }
    },
    {
        'key': 'approveStatus',
        'label': '申请是否已通过',
        formSection: '申请信息',
        'type': 'FormRadio',
        options: [
            {
                value: '0',
                label: '无需申请'
            },
            {
                value: '1',
                label: '已通过'
            },
            {
                value: '2',
                label: '未通过'
            }
        ],
        'formOption': {
            defaultValue: '0',
            rules: ['required']
        },
        'tableOption': {
            label: '申请信息'
        },
        searchOption: {
            label: '申请信息',
            'type': 'FormSelect'

        }
    },
    {
        'key': 'approveOverallArea',
        'label': '申请总体数量',
        formSection: '申请信息',
        'type': 'FormNumber',
        'formOption': {
            append: '㎡',
            expressProp: {
                hidden: '#{approveStatus}!=1'
            },
            rules: ['required']
        }
    },
    {
        'key': 'approveGreenArea',
        'label': '申请绿地数量',
        formSection: '申请信息',
        'type': 'FormNumber',
        'formOption': {
            append: '㎡',
            expressProp: {
                hidden: '#{approveStatus}!=1'
            },
            rules: ['required']
        }
    },
    {
        'key': 'approveWaterArea',
        'label': '申请水体数量',
        formSection: '申请信息',
        'type': 'FormNumber',
        'formOption': {
            append: '㎡',
            expressProp: {
                hidden: '#{approveStatus}!=1'
            },
            rules: ['required']
        }
    },
    {
        'key': 'approveCapitalBudgeting',
        'label': '申请投资预算',
        formSection: '申请信息',
        'type': 'FormNumber',
        'formOption': {
            append: '㎡',
            expressProp: {
                hidden: '#{approveStatus}!=1'
            },
            rules: ['required']
        }
    },
    {
        'key': 'approveDate',
        'label': '申请通过日期',
        formSection: '申请信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required'],
            expressProp: {
                hidden: '#{approveStatus}!=1'
            }
        }
    },
    {
        'key': 'approveFileIds',
        'label': '附件',
        formSection: '申请信息',
        'type': 'FormUpload',
        'formOption': {
            expressProp: {
                hidden: '#{approveStatus}!=1'
            },
            col: 2,
            'list-type': 'table',
            accept: '*',
            'auto-load': true,
            btn_text: '上传',
            tip: '单个附件大小限制200Mb，最多上传20个附件',
            apiPromise: elementUploadFileApi,
            downloadApi: globalDownloadFileById
        }
    },
     
  
]
 