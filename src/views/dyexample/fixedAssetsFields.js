import { elementUploadFileApi } from '@/api/global'

const materialFields = [

    {
        type: 'FormHide',
        key: 'id',
        formOption: true
    },

    {
        key: 'assetsQuantity',
        type: 'FormNumber',
        label: '数量',
        tableOption: {
            label: '不动产数量',
            sort: 3
        },
        formOption: {
            col: 1,
            rules: ['required']
        }
    },

    {
        key: 'unit',
        type: 'FormSelect',
        label: '单位',
        tableOption: {

        },
        options: [
            {
                value: '1',
                label: '株'
            },
            {
                value: '2',
                label: '平方'
            }
        ],
        formOption: {
            col: 1,
            rules: ['required']
        }
    },
    {
        key: 'context',
        type: 'FormDate',
        label: '备注',
        tableOption: true,
        formOption: {
            col: 1,
            rules: ['required']
        }
    }

]
export const materialOption = {
    topToolBar: {
        bulkdelete: null,
        create: {
            saveAtion: {
                callback: {
                    showTip: false
                }
            }
        }
    },
    tableOption: {
        hasCheckbox: false,
        lineActions: {
            detail: null,
            delete: {
                callback: {
                    showTip: false
                }
            },
            update: {
                saveAtion: {
                    callback: {
                        showTip: false
                    }
                }
            }
        }
    }
}

// 没有联动
const materialTableFields = [
 
    {
        key: 'materialId',
        type: 'FormInput',
        label: '类别',

        tableOption: {
            sort: 2,
            key: 'materialId'
        },
        formOption: {
        }
    },
    {
        key: 'quantity',
        type: 'FormNumber',
        label: '数量',
        tableOption: {
            label: '设备数量',
            sort: 3
        },
        formOption: {
        }
    },

    {
        key: 'assetsype',
        type: 'FormSelect',
        label: '单位',
        tableOption: {
        },
        options: [
            {
                value: '1',
                label: '台'
            },
            {
                value: '2',
                label: '平方'
            }
        ],
        formOption: {
        }
    },
    {
        key: 'time',
        type: 'FormDateTime',
        label: '时间',
        tableOption: {},
        formOption: {
        }
    },
    {
        key: 'assetsContext',
        type: 'FormInput',
        label: '备注',
        tableOption: {},
        formOption: {
            disabled: true
        }
    }

]
export const materialTableOption = {
    hasCheckbox: false
}
export const formSections = {
    '主要配件': {
        hidden: '#{plantedInGreen}'
    }
}
export default [
    { key: 'keyword', type: 'FormInput', label: '关键字', searchOption: true },
    { key: 'id', type: 'FormHide', formOption: true },
 

    {
        key: 'assetName',
        type: 'FormInput',
        label: '资产类型名',
        searchOption: true,
        tableOption: {
            sort: 2,
        }
    },
    {
        key: 'roadName',
        type: 'FormInput',
        label: '道路名',
        formSection: '基本信息',
        formOption: {
            rules: ['required']
        },
        tableOption: {
            sort: 1
        }
    },
    {
        key: 'num',
        label: '不动产数量',
        tableOption: {
            sort: 3
        }
    },

    {
        key: 'assetsRange',
        type: 'FormDrawElement',
        label: '不动产范围绘制',
        formSection: '基本信息',
        formOption: {
            rules: ['required']
        }
    },

    {
        key: 'height',
        type: 'FormNumberPlus',
        label: '平均资产高',
        formSection: '基本信息',
        formOption: {
            rules: ['required'],
            expressProp: {
                value: '#{plantedInGreen}?1:100',
                required: '#{plantedInGreen}==1'
            }
        }
    },

    {
        key: 'plantedInGreen',
        label: '是否在厂区内',
        formSection: '基本信息',
        type: 'FormRadio',
        options: [
            {
                value: true,
                label: '是'
            },
            {
                value: false,
                label: '否'
            }
        ],
        formOption: {
            rules: ['required'],
            defaultValue: true,
            changeHandle(data, vm) {
                debugger
                vm.updateFormData({
                    remark: data === true ? '是' : '否'
                })
                vm.setFormItemDisabled('remark', data === true)
                vm.setFormItemHidden('pic', data)
            }
        }
    },

    {
        key: 'remark',
        label: '备注',
        formSection: '基本信息',
        type: 'FormTextarea',
        formOption: {
            col: 5
            
        }
    },

    {
        key: 'pic',
        label: ' 不动产照片',
        type: 'FormUpload',
        formSection: '基本信息',
        formOption: {
            col: 3,
            limit: 5,
            'list-type': 'picture-card',
            btn_text: '上传',
            tip: '支持格式：.jpg  .png  .gif ，单个文件不能超过20MB，最多上传5张',
            apiPromise: elementUploadFileApi
        }
    },
    // {
    //   key: 'mainPlant',
    //   label: '',
    //   type: 'FormCurd',
    //   formSection: '主要配件',
    //   formOption: {
    //     col : 5,
    //     wraperProperties: {
    //       'label-width': '0px'
    //     },
    //       fields: materialFields,
    //       options: materialOption,
    //       entityLabel: '主要配件'
    //   }
    // },
    {
        key: 'mainPlant',
        label: '',
        type: 'FormTableEditable',
        formSection: '主要配件',
        formOption: {
            col: 3,
            wraperProperties: {
                'label-width': '0px'
            },
            fields: materialTableFields,
            options: materialTableOption,
            defaultValue: [
                // {
                //     id: 1,
                //     materialId: 2014,
                //    materialQuantity: 15,
                //    materialType: '1',
                //    materialContext: '实打实大所多撒'
                // },
                // {
                //     id: 2,
                //     materialId: 2014,
                //    materialQuantity: 15,
                //    materialType: '1',
                //    materialContext: '实打实大所多撒'
                // }
            ]
        }
    },
    {
        key: 'mainPlant1',
        label: '',
        type: 'FormChildrenForm',
        formSection: '主要配件1',
        formOption: {
            col : 3,
            wraperProperties: {
                'label-width': '0px'
            },
            fields: materialFields,
            defaultValue: [
                {
                    id: 1,
                    materialId: 2014,
                   materialQuantity: 15,
                   materialType: '1',
                   materialContext: '实打实大所多撒'
                },
                {
                    id: 2,
                    materialId: 2014,
                   materialQuantity: 15,
                   materialType: '1',
                   materialContext: '实打实大所多撒'
                }
            ]
        }
    },
    {
        key: 'unit',
        type: 'FormInput',
        label: '管理单位',
        formSection: '管理信息',
        tableOption: {
            sort: 5
        },
        formOption: {
            // 会传入elment 表单组件FormItem的参数放在properties
            wraperProperties: {
                style: {}
            },
            // 验证规则单独存放
            rules: ['required']
        }
    },
    {
        key: 'administrator',
        type: 'FormInput',
        label: '管理人',
        formSection: '管理信息',
        tableOption: {
            sort: 7,
            width: 180
        },
        formOption: {
            // 会传入elment 表单组件FormItem的参数放在properties
            wraperProperties: {
                style: {}
            },
            // 验证规则单独存放
            rules: ['required'],
            changeHandle(data, vm) {
                vm.updateFormData({
                    administratorPhone: data
                })
            }

        }
    },
    {
        key: 'administratorPhone',
        type: 'FormInput',
        label: '管理人电话',
        formSection: '管理信息',
        formOption: {
            rules: ['required', /^[\d|-]{9,12}$/],
        },
        tableOption: {
            sort: 8
        }
    }

]
