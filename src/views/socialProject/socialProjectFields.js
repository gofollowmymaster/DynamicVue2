import { buildDynamicSelectOption, elementUploadFileApi, globalDownloadFileById } from '@/network/global'

export const airFields = [
  {
    key: 'orderManageId', type: 'FormHide', formOption: true
  },
  {
    key: 'id', type: 'FormHide', formOption: true
  },
  {
    key: 'airTime',
    label: '验收日期',
    type: 'FormDate',
    formOption: {
      rules: ['required']
    }
  }, {
    key: 'completeBuildArea',
    label: '完成建设面积',
    type: 'FormDecimalNumber',
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'completeGreenLandArea',
    label: '完成绿地面积',
    type: 'FormDecimalNumber',
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'completeWaterLandArea',
    label: '完成水体面积',
    type: 'FormDecimalNumber',
    formOption: {
      rules: ['required']
    }
  },

  {
    key: 'files',
    label: '附件',
    type: 'FormUpload',
    formOption: {
      span: 24,
      properties: {
        'list-type': 'table',
        accept: '*',
        limit: 20
      },
      extra: {
        btn_text: '上传',
        tip: '单个附件大小限制20Mb，最多上传20个附件',
        apiPromise: elementUploadFileApi,
        downloadApi: globalDownloadFileById,
        limitSize: 5
      }
    }
  }
]
export const fields = [
  {
    key: 'keyword',
    label: '关键字',
    searchOption: {
      sort: 1
    }
  },
  {
    key: 'id',
    type: 'FormHide',
    formOption: true
  },

  {
    key: 'projectCode',
    label: '项目编号',
    type: 'FormInput',
    formSection: '基本信息',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 1
    }
  },

  {
    key: 'projectName',
    label: '项目名称',
    formSection: '基本信息',
    type: 'FormInput',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 2
    }
  },

  {
    key: 'district',
    label: '行政区划',
    formSection: '基本信息',
    type: 'FormAdministrativeSelector',
    searchOption: { sort: 2 },
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 9,
      key: 'districtName'
    }
  },
  {
    key: 'projectStatus',
    label: '项目状态',
    type: 'FormRadio',
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '已报建',
        value: 1
      },
      {
        label: '验收完成',
        value: 2
      }

    ],
    searchOption: {
      sort: 3,

      groupProperties: {
        size: 'small'
      },
      properties: {
        button: true
      },
      defaultValue: ''
    },
    tableOption: {
      sort: 10
    }
  },

  {
    key: 'buildType',
    label: '建设类型',
    formSection: '基本信息',
    type: 'FormSelect',
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
    formOption: {

    }
  },
  {
    key: 'useLandDictId',
    label: '用地性质',
    formSection: '基本信息',
    type: 'FormDynamicSelect',
    options: buildDynamicSelectOption('project_use_land'),
    formOption: {}
  },
  {
    key: 'projectAttributeDictId',
    label: '项目属性',
    formSection: '基本信息',
    type: 'FormDynamicSelect',
    options: buildDynamicSelectOption('project_attribute'),
    formOption: {}
  },
  {
    key: 'projectTypeDictId',
    label: '项目类别',
    formSection: '基本信息',
    type: 'FormDynamicSelect',
    options: buildDynamicSelectOption('project_type'),
    formOption: {}
  },

  {
    key: 'buildContractorId',
    label: '建设单位',
    formSection: '基本信息',
    type: 'FormContractorSelector',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 7,
      key: 'buildContractorName'
    }
  },
  {
    key: 'budget',
    label: '投资预算',
    formSection: '基本信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: '元'
    }

  },

  {
    key: 'planBuildArea',
    label: '规划建设面积',
    formSection: '基本信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²'
    }
  },
  {
    key: 'buildRange',
    label: '地理图层ID',
    formSection: '基本信息',
    type: 'FormDrawElement',
    formOption: {}
  },
  {
    key: 'projectPosition',
    label: '项目位置',
    formSection: '基本信息',
    type: 'FormInput',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 8
    }
  },
  {
    key: 'planGreenLandArea',
    label: '绿地规划面积',
    formSection: '基本信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²'
    }
  },

  {
    key: 'planWaterBodyArea',
    label: '水体规划面积',
    formSection: '基本信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²'
    }
  },

  {
    key: 'planStartTime',
    label: '计划开工日期',
    formSection: '基本信息',
    type: 'FormDate',
    formOption: {}
  },
  {
    key: 'planEndTime',
    label: '计划竣工日期',
    formSection: '基本信息',
    type: 'FormDate',
    formOption: {}
  },
  {
    key: 'projectDesc',
    label: '项目描述',
    formSection: '基本信息',
    type: 'FormTextarea',
    formOption: {
      span: 24
    }
  },
  {
    key: 'contractContractorId',
    label: '承建单位',
    formSection: '建设信息',
    type: 'FormContractorSelector',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 6,
      key: 'contractContractorName'
    }
  },

  {
    key: 'startTime',
    label: '开工日期',
    formSection: '建设信息',
    type: 'FormDate',
    formOption: {}
  },

  {
    key: 'endTime',
    label: '竣工日期',
    formSection: '建设信息',
    type: 'FormDate',
    formOption: {}
  },

  {
    key: 'buildArea',
    label: '建设面积',
    formSection: '建设信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²'
    },
    tableOption: {
      label: '建设面积(m²)',
      sort: 3
    },
    searchOption: {
      type: 'FormNumberRange',
      sort: 2,
      wraperProperties: {
        class: ['grid-col-6', 'grid-col-sm-8', 'grid-col-ss-12', 'grid-col-xs-18', 'grid-col-pp-24']
      },
      append: 'm²'
    }
  },
  {
    key: 'greenLandArea',
    label: '绿地建设面积',
    formSection: '建设信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²'
    },
    tableOption: {
      label: '绿地建设面积(m²)',
      sort: 4
    }
  },
  {
    key: 'waterArea',
    label: '水体建设面积',
    formSection: '建设信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²'
    },
    tableOption: {
      label: '水体建设面积(m²)',
      sort: 5
    }
  },
  {
    key: 'remarks',
    label: '备注',
    formSection: '建设信息',
    type: 'FormTextarea',
    formOption: {
      span: 24
    }
  },

  {
    key: 'files',
    label: '附件',
    type: 'FormUpload',
    formSection: '建设信息',
    formOption: {
      span: 24,
      properties: {
        'list-type': 'table',
        accept: '*',
        limit: 20
      },
      extra: {
        btn_text: '上传',
        tip: '单个附件大小限制20Mb，最多上传20个附件',
        apiPromise: elementUploadFileApi,
        downloadApi: globalDownloadFileById,
        limitSize: 5
      }
    }
  }
]
