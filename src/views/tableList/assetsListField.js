import { buildDynamicSelectOption, elementUploadFileApi, globalDownloadFileById } from '@/network/global'

export const assetsFields = [
  { key: 'keyWord', type: 'FormInput', label: '关键字', searchable: true },
  { key: 'id', type: 'FormHide', label: '', formOption: {} },
  { key: 'index', type: 'index', label: '序号', tableOption: { width: 60 } },

  {
    key: 'treeNumber',
    label: '固定资产编号',
    tableOption: {
      width: 120, sort: 1
    }
  },
  {
    key: 'treeNameId',
    type: 'FormInput',
    label: '资产类型名称',
    tableOption: {
      sort: 2,
      key: 'treeName'
    },
    formOption: {
      rules: [
        'required'
      ],
      changeHandle (data, vm) {
        vm.updateFormData({ sciName: data[0].sciName, latinSciName: data[0].latinSciName })
      }

    }
  },
  
  {
    key: "addr",
    type: "FormCascader",
    label: "地区",
    formOption: {
      properties:{
         
      },
      defaultValue:["zujian", "form", "checkbox"],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    },
  },
  {
    label:'等级',
    type:'FormSlider',
    formOption:{

    }
  },
  {
    type:'FormColorPicker',
    label:'颜色',
    key:'color',
    formOption:{
      defaultValue:'#163f91'
    }
  },
  {
    type:'FormRichEditor',
    label:'富文本',
    key:'rich',
    formOption:{
      defaultValue:'#163f91',
      span:24
    }
  },
  {
    key: 'sciName',
    type: 'FormInput',
    label: '学名',
    formOption: {
      properties: {
        disabled: true
      },
      rules: ['required']
      // formTip:'asdsadasdasd',

    },
    tableOption: {
      sort: 2
    }
  },

  {
    key: 'latinSciName',
    type: 'FormInput',
    label: '品牌',
    formOption: {
      properties: {
        disabled: true
      }
    }
  },
  {
    key: 'originalTreeNumber',
    type: 'FormInput',
    label: '原编号',
    labelInfo:'原laide 固定资产编号',
    formOption: {
      rules: ['required']
    },
    tableOption:{},
    searchOption:{},
  },
  {
    key: 'distribution',
    label: '分布特点',
    type: 'FormDynamicSelect',
    options: buildDynamicSelectOption('tree_manage_distribution'),
    formOption: {
    }
  },
  {
    key: 'investNumber',
    type: 'FormIntNumber',
    label: '调查顺序号',
    formOption: {
      changeHandle (value, data, items, vm) {
        debugger
      }
    }
  },
  {
    key: 'ownership',
    type: 'FormDynamicSelect',
    label: '权属',

    options: buildDynamicSelectOption('tree_manage_ownership'),
    formOption: {
    }
  },
  {
    key: 'famousWood',
    type: 'FormDynamicSelect',
    label: '保护类别',
    options: buildDynamicSelectOption('tree_manage_famous_wood'),
 
    tableOption: {
      sort: 6,
          component: 'ColDictTag',
          dictInfoKey: 'famousWoodDictData'
     
    },
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'age',
    type: 'FormDecimalNumber',
    label: '使用年数（年）',
    tableOption: {
      sort: 5
    },
    formOption: {
    // rules:['required'],
      properties: {
        required: "['99999010','99999011','99999012'].includes(#{famousWood})"
      }
    }
  },
  {
    key: 'protectLev',
    type: 'FormDynamicSelect',
    label: '等级',
    searchable: true,
    options: buildDynamicSelectOption('tree_manage_protect_lev'),

    formOption: {
      rules: ['required'],
      properties: {
        disabled: "['99999010','99999011','99999012'].includes(#{famousWood})",
        value: "if(['99999010','99999011','99999012'].includes(#{famousWood})){  if(#{age}>=300){  return '99999001';  }  if(#{age}>=200){    return '99999002' ;  }   if(#{age}>=100){    return '99999003' ; }  }else{ return #{protectLev} ;  }"

      }
      // formDataUpdateHandle(value,formData){
      //   debugger
      // }

    },
    tableOption: {
      sort: 8,
 
          component: 'ColDictTag',
          dictInfoKey: 'protectLevDictData'
   
    }
  },
  {
    key: 'treeHigh',
    type: 'FormDecimalNumber',
    label: '资产高（米）',
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'crownWidth',
    type: 'FormDecimalNumber',
    label: '平均占地(米)',
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'bust',
    type: 'FormDecimalNumber',
    label: '数量',
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'crownWidthNorthSouth',
    type: 'FormDecimalNumber',
    label: '占地-南北向(米)',
    formOption: {

    }
  },
  {
    key: 'crownWidthEastWest',
    type: 'FormDecimalNumber',
    label: '占地- 东西向(米)',
    formOption: {

    }
  },
  {
    key: 'treeDesc',
    type: 'FormTextarea',
    label: '资产性状描述',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      }
    }
  },

  {
    key: 'pics',
    label: '固定资产照片',
    type: 'FormUpload',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      },
      properties: {
        'list-type': 'picture-card',
        accept: 'img'
      },
      extra: {
        btn_text: '上传',
        tip: '支持格式：.jpg  .png  .gif ，单个文件不能超过20MB，最多上传5张',
        apiPromise: elementUploadFileApi
      }
    }
  },

  {
    key: 'admId',
    type: 'FormAdministrativeSelector',
    formSection: '地理位置',
    label: '行政区划',
    searchable: true,
    tableOption: {
      key: 'districtName',
      sort: 8
    },
    formOption: {
      rules: ['required']
    }
  },

  {
    label: '经纬度',
    key: 'lonLat',
    formSection: '地理位置',
    type: 'FormSelectPoint',
    formOption: {
      changeHandle (data, vm) {
        vm.updateFormData({
          address: data.formattedAddress
        })
      }

    }
  },
  {
    label: '详细地址',
    formSection: '地理位置',
    key: 'address',
    formOption: {
      drawType: 'marker',
      rules: ['required'],
      properties: {
        disabled: true
      }

    }
  },

  {
    key: 'growingPlace',
    type: 'FormDynamicSelect',
    formSection: '地理位置',
    label: '使用场所',
    options: buildDynamicSelectOption('tree_manage_growing_place'),
    formOption: {
    }

  },
  {
    key: 'slope',
    type: 'FormDecimalNumber',
    formSection: '地理位置',
    label: '坡度(度)',
    formOption: {
    }

  },
  {
    key: 'slopeDirection',
    type: 'FormDecimalNumber',
    formSection: '地理位置',
    label: '坡向',
    formOption: {
    }

  },

  {
    key: 'altitude',
    type: 'FormDecimalNumber',
    formSection: '地理位置',
    label: '海拔(米)',
    formOption: {
    }
  },
  {
    key: 'slopePosition',
    type: 'FormDecimalNumber',
    formSection: '地理位置',
    label: '坡位',
    formOption: {
    }
  },

  {
    key: 'growthSituation',
    type: 'FormDynamicSelect',
    formSection: '使用信息',
    label: '使用状况',
    searchable: true,
    options: buildDynamicSelectOption('tree_manage_growth_situation'),
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 7,
    
          component: 'ColDictTag',
          dictInfoKey: 'growthSituationDictData'
    
    }
  },

  {
    key: 'growthStatus',
    type: 'FormDynamicSelect',
    formSection: '使用信息',
    label: '使用现状',
    options: buildDynamicSelectOption('tree_manage_growth_status'),
    formOption: {
    }

  },

  {
    key: 'growthEnvironment',
    type: 'FormDynamicSelect',
    formSection: '使用信息',
    label: '使用环境',
    options: buildDynamicSelectOption('tree_manage_growth_environment'),
    formOption: {
      rules: ['required']
    }

  },
  {
    key: 'soilType',
    type: 'FormInput',
    formSection: '使用信息',
    label: '土壤类型',
    formOption: {

    }
  },
  {
    key: 'soilThickness',
    type: 'FormDecimalNumber',
    formSection: '使用信息',
    label: '土层厚度（厘米）',
    formOption: {
    }
  },
  {
    key: 'unit',
    type: 'FormInnerOrgSelector',
    formSection: '管理信息',
    label: '管理单位',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 9,
      key: 'manageUserName'
    }
  },
  {
    key: 'manageUser',
    type: 'FormInnerOrgSelPersonSelector',
    label: '管理人',
    formSection: '管理信息',

    formOption: {
    // 验证规则单独存放
      rules: ['required'],

      changeHandle (data, vm) {
        vm.updateFormData({
          manageUserPhone: data[0].phoneNum
        })
      }
    }
  },
  {
    key: 'manageUserPhone',
    type: 'FormInput',
    label: '管理人电话',
    formSection: '管理信息',
    formOption: {
    // rules: ['required', /^[\d|-]{9,12}$/],
      properties: {
        disabled: true
      }
    }
  },
  {
    key: 'maintenanceDesc',
    type: 'FormTextarea',
    label: '管养方案',
    formSection: '管理信息',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      },
      rules: []
    }
  },
  {
    key: 'files',
    label: '附件',
    type: 'FormUpload',
    formSection: '管理信息',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      },
      properties: {
        'list-type': 'table',
        accept: '*',
        limit: 200
      },
      extra: {
        btn_text: '上传',
        tip: '单个附件大小限制20Mb，最多上传200个附件',
        apiPromise: elementUploadFileApi,
        downloadApi: globalDownloadFileById,
        limitSize: 5
      }
    }
  },
  {
    key: 'qrCode',
    label: '二维码',
    type: 'QrCodeImg',
    tableOption: {
    component: 'ColQrcode'  
    },
    detailOption: {
      wraperProperties: {
        class: ['grid-col-24']
      }
    }
  }
]

export const manageLogFields = [
  { key: 'keyWord', type: 'FormInput', label: '关键字', searchable: true },
  { key: 'treeNumber', type: 'FormInput', label: '固定资产', searchable: false, tableOption: {} },

  { key: 'type', type: 'FormSelect', label: '类型', searchable: false, tableOption: {} }

]
