import { elementUploadFileApi } from '@/network/global'

const mainPlaintFields = [

  {
    type: 'FormHide',
    key: 'id',
    formOption: true
  },

  {
    key: 'treeStreetQuantity',
    type: 'FormIntNumber',
    label: '数量',
    tableOption: {
      label: '不动产数量',
      sort: 3
    },
    formOption: {
      span: 24,
      rules: ['required']
    }
  },

  {
    key: 'treeStreetType',
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
      span: 24,
      rules: ['required']
    }
  },
  {
    key: 'treeStreetContext',
    type: 'FormTextarea',
    label: '备注',
    tableOption: true,
    formOption: {
      span: 24,
      rules: ['required']
    }
  }

]
export const mainPlaintOption = {
  searchOption: null,
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

const mainPlaintTableFields = [

  {
    type: 'FormText',
    label: 'id',
    key: 'id',
    tableOption: {}
  },
  {
    key: 'treeId',
    type: 'FormOldtreeSelector',
    label: '树种',

    tableOption: {
      sort: 2,
      template (row, key) {
        return row.id?.[0]?.name
      },
      key: 'treeName'
    },
    formOption: {
      rules: [
        // 'required'
      ]
    }
  },
  {
    key: 'treeStreetQuantity',
    type: 'FormIntNumber',
    label: '数量',
    tableOption: {
      label: '行道树数量',
      sort: 3
    },
    formOption: {
      rules: ['required']
    }
  },

  {
    key: 'treeStreetType',
    type: 'FormSelect',
    label: '单位',
    tableOption: {
      // template(row, key){
      //   return
      // }
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
      rules: ['required']
    }
  },
  {
    key: 'time',
    type: 'FormDateTime',
    label: '时间',
    tableOption: {},
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'treeStreetContext',
    type: 'FormInput',
    label: '备注',
    tableOption: {},
    formOption: {
      rules: ['required']
    }
  }

]
export const mainPlaintTableOption = {
  hasCheckbox: false
}

export default [
  { key: 'keyword', type: 'FormInput', label: '关键字', searchOption: true },
  { key: 'id', type: 'FormHide', formOption: true },
  {
    key: 'area',
    type: 'FormAdministrativeSelector',
    label: '行政区划',
    formSection: '基本信息',
    searchOption: true,

    tableOption: {
      width: 180,
      sortable: true,
      sort: 4,
      key: 'areaName'
    },
    formOption: {
      rules: ['required'],
      isMultSelect: false,
      dialogTitle: '选择行政区划'
    }
  },

  {
    key: 'treeName',
    type: 'FormInput',
    label: '资产类型名',
    searchOption: true,
    tableOption: {
      sort: 2,
      template (rowData) {
        return rowData.species && rowData.species.map(item => item.species).join(',')
      }
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
    key: 'streetTreeRange',
    type: 'FormDrawElement',
    label: '不动产范围绘制',
    formSection: '基本信息',
    formOption: {
      rules: ['required'],
      properties: {}
    }
  },

  {
    key: 'height',
    type: 'FormDecimalNumber',
    label: '平均资产高',
    formSection: '基本信息',
    formOption: {
      rules: ['required']
    }
  },

  {
    key: 'plantedInGreen',
    label: '是否种在厂区内',
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
      rules: ['required']
    }
  },

  {
    key: 'remark',
    label: '备注',
    formSection: '基本信息',
    type: 'FormTextarea',
    formOption: {
      span: 24
    }
  },

  {
    key: 'pic',
    label: ' 不动产照片',
    type: 'FormUpload',
    formSection: '基本信息',
    formOption: {
      span: 24,
      properties: {
        limit: 5,
        'list-type': 'picture-card'
      },
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
  //     span: 24,
  //     wraperProperties: {
  //       'label-width': '0px'
  //     },
  //       fields: mainPlaintFields,
  //       options: mainPlaintOption,
  //       entityLabel: '主要配件'
  //   }
  // },
  // {
  //   key: 'mainPlant',
  //   label: '',
  //   type: 'FormTableEditable',
  //   formSection: '主要植物',
  //   formOption: {
  //     span:24,
  //     wraperProperties: {
  //       'label-width':'0px'
  //     },
  //       fields: mainPlaintTableFields,
  //       options: mainPlaintTableOption,
  //       defaultValue:[
  //         {
  //           id:1,
  //           treeId:2014,
  //           treeStreetQuantity:15,
  //           treeStreetType:'1',
  //           treeStreetContext:'实打实大所多撒'
  //         },
  //         {
  //           id:1,
  //           treeId:2014,
  //           treeStreetQuantity:15,
  //           treeStreetType:'1',
  //           treeStreetContext:'实打实大所多撒'
  //         },
  //       ]
  //   }
  // },
  {
    key: 'mainPlant',
    label: '',
    type: 'FormChildrenForm',
    formSection: '主要植物',
    formOption: {
      span: 24,
      wraperProperties: {
        'label-width': '0px'
      },
      fields: mainPlaintTableFields,
      defaultValue: [
        {
          id: 1,
          treeId: 2014,
          treeStreetQuantity: 15,
          treeStreetType: '1',
          treeStreetContext: '实打实大所多撒'
        },
        {
          id: 2,
          treeId: 2014,
          treeStreetQuantity: 15,
          treeStreetType: '1',
          treeStreetContext: '实打实大所多撒'
        }
      ]
    }
  },
  {
    key: 'unit',
    type: 'FormInnerOrgSelector',
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
    type: 'FormInnerOrgSelPersonSelector',
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
      changeHandle (data, vm) {
        vm.updateFormData({
          administratorPhone: data[0].phoneNum
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
      properties: {
        disabled: true
      }
    },
    tableOption: {
      sort: 8
    }
  }

]
