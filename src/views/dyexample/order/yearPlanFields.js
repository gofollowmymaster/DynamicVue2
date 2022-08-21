import { YEARSPACE } from '@/common/constant/index.js'
import { yearProgressListApi } from '@/api/orderManage'

export const
    fields = [
        {
            'key': 'year',
            'label': '年度',
            type: 'FormDynamicSelect',
            options: {
                value: 'value',
                label: 'label',
                apiPromise: formData => {
                    return yearProgressListApi(formData.id).then(res => {
                        res.data.sort((prev, next) => {
                            return prev - next
                        })
                        return res.data.map(year => {
                            return {
                                value: year,
                                label: year
                            }
                        })
                    })
                }
            },
            'searchOption': {
                defaultValue: YEARSPACE.slice(-1)[0].value,
                sort: 1
            }
        },
        {
            'key': 'keyword',
            'label': '关键字',
            'searchOption': {
                sort: 2
            }
        },
        {
            'key': 'admId',
            'label': '行政区划',
            type: 'FormInput',
            'searchOption': {
                sort: 2
            }
        },

        {
            type: 'index',
            label: '序号',
            tableOption: { width: 50 }
        },
        {
            'key': 'orderCode',
            'label': '订单编号',
            'formOption': {},
            'tableOption': {
                width: 140
            }
        },

        {
            'key': 'orderName',
            'label': '订单名称',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: 140
            }
        },
        {
            'key': 'buildType',
            'label': '建设类型',
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
            searchOption: {
                sort: 4
            },
            'formOption': {},
            'tableOption': {}
        },
        {
            'key': 'useLandDictId',
            'label': '用地性质',
            'type': 'FormDynamicSelect',
            dictType: ('order_use_land'),
            searchOption: {
                sort: 5
            },
            'formOption': {},
            'tableOption': {
                key: 'useLandDictLabel',
                width: 90
            }
        },

        {
            'key': 'orderAttributeDictId',
            'label': '订单属性',
            'type': 'FormDynamicSelect',
            dictType: ('order_attribute'),
            searchOption: {
                sort: 6
            },
            'formOption': {},
            'tableOption': {
                key: 'orderAttributeDictLabel',
                width: 90
            }
        },

        {
            'key': 'orderTypeDictId',
            'label': '订单类别',
            'type': 'FormDynamicSelect',
            dictType: ('order_type'),
            searchOption: {
                sort: 6
            },
            'formOption': {},
            'tableOption': {
                width: 90,
                key: 'orderTypeDictLabel'
            }
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
                    label: '完成'
                }
            ],
            searchOption: {
                sort: 3
            },
            'formOption': {},
            'tableOption': {
            }
        },
        {
            'key': 'buildingArea',
            'label': '年度计划总体面积（m²)',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingTotalArea',
            'label': '年度建设总体面积（m²)',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingAreaRatio',
            'label': '完成率',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {}
        },
        {
            'key': 'buildingGreenArea',
            'label': '年度计划绿地面积（m²)',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingGreenTotalArea',
            'label': '年度建设绿地面积（m²)',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingGreenAreaRatio',
            'label': '完成率',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {}
        },
        {
            'key': 'buildingWaterArea',
            'label': '年度计划水体面积（m²）',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingWaterTotalArea',
            'label': '年度建设水体面积（m²）',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingWaterAreaRatio',
            'label': '完成率',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {}
        },
        {
            'key': 'buildingMoney',
            'label': '年度投资预算（元）',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingTotalMoney',
            'label': '年度已用资金（元）',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {
                width: '120px'
            }
        },
        {
            'key': 'buildingMoneyRatio',
            'label': '完成率',
            'type': 'FormInput',
            'formOption': {},
            'tableOption': {}
        },

        {
            'key': 'id',
            'type': 'FormHide',
            'formOption': {}
            // tableOption:true
        }

    ]

export const modifyFields = [
    {
        'key': 'year',
        'label': '年度',
        // type:"FormSelect",
        formOption: {
            rules: ['required'],
            properties: {
                disabled: true
            },
            span: 24
        }
    },
    {
        'key': 'id',
        'type': 'FormHide',
        formOption: {
            rules: ['required'],
            properties: {
                disabled: true
            },
            span: 24
        }
    },
    {
        key: 'orderName',
        label: '订单名称',
        formOption: {
            rules: ['required'],
            col: 2,
            properties: {
                disabled: true
            }
        }
    },
    {
        'key': 'buildingArea',
        'label': '年度计划总体面积',
        type: 'FormNumber',
        formOption: {
            rules: ['required'],
            col: 2,
            append: '㎡'
        }
    },
    {
        'key': 'buildingGreenArea',
        'label': '年度计划绿地面积',
        type: 'FormNumber',
        formOption: {
            rules: ['required'],
            col: 2,
            append: '㎡'
        }
    },
    {
        'key': 'buildingWaterArea',
        'label': '年度计划水体面积',
        type: 'FormNumber',
        formOption: {
            rules: ['required'],
            col: 2,
            append: '㎡'
        }
    },
    {
        'key': 'buildingMoney',
        'label': '年度投资预算',
        type: 'FormNumber',
        formOption: {
            rules: ['required'],
            col: 2,
            append: '元'
        }
    }

]