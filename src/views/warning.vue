<template>
     <DynamicPageWrapper     :actions="{...pendingPageOptions.listOption.lineActions}"  :apiPromises="pendingApiPromises"  entityLabel="不动产管理"     >

  <LayoutTabs class="pt12">
    <DynamicCurd
      class=""
      :entityLabel="entityLabel"
      :fields="warningFields"
      :optionsProps="pendingPageOptions"
      :apiPromises="pendingApiPromises"
      scene="page"
      label="待处理警告"
    ></DynamicCurd>

    <DynamicCurd
      class=""
      scene="page"
      :entityLabel="entityLabel"
      :fields="warningProcessedFields"
      :optionsProps="processedPageOptions"
      :apiPromises="processedApiPromises"
      label="已处理警告"
    ></DynamicCurd>
  </LayoutTabs>
     </DynamicPageWrapper>

</template>
<script>
import {
  warningUnhandleApi,
  warningHandleApi,
  warningDetailApi,
  warningPendingListApi,
  warningProcessedListApi,
  warningInfoDeleteApi
} from '@/network/assets.js'
import {
  eventFields,
  warningFields,
  handleFields,
  unhandleFields,
  warningProcessedFields
} from './warningFields'
import { appendToPreset, buildFormFields } from '@/packages/utils/tool'

const entityLabel = '告警信息'

export default {
  name: 'warningManage',
  components: {},
  data () {
    return {
      entityLabel,
      // form字段
      warningFields,
      warningProcessedFields,
      // 页面配置
      pendingApiPromises: {
        bulkdelete: warningInfoDeleteApi,
        list: warningPendingListApi,
        detail: warningDetailApi
      },
      processedApiPromises: {
        list: warningProcessedListApi,
        detail: warningDetailApi,
        bulkdelete: warningInfoDeleteApi
      },

      pendingPageOptions: {
        topToolBar: null,
        listOption: {
          lineActions: {
            update: null,
            atransToEvent: {
              actionType: 'dialogFormAction',
              label: '转事件',
              sort: 0,
              permission: '',

              containerProperties: {
                title: '转事件',
                width: '70%'
              },

              // props: formOption,
              formItemList: buildFormFields(eventFields),
              formDataUpdateHandle (formVm, param) {},
              saveAction: {
                label: '转事件提交',
                apiPromise: () => Promise.resolve()
              }

            },
            handleForm: {
              label: '处理',
              actionType: 'dialogFormAction',
              sort: 1,
              permission: '',
              dataAdapter: (data) => {
                return { treeGiveAnAlarmId: data.id, treatmentMethod: 2 }
              },
              containertProperties: {
                title: '现场处理',
                width: '36%'
              },

              formItemList: buildFormFields(handleFields),

              saveAction: {
                label: '处理',
                apiPromise: warningHandleApi
              }
            },
            unhandleForm: {
              label: '不予处理',
              actionType: 'dialogFormAction',

              sort: 1,
              permission: '',
              dataAdapter: (data) => {
                debugger
                return { treeGiveAnAlarmId: data.id, treatmentMethod: 3 }
              },
              containerProperties: {
                title: '不予处理',
                width: '36%'
              },

              singleCol: true,

              formItemList: buildFormFields(unhandleFields),
              formDataUpdateHandle (formVm, param) {},
              saveAction: {
                label: '不予处理',
                apiPromise: warningUnhandleApi
              }
            }
          }
        },
        treeOption: null
      },
      processedPageOptions: {
        topToolBar: null,
        listOption: {
          lineActions: {
            update: null
          }
        }

      }
    }
  }
}
</script>
<style lang="css" scoped>
/deep/ .el-tabs__content{
  position: static;
}
</style>
