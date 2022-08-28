import {   elementUploadFileApi, globalDownloadFileById } from '@/api/global'

const equipmentFields = [
    // {
    //     type: 'index',
    //     key: 'index',
    //     label: '序号',
    //     tableOption: {
    //         width: 60
    //     }
    // },
    {
        type: 'FormHide',
        key: 'id',
        formable: true
    },
 
    {
        key: 'typeDictId',
        type: 'FormDynamicSelect',
        label: '类别',
        dictType: ('park_equipment_type'),
        tableOption: {
            key: 'typeDictId'
        },
        formOption: {
            col: 2,
            rules: ['required'],
            changeHandle(data,vm){

            }
        }
    },
    {
        key: 'amount',
        label: '数量',
        type: 'FormNumber',
        formOption: {
            col: 2,
            rules: ['required']
        },
        tableOption: true

    },

    {
        key: 'transferDate',
        type: 'FormDate',
        label: '运输中日期',
        tableOption: {
        },
        formOption: {
            col: 2,
            rules: ['required']
        }
    }
  
]
 

export default  [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchable: true },
      
    { key: 'orderLibraryId', type: 'FormHide', label: '', formSection: '验收信息', formOption: {}},
    { key: 'id', type: 'FormHide', label: '', formSection: '验收信息', formOption: {}},

    { key: 'index', type: 'index', label: '序号', tableOption: {width: 60}},
 

    {
        'key': 'orderCode',
        'label': '订单编号',
        'type': 'FormInput',
        'tableOption': {}
    },
    {
        'key': 'orderName',
        'label': '订单名称',
        'type': 'FormInput',
        'tableOption': {}
    },
    
    {
        'key': 'orderContractorId',
        'label': '客户',
        'type': 'FormInput',
        formSection: '验收信息',
        'formOption': {
            rules: ['required']
        }
        // "tableOption": {
        //   key:'orderContractorName'
        // }
    },
    {
        'key': 'designGreenArea',
        'label': '设计绿地面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '设计绿地面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'endGreenArea',
        'label': '完成绿地面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '完成绿地面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    
    {
        'key': 'requirementFlag',
        'label': '是否符合设计要求',
        formSection: '验收信息',
        'type': 'FormRadio',
        options: [{
            value: true,
            label: '是'
        }, {
            value: false,
            label: '否'
        }],
        'formOption': {
            rules: ['required']
        },
        'tableOption': {
        }
    },
    {
        'key': 'acceptanceConclusion',
        'label': '验收结论',
        formSection: '验收信息',
        'type': 'FormInput',
        'tableOption': {

        },
        'formOption': {
            rules: ['required']
        }
    },
    {
        'key': 'transferEndTime',
        'label': '实际完成日期',
        formSection: '验收信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        },
        searchOption: {
            wraperProperties: {
                'label-width': '120px'
            }
        }
    },
   
    {
        'key': 'acceptanceTime',
        'label': '完成验收日期',
        formSection: '验收信息',
        'type': 'FormDate',
        'tableOption': {},
        formOption: {
            rules: ['required']
        },
        searchOption: {
            wraperProperties: {
                'label-width': '120px'
            }
        }
    },

    {
        'key': 'orderEvaluate',
        'label': '订单评价',
        formSection: '验收信息',
        'type': 'FormProjectEvaluate',
        'formOption': {
        }
    },
   
    
    {
        'key': 'fileIds',
        'label': '附件',
        formSection: '验收信息',
        'type': 'FormUpload',
        'formOption': {
            col: 2,
            'list-type': 'table',
            accept: '*',
            'auto-load': true,
            extra: {
                btn_text: '上传',
                tip: '程图纸建议打包上传，单个附件大小限制200 Mb，最多上传20个附件',
                apiPromise: elementUploadFileApi,
                downloadApi: globalDownloadFileById
            }
        }
    },
    
    {
        'key': 'transferArea',
        'label': '运输总里程',
        formSection: '运输信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '运输里程(km)'
        },
        'formOption': {
            append: 'km',
            rules: ['required']
        }
    },
    {
        'key': 'transferGreenArea',
        'label': '已运输里程',
        formSection: '运输信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '已运输里程(km)'
        },
        'formOption': {
            append: 'km',
            rules: ['required']
        }
    },

    {
        key: 'remark',
        type: 'FormTextarea',
        label: '备注',
        formSection: '运输信息',
        formOption: {
            col: 2
        }
    },

   
    {
        key: 'equipmentList',
        type: 'FormCurd',
        label: '子订单信息',
        formSection: '子订单信息',
        formOption: {
            col: 2,
            fields: equipmentFields,
            extra: {
                entityLabel: '子订单信息'
            }
 
        }
    }
  
]
 