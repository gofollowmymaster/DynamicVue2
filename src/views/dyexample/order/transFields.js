import {   elementUploadFileApi, globalDownloadFileById } from '@/api/global'

const equipmentFields = [
    {
        type: 'index',
        key: 'index',
        label: '序号',
        tableOption: {
            width: 60
        }
    },
    {
        type: 'FormHide',
        key: 'id',
        formable: true
    },
    {
        key: 'typeParentDictLabel',
        label: '设施大类',
        tableOption: true
    },
    {
        key: 'typeDictId',
        type: 'FormDynamicSelect',
        label: '设施小类',
       dictType:('park_equipment_type'),
        tableOption: {
            key: 'typeDictLabel'
        },
        formOption: {
            span: 4,
            rules: ['required']
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
const mainPlantFields = [
    {
        type: 'index',
        key: 'index',
        label: '序号',
        tableOption: {
            width: 60
        }
    },
    {
        type: 'FormHide',
        key: 'id',
        formable: true
    },
    {
        key: 'plantSpecies',
        type: 'FormInput',
        label: '植物种类',
        formOption: {
            col: 2,
            rules: [
                'required'
            ]
        },
        tableOption: true
    },
    {
        key: 'plantSpecificationDictId',
        type: 'FormDynamicSelect',
        label: '植物规格',
       dictType:('order_plant_specification'),
        tableOption: {
            key: 'plantSpecificationDictLabel'
        },
        formOption: {
            col: 2,
            rules: ['required']
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
        'key': 'admId',
        'label': '行政区划',
        'type': 'FormInput',
        searchOption: {sort: 2}
    
    },

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
        'label': '承建商',
        'type': 'FormContractorSelector',
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
        'label': '竣工绿地面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '竣工绿地面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'designGreenCoverArea',
        'label': '设计绿化覆盖面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '设计绿化覆盖面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'endGreenCoverArea',
        'label': '竣工绿化覆盖面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '竣工绿化覆盖面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
     
    {
        key: 'designGreenRate',
        'label': '设计绿地率',
        formSection: '验收信息',
        type: 'FormRateInput',
        'tableOption': {},
        'formOption': {
            rules: ['required']
        }
    },
         
    {
        'key': 'endGreenRate',
        'label': '竣工绿地率',
        formSection: '验收信息',
        'type': 'FormRateInput',
        'tableOption': {},
        'formOption': {
            rules: ['required']
        }
    },
    {
        'key': 'designWaterArea',
        'label': '设计水体面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '设计水体面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'endWaterArea',
        'label': '竣工水体面积',
        formSection: '验收信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '竣工水体面积(m²)'
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
        'label': '实际竣工日期',
        formSection: '验收信息',
        'type': 'FormDate',
        'formOption': {
            rules: ['required']
        },
        searchOption: {
            wraperProperties: {
                class: ['grid-col-6', 'grid-col-sm-8', 'grid-col-ss-10', 'grid-col-xs-16', 'grid-col-pp-24'],
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
                class: ['grid-col-6', 'grid-col-sm-8', 'grid-col-ss-10', 'grid-col-xs-16', 'grid-col-pp-24'],
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
        'key': 'orderContractorEvaluate',
        'label': '承建商评价',
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
            properties: {
                'list-type': 'table',
                accept: '*'
          
            },
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
        'label': '运输中总面积',
        formSection: '运输中信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '运输中总面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'transferGreenArea',
        'label': '运输中绿地面积',
        formSection: '运输中信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '运输中绿地面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'transferWaterArea',
        'label': '运输中水体面积',
        formSection: '运输中信息',
        'type': 'FormNumber',
        'tableOption': {
            'label': '运输中水体面积(m²)'
        },
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        key: 'remark',
        type: 'FormTextarea',
        label: '备注',
        formSection: '运输中信息',
        formOption: {
            span: 24
        }
    },

    {
        'key': 'plantList',
        'label': '主要植物',
        formSection: '运输中信息',
        'type': 'FormCurd',
        'formOption': {
            col: 2,
 
            extra: {
                fields: mainPlantFields,
                entityLabel: '主要植物'
            }
        }
    },
    {
        key: 'equipmentList',
        type: 'FormCurd',
        label: '附属设施',
        formSection: '运输中信息',
        formOption: {
            col: 2,
            extra: {
                fields: equipmentFields,
                entityLabel: '附属设施'
            }
 
        }
    }
  
]
 