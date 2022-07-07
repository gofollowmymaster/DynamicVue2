<template>
  <DynamicCurd
    :entityLabel="entityLabel"
    :fields="fields"
    :optionsProps="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurd>
</template>
<script>
import { transDetailApi, transListApi } from '@/network/assetsMaintain.js'

import { appendToPreset } from '@/packages/utils/tool'

const entityLabel = '移植记录'
const fields = [
  { key: 'index', type: 'index', label: '序号', tableOption: { width: 50 } },
  {
    label: '固定资产名称',
    key: 'treeManageId',
    type: 'FormOldtreeSelector',
    formOption: {}
  },

  {
    label: '固定资产编号',
    key: 'treeNumber',
    type: 'FormInput',

    formOption: {}
  },

  {
    label: '管理单位',
    key: 'unitName-old',
    formOption: {}
  },
  {
    label: '管理人员',
    key: 'manageUserName-old',
    type: 'FormInput',
    formOption: {}
  },

  {
    label: '管理人员联系方式',
    key: 'manageUserPhone-old',
    formOption: {
      rules: ['required']
    }
  },
  {
    label: '行政区划',
    key: 'district-old',
    formOption: {
      rules: ['required']
    }
  },
  {
    label: '详细地址',
    key: 'address-old',
    formOption: {
      rules: ['required']
    }
  },
  {
    label: '经纬度',
    key: 'lonLat-old',
    formOption: {
      rules: ['required'],
      properties: {
        disabled: true
      }
    }
  },

  {
    key: 'createUserName',
    label: '创建人',
    detailable: true
  },
  {
    key: 'createTime',
    label: '创建时间',
    detailable: true
  },
  {
    key: 'lastUpdateTime',
    label: '更新时间',
    detailable: true
  },

  {
    label: '行政区划',
    key: 'district',
    type: 'FormAdministrativeSelector',
    formSection: '移植后信息',
    formOption: {
      key: 'district'
    }
  },
  {
    label: '经纬度',
    key: 'lonLat',
    formSection: '移植后信息',
    type: 'FormSelectPoint',

    formOption: {}
  },
  {
    label: '详细地址',
    key: 'address',
    formSection: '移植后信息',
    formOption: {},
    tableOption: {
      label: '移植后地点',
      sort: 5
    }
  },

  {
    label: '管理单位',
    key: 'unit',
    type: 'FormInnerOrgSelector',
    formSection: '移植后信息',

    tableOption: { sort: 9 },
    formOption: {}
  },
  {
    label: '管理人',
    key: 'manageUser',
    type: 'FormInnerOrgSelPersonSelector',
    formSection: '移植后信息',
    formOption: {}
  },

  {
    label: '管理人员联系方式',
    key: 'manageUserPhone',
    formSection: '移植后信息',
    formOption: {}
  },

  {
    label: ' 移植单位',
    key: 'removeUnit',
    type: 'FormInnerOrgSelector',
    formSection: '移植信息',

    formOption: {},
    tableOption: {
      sort: 6
    }
  },
  {
    label: '移植人',
    key: 'removeManageUser',
    type: 'FormInnerOrgSelPersonSelector',
    formSection: '移植信息',
    formOption: {},
    tableOption: {
      sort: 7
    }
  },

  {
    label: '移植人电话',
    key: 'removeUserPhone',
    formSection: '移植信息',
    tableOption: {
      sort: 8
    },
    formOption: {}
  },
  {
    label: '移植时间',
    key: 'removeTime',
    formSection: '移植信息',
    type: 'FormDateTime',
    tableOption: {
      sort: 4
    },
    formOption: {}
  },
  {
    label: '移植时间',
    key: 'handleTime',
    type: 'FormDateTimeRange',
    searchOption: {
      wraperProperties: {
        class: [
          'grid-col-6',
          'grid-col-lg-6',
          'grid-col-sm-6',
          'grid-col-ss-12',
          'grid-col-xs-12',
          'grid-col-pp-24'
        ]
      }
    }
  },

  {
    label: '移植情况说明',
    key: 'removeDesc',
    formSection: '移植信息',
    type: 'FormTextarea',
    tableOption: {
      sort: 3,
      label: '移植情况'
    },
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      }
    }
  },

  {
    key: 'filesBefore',
    label: '移植前照片',
    type: 'FormUpload',
    formSection: '附件信息',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      },
      properties: {
        // disabled: true,
        'list-type': 'picture-card',
        accept: 'img'
      },
      extra: {
        btn_text: '上传',
        tip: '单个附件大小限制20Mb，最多上传200个附件'
      }
    }
  },

  {
    key: 'filesAfter',
    label: '移植后照片',
    type: 'FormUpload',
    formSection: '附件信息',
    formOption: {
      wraperProperties: {
        class: ['grid-col-24']
      },
      properties: {
        // disabled: true,
        'list-type': 'picture-card',
        accept: 'img'
      },
      extra: {
        btn_text: '上传',
        tip: '单个附件大小限制20Mb，最多上传200个附件'
      }
    }
  }
]

export default {
  name: 'transLog',
  components: {},
  props: {
    data: {
      type: [Object, String, Number]
    }
  },
  data () {
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        list: (params) =>
          transListApi({ treeMangeId: this.data.id, ...params }),
        detail: transDetailApi
      },
      pageOptions: {
        topToolBar: null,
        listOption: {
          lineActions: {
            update: null,
            detail: {
              label: '查看',
              actionType: 'routerAction',
              router: (data) => {
                return `/assets/manage/trans?id=${data.id}&action=detail`
              },
              routerAction: 'push'
            },
            delete: null
          }
        }
      }
    }
  }
}
</script>
<style lang="css" scoped></style>
