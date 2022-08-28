
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
            col: 2
        },
        'tableOption': {}
    },
    {
        'key': 'buildingArea',
        'label': '运输总里程',
        'type': 'FormNumber',
        'formOption': {
            append: 'm²',
            rules: ['required'],
            col: 2
        },
        'tableOption': {}
    },
  
    {
        'key': 'areaProportion',
        'label': '完成比例',
        'type': 'FormRateInput',
        'tableOption': {}
    },
    
    {
        'key': 'buildingMoney',
        'label': '已用资金（元）',
        'type': 'FormNumber',
        'formOption': {
            append: '元',
            rules: ['required'],
            col : 2
        },
        'tableOption': {}
    },
    {
        'key': 'remark',
        'label': '备注',
        'type': 'FormTextarea',
        'formOption': {
            col : 2
        },
        'tableOption': {}
    },
    {
        'key': 'lastUpdateTime',
        'label': '更新时间',
        'type': 'FormDateTime',
        'tableOption': {}
    }
  
]