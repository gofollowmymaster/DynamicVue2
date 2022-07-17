<template>
  <DynamicCurd
    class="full-width building-progress"
    :entityLabel="entityLabel"
    :fields="fields"
    :optionsProps="pageOptions"
    :apiPromises="apiPromises"
    :data="data"
  ></DynamicCurd>
</template>
<script>
import {
  projectProgressListApi,
  projectProgressUpdateApi
} from '@/network/orderManage.js'
import fields from './progressFields.js'

const entityLabel = '项目进度'

export default {
  name: 'buildingProgress',
  props: {
    data: {
      type: [Object, String, Number]
    },
    mode: String
  },
  data () {
    debugger
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        update: projectProgressUpdateApi,
        list: (params) => {
          debugger
          params.projectLibraryId = this.data.id
          return projectProgressListApi(params)
        }
      },
      pageOptions: {
        searchOption: this.mode === 'textMode' ? null : {
          trigger: 'change',
          resetable: false
        },
        topToolBar: null,
        listOption: {
          hasCheckbox: false,
          properties: {
            border: this.mode !== 'textMode'
          },
          lineActions: this.mode === 'textMode' ? null : {
            update: {
              label: '填报',
              isShow: (data) => {
                return data.isShow
              },
              dialog: {
                container: 'el-dialog',
                properties: {
                  title: '填报项目进度',
                  width: '36%'
                }
              }
            },
            detail: null,
            delete: null

          }
        },
        // pagination: null,
        treeOption: null
      }
    }
  }
}
</script>
<style lang="less"  >
 .building-progress .el-form-item__content .form-item-box{
  width: 100%;
}
</style>
