import { selectDictDataInfoApi, } from '@/network/oldtree'
import { elementUploadFileApi } from "@/network/global"
  

const mainPlaintFields = [
  {
    type: 'index',
    key: 'index',
    label: '序号',
    tableOption: {
      width: 60
    },
  },
  {
    type: 'FormHide',
    key: 'id',
    formable:true
  },
//   {
//     key: "treeId",
//     type: "FormInput",
//     label: "资产类型",
    
//     tableOption: {
//       sort:2,
//       template(row, key) {
//         return row['treeId']?.[0]?.name
//       },
//       key:'treeName'
//     },
//     formOption: {
// span:24,
//       rules: [
//         // 'required'
//       ],
//     },
//   },
  {
    key: 'treeStreetQuantity',
    type: 'FormIntNumber',
    label: '数量',
    tableOption: {
      label:'不动产数量',
      sort:3
    },
    formOption: {
span:24,
      rules: ['required']
    },
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
      },
    ],
    formOption: {
span:24,
      rules: ['required'],
    }
  },
  {
    key: 'treeStreetContext',
    type: 'FormTextarea',
    label: '备注',
    tableable: true,
    formOption: {
span:24,
      rules: ['required']
    },
  },

]
export const mainPlaintOption = {
  searchOption:null,
  topToolBar: {
    bulkdelete: null,
    create:{
      dialog:{
        body:{
          actions:{
            save:{
              callback:{
                showTip:false
              }
            }

          }
          
        }
      }
    }
  },
  tableOption: {
    hasCheckbox: false,
    lineActions: {
      detail: null,
      delete:{
        callback:{
          showTip:false
        }
      },
      update:{
        dialog:{
          body:{
            actions:{
              save:{
                callback:{
                  showTip:false
                }
              }

            }
            
          }
        }
        
      }
    }
  },
  treeOption: null
}


export default [
  { key: 'keyword', type: 'FormInput', label: '关键字', searchable: true },
  { key: 'id', type: 'FormHide', formable: true },
  { key: "index", type: "index", label: "序号", tableOption:{width:60}},
  {
    key: 'area',
    type: 'FormAdministrativeSelector',
    label: '行政区划',
    formSection: '基本信息',
    searchable: true,
    options: {
      key: 'id',
      value: 'dictValue',
      label: 'dictLabel',
      apiPromise: () => {
        return selectDictDataInfoApi({
          dictType: 'park_type'
        }).then((res) => res.data || [])
      }
    },
    tableOption: {
      width: 180,
      sortable: true,
      sort: 4,
      key:'areaName'
    },
    formOption: {
      rules: ['required'],
      isMultSelect: false,
      dialogTitle: '选择行政区划',
    }
  },
  
  {
    key: 'treeName',
    type: 'FormInput',
    label: '资产类型名',
    searchable:true,
    tableOption:{
      sort:2,
      template(rowData){
        return   rowData['species']&&rowData['species'].map(item=>item.species).join(',')
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
    key:'num',
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
span:24,
    }
  },

  {
    key: 'pic',
    label: ' 不动产照片',
    type: 'FormUpload',
    formSection: '基本信息',
    formOption: {
      span:24,
      properties: {
      limit:5,
      'list-type': 'picture-card',
      },
      extra: {
        btn_text: '上传',
        tip: '支持格式：.jpg  .png  .gif ，单个文件不能超过20MB，最多上传5张',
        
        apiPromise: elementUploadFileApi
      }
    }
  },
  {
    key: 'mainPlant',
    label: '',
    type: 'FormCurd',
    formSection: '主要配件',
    formOption: {
      span:24,
      wraperProperties: {
        'label-width':'0px'
      },
      extra: {
        fields: mainPlaintFields,
        options: mainPlaintOption,
        entityLabel:'主要配件'
      }
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
      valueLink: {
        '@*any*@': [
          {
            linkKey: 'administratorPhone',
            linkValue: function (data) {
              return data[0].phoneNum
            }
          }
        ]
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
  },


]
