
export default  [
      
    { key: 'orderLibraryId', type: 'FormHide', label: '', formSection: '订单处理信息', formOption: {}},
    { key: 'id', type: 'FormHide', label: '', formSection: '订单处理信息', formOption: {}},

    {
        'key': 'finishDate',
        'label': '完成日期',
        formSection: '订单处理信息',
        'type': 'FormDate',
        formOption: {
            rules: ['required']
        }
    },

    {
        'key': 'finishArea',
        'label': '完成总面积',
        formSection: '订单处理信息',
        'type': 'FormNumber',
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    {
        'key': 'finishGreenArea',
        'label': '完成绿地面积',
        formSection: '订单处理信息',
        'type': 'FormNumber',
        'formOption': {
            append: 'm²',
            rules: ['required']
        }
    },
    
    {
        'key': 'finishWaterArea',
        'label': '完成水体面积',
        formSection: '订单处理信息',
        'type': 'FormNumber',
        'formOption': {
            rules: ['required'],
            append: 'm²'
        }
    },
     
    {
        key: 'remark',
        type: 'FormTextarea',
        label: '备注',
        formSection: '订单处理信息',
        formOption: {
            span: 24
        }
    }
  
]
 