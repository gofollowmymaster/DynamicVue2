
export  default    [
    { key: 'keyWord', type: 'FormInput', label: '关键字', searchOption: true },
    { key: 'id', type: 'FormHide', label: '', formOption: {}},

    {
        'key': 'admId',
        'label': '行政区划',
        'type': 'FormInput',
        searchOption: true
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
        'key': 'overallArea',
        'label': '总体规划面积',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'greenArea',
        'label': '绿地规划面积',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'waterArea',
        'label': '水体规划面积',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'capitalBudgeting',
        'label': '投资预算',
        'type': 'FormNumber',
        'tableOption': {}
    },
    {
        'key': 'buildType',
        'label': '建设类型',
        'type': 'FormSelect',
        options: [{
            value: 0,
            label: '新建'

        }, {
            value: 1,
            label: '占绿恢复'
        },
        {
            value: 2,
            label: '改建'
        }],
        'tableOption': {},
        searchOption: {}
    },
    {
        'key': 'useLandDictId',
        'label': '用地性质',
        'type': 'FormDynamicSelect',
        dictType: ('order_use_land'),
        searchOption: {},
        tableOption: {
            key: 'useLandDictLabel'
        }
    },
    {
        'key': 'orderAttributeDictId',
        'label': '订单属性',
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
        'type': 'FormDynamicSelect',
        dictType: ('order_type'),
        tableOption: {
            key: 'orderTypeDictLabel'
        },
        searchOption: {}
    },
    {
        'key': 'orderStatus',
        'label': '订单状态',
        'type': 'FormSelect',
        options: [
            {
                value: 0,
                label: '计划'
            },
            {
                value: 1,
                label: '处理中'
            },
            {
                value: 2,
                label: '运输中'
            },
            {
                value: 3,
                label: '已竣工'
            }
        ],
        tableOption: {
            key: 'orderStatusDesc',
            template(row) {
                if (row.orderStatusDesc === '完成') {
                    return '已竣工'
                } else {
                    return row.orderStatusDesc 
                }
            }
        },
        searchOption: {}
    }

]