
export default  [
     
    {
        'key': 'id',
        'type': 'FormHide',
        'formOption': {},
        searchOption: true
    },

    {
        'key': 'monthDate',
        'label': '月份',
        'type': 'FormInput',
        'formOption': {
            properties: {
                disabled: true
            },
            rules: ['required'],
            span: 24
        },
        'tableOption': {}
    },
    {
        'key': 'buildingArea',
        'label': '建设总体面积（m²）',
        'type': 'FormNumber',
        'formOption': {
            append: 'm²',
            rules: ['required'],
            span: 24
        },
        'tableOption': {}
    },
  
    {
        'key': 'areaProportion',
        'label': '总体完成比例',
        'type': 'FormInput',
        'tableOption': {}
    },
    {
        'key': 'buildingGreenArea',
        'label': '建设绿地面积（m²）',
        'type': 'FormNumber',
        'formOption': {
            append: 'm²',
            rules: ['required'],
            span: 24
        },
        'tableOption': {}
    },
    {
        'key': 'greenAreaProportion',
        'label': '绿地完成比例',
        'type': 'FormInput',
        'tableOption': {}
    },
    {
        'key': 'buildingWaterArea',
        'label': '建设水体面积（m²）',
        'type': 'FormNumber',
        'formOption': {
            append: 'm²',
            rules: ['required'],
            span: 24
        },
        'tableOption': {}
    },
    {
        'key': 'waterAreaProportion',
        'label': '水体完成比例',
        'type': 'FormInput',
        'tableOption': {}
    },
    {
        'key': 'buildingMoney',
        'label': '已用资金（元）',
        'type': 'FormNumber',
        'formOption': {
            append: '元',
            rules: ['required'],
            span: 24
        },
        'tableOption': {}
    },
    {
        'key': 'remark',
        'label': '备注',
        'type': 'FormTextarea',
        'formOption': {
            span: 24
        },
        'tableOption': {}
    },
    {
        'key': 'lastUpdateTime',
        'label': '更新时间',
        'type': 'FormInput',
        'tableOption': {}
    }
  
]