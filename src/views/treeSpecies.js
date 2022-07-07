
export default [
  { key: 'keyWord', type: 'FormInput', label: '关键字', searchable: true },
  { key: 'id', type: 'FormHide', formable: true },

  {
    key: 'botanyId',
    type: 'FormInput',
    label: '上级配件',
    tableOption: {
      width: 180,
      label: '上级配件',
      sortable: true,
      sort: 2
    },
    formOption: {
      rules: [
        'required'
      ],
      properties: {
      }
    }
  },

  {
    key: 'code',
    type: 'FormInput',
    label: '编码',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      width: 120,
      label: '编码',
      sort: 2
    }
  },
  {
    key: 'name',
    type: 'FormInput',
    label: '中文名',
    formOption: {
      rules: ['required']
    },
    tableOption: {
      sort: 1
    }
  },

  {
    key: 'sciName',
    type: 'FormInput',
    label: '学名',
    formOption: {
    }
  },
  {
    key: 'latinSciName',
    type: 'FormInput',
    label: '品牌',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      }
    }
  },
  {
    key: 'remarks',
    type: 'FormTextarea',
    label: '备注',
    formOption: {
      change ({ update, disabled }, row) {
        update([{ key1: 1 }, { key2: 2 }])
      }
    }

  },
  {
    key: 'createUserName',
    type: 'FormInput',
    label: '创建人',
    tableOption: {
      sort: 3
    }
  },
  {
    key: 'createTime',
    type: '创建时间',
    label: '备注',
    tableOption: {
      sort: 4
    }
  },
  {
    key: 'lastUpdateTime',
    type: '更新时间',
    label: '备注',
    tableOption: {
      sort: 5
    }
  }

]
