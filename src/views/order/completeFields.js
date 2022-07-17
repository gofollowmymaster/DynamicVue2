
export default [

  { key: 'projectLibraryId', type: 'FormHide', label: '', formSection: '项目建设信息', formOption: {} },
  { key: 'id', type: 'FormHide', label: '', formSection: '项目建设信息', formOption: {} },

  {
    key: 'finishDate',
    label: '完成日期',
    formSection: '项目建设信息',
    type: 'FormDate',
    formOption: {
      rules: ['required']
    }
  },

  {
    key: 'finishArea',
    label: '完成总面积',
    formSection: '项目建设信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²',
      rules: ['required']
    }
  },
  {
    key: 'finishGreenArea',
    label: '完成绿地面积',
    formSection: '项目建设信息',
    type: 'FormDecimalNumber',
    formOption: {
      append: 'm²',
      rules: ['required']
    }
  },

  {
    key: 'finishWaterArea',
    label: '完成水体面积',
    formSection: '项目建设信息',
    type: 'FormDecimalNumber',
    formOption: {
      rules: ['required'],
      append: 'm²'
    }
  },

  {
    key: 'remark',
    type: 'FormTextarea',
    label: '备注',
    formSection: '项目建设信息',
    formOption: {
      span: 24
    }
  }

]
