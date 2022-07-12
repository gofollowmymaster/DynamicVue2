<template>
  <DynamicCurdPage
    v-if="pageOptions"
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</template>
<script>
import {
  yearPlanListApi,
  yearPlanUpdateApi,
  // oldtreeDetailApi,
  // oldtreeListApi,
  // oldtreeDeleteApi,
  // oldtreeEditDetailApi,
  exportYearPlanApi
} from '@/network/orderManage.js'
import {
  buildFormFields,
  buildSearchFields,
  buildTableFields,
  buildDetailFields,
  appendToPreset
} from '@/common/dynamicPage/utils/tool'
import { fields, modifyFields } from './yearPlanFields.js'
 
 

const entityLabel = '年度建设计划监管'

export default {
  name: 'yearPlan',
  data () {
    return {
      entityLabel,
      // form字段
      fields,
      // 页面配置
      apiPromises: {
        list: yearPlanListApi
      },
      pageOptions: {
        topToolBar: {
          create: null,
          bulkdelete: null,
          export:   {
            apiPromise: exportYearPlanApi,
            actionType:'downloadAction',
            label: '导出',
            actionDataKey: 'queryParams'
          }
        },
        listOption: {
          properties: {
            'show-summary': true,
            'summary-method':function({ columns, data }){
                 
              const sums = [];
              columns.forEach((column, index) => {
                if (index === 0) {
                  sums[index] = '合计';
                  return;
                }
                const values = data.map(item => Number(item[column.property]));
                if(['projectCode','projectName','projectAttributeDictLabel','projectTypeDictLabel'].includes(column.property)){
                    return sums[index] = '/';
                }else if (!values.every(value => isNaN(value))) {
                  sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                      return prev + curr;
                    } else {
                      return prev;
                    }
                  }, 0).toFixed(2);
                  // sums[index] += ' 元';
                } else {
                  sums[index] = '/';
                }
              });

              return sums;
            }
          },
            actionColWidth: 120,
          
          lineActions: {
            detail: null,
            update: null,
            delete: null,
            modify:  {
              label: '调整年度计划',
              actionType:'dialogFormAction',
              permission: '调整年度计划',
              containerProperties: {
                  title: '调整年度计划',
                  width:'480px'
                },
              singleCol:true,       
              formItemList: buildFormFields(modifyFields),
              'label-width':'140px',
              saveAction:{
                apiPromise:yearPlanUpdateApi
              }
          
            }
          }
        },
        
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
