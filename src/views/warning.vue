<template>
    
   <LayoutTabs  class="pt12">
    <DynamicCurd
    class=" "
      :entityLabel="entityLabel"
      :fields="warningFields"
      :optionsProps="pendingPageOptions"
      :apiPromises="pendingApiPromises"
      scene="page"
      label="待处理警告"
    ></DynamicCurd>
    <DynamicCurd
    class=" "
      scene="page"
      :entityLabel="entityLabel"
      :fields="warningProcessedFields"
      :optionsProps="processedPageOptions"
      :apiPromises="processedApiPromises"
      label="已处理警告"
    ></DynamicCurd>
  </LayoutTabs>

  
</template>
<script>
import {
  warningUnhandleApi,
  warningHandleApi,
  warningDetailApi,
  warningPendingListApi,
  warningProcessedListApi,
  warningInfoDeleteApi
} from '@/network/oldtree.js'
import {
  eventFields,
  warningFields,
  handleFields,
  unhandleFields,
  warningProcessedFields
} from './warningFields'
import {
  appendToPreset,
  buildFormFields
} from '@/common/dynamicPage/utils/tool'


const entityLabel = '告警信息'

export default {
  name: 'warningManage',
  components: { },
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
        detail: warningDetailApi,
      },
      processedApiPromises: {
        list: warningProcessedListApi,
        detail: warningDetailApi,
        bulkdelete: warningInfoDeleteApi,

      },

      pendingPageOptions: {
        topToolBar: null,
        listOption: {
          lineActions: {
            update: null,
            atransToEvent: appendToPreset('dialogFormActionOption', {
              label: '转事件',
              sort: 0,
              permission: '',
              dialog: {
                properties: {
                  title: '转事件',
                  width: '70%'
                },
                body: {
                  // props: formOption,
                  formItemList: buildFormFields(eventFields),
                  formDataUpdateHandle (formVm, param) {},
                  actions: {
                    save: {
                      label: '转事件提交',
                      apiPromise: () => Promise.resolve()
                    }
                  }
                }
              }
            }),
            handleForm: appendToPreset('dialogFormActionOption', {
              label: '处理',
              sort: 1,
              permission: '',
              dataAdapter:(data)=>{
                return {treeGiveAnAlarmId:data.id,treatmentMethod:2}
              },
              dialog: {
                properties: {
                  title: '现场处理',
                  width: '36%'
                },
                body: {
                  formItemList: buildFormFields(handleFields),
                  actions: {
                    save: {
                      label: '处理',
                      apiPromise: warningHandleApi
                    }
                  }
                }
              }
            }),
            unhandleForm: appendToPreset('dialogFormActionOption', {
              label: '不予处理',
              sort: 1,
              permission: '',
              dataAdapter:(data)=>{
                debugger
                return {treeGiveAnAlarmId:data.id,treatmentMethod:3}
              },
              dialog: {
                properties: {
                  title: '不予处理',
                  width: '36%'
                },
                body: {
                  formOption: {
                    singleCol:true,
                  },
                  formItemList: buildFormFields(unhandleFields),
                  formDataUpdateHandle (formVm, param) {},
                  actions: {
                    save: {
                      label: '不予处理',
                      apiPromise: warningUnhandleApi
                    }
                  }
                }
              }
            })
          }
        },
        treeOption: null
      },
      processedPageOptions: {
        topToolBar: null,
        listOption: {
         lineActions: {
            update: null,
          }
        },
        treeOption: null

      }
    }
  }
}
</script>
<style lang="less" scoped></style>
