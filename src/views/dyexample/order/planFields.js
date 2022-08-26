import {    elementUploadFileApi, globalDownloadFileById } from '@/api/global'

export default  [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchOption: true },
    { key: 'id', type: 'FormHide', label: '', formOption: {},  formSection: '立项信息'  
    },

    {
        'key': 'orderCode',
        'label': '订单编号',
        formSection: '立项信息',  
        'type': 'FormInput',
        'formOption': {
            rules: ['required']
        },
        'tableOption': {}
    },
    {
        'key': 'orderName',
        'label': '订单名称',
        formSection: '立项信息',  
        'type': 'FormInput',
        'formOption': {
            rules: ['required']

        },
        'tableOption': {}
    },
    {
        'key': 'overallArea',
        'label': '总体规划面积',
        formSection: '立项信息',  
        'type': 'FormNumber',
        'formOption': {
            rules: ['required'],
            append: '㎡'
        },
        'tableOption': {}
    },
    {
        'key': 'greenArea',
        'label': '绿地规划面积',
        formSection: '立项信息',  
        'type': 'FormNumber',
        'formOption': {
            rules: ['required'],
            append: '㎡'
        },
        'tableOption': {}
    },
    {
        'key': 'waterArea',
        'label': '水体规划面积',
        formSection: '立项信息',  
        'type': 'FormNumber',
        'formOption': {
            rules: ['required'],
            append: '㎡'
        },
        'tableOption': {}
    },
    {
        'key': 'capitalBudgeting',
        'label': '投资预算',
        formSection: '立项信息',  
        'type': 'FormNumber',
        'formOption': {
            rules: ['required'],
            append: '元'
        },
        'tableOption': {}
    },
    {
        'key': 'buildType',
        'label': '建设类型',
        formSection: '立项信息',  
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
        'label': '用地性质',
        formSection: '立项信息',  
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
        formSection: '立项信息',  
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
        formSection: '立项信息',  
        'type': 'FormDynamicSelect', 
        dictType: ('order_type'), 
        'formOption': {
            key: 'orderTypeDictLabel'
        },
        searchOption: {}
    },
    {
        'key': 'admId',
        'label': '行政区划',
        formSection: '立项信息',
        'type': 'FormInput',
        searchOption: {sort: 2},
        'formOption': {
            rules: ['required']
        }
    },
    {
        'key': 'orderPosition',
        'label': '订单位置',
        formSection: '立项信息',
        'type': 'FormSelectPoint',
        'formOption': {
            rules: ['required']
        }
    },
    {
        'key': 'deptId',
        'label': '责任单位',
        formSection: '立项信息',
        'type': 'FormInput',
        'formOption': {},
        'tableOption': {
            key: 'deptName'
        }
    },
    {
        'key': 'geogId',
        'label': '地理图层ID',
        formSection: '立项信息',
        'type': 'FormDrawElement',
        'formOption': {
            defaultValue: []
        }
    },
    {
        'key': 'planStartTime',
        'label': '计划处理日期',
        formSection: '立项信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        },
        'tableOption': {}
    },
    {
        'key': 'planEndTime',
        'label': '计划竣工日期',
        formSection: '立项信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        },
        'tableOption': {}
    },
   
    {
        'key': 'planDate',
        'label': '计划制定日期',
        formSection: '立项信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        }
    },
    {
        'key': 'description',
        'label': '订单简介',
        formSection: '立项信息',
        'type': 'FormTextarea',
        'formOption': {
            col: 2,
            maxlength: 500
        }
    },
    {
        'key': 'planFileIds',
        'label': '附件',
        formSection: '立项信息',
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
        'label': '设计单位',
        formSection: '设计信息',
        'type': 'FormInput',
        'formOption': {
            rules: ['required'],
            maxlength: 50
        }
    },
    {
        'key': 'designUser',
        'label': '设计人',
        formSection: '设计信息',
        'type': 'FormInput',
        'formOption': {
            maxlength: 50
        }
    },
    {
        'key': 'designDate',
        'label': '设计完成时间',
        formSection: '设计信息',
        'type': 'FormDate',
        'formOption': {

        }
    },
    {
        'key': 'designFileIds',
        'label': '附件',
        formSection: '设计信息',
        'type': 'FormUpload',
        'formOption': {
            col: 2,
            'list-type': 'table',
            accept: '*',
            'auto-load': true,
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
        'label': '报批是否已通过',
        formSection: '报批信息',
        'type': 'FormRadio',
        options: [
            {
                value: '0',
                label: '无需报批'
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
            label: '报批信息'
        },
        searchOption: {
            label: '报批信息',
            'type': 'FormSelect'

        }
    },
    {
        'key': 'approveOverallArea',
        'label': '批复总体规划面积',
        formSection: '报批信息',
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
        'label': '批复绿地规划面积',
        formSection: '报批信息',
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
        'label': '批复水体规划面积',
        formSection: '报批信息',
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
        'label': '批复投资预算',
        formSection: '报批信息',
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
        'label': '报批通过日期',
        formSection: '报批信息',
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
        formSection: '报批信息',
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
 