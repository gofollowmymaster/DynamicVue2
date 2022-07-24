<template>
    <DynamicCurd
        :entity-label="entityLabel"
        :fields="fields"
        :options-props="pageOptions"
        :api-promises="apiPromises"
    />
</template>
<script>
import { transDetailApi, transListApi } from '@/api/assetsMaintain.js'

const entityLabel = '移植记录'
import {transFields}  from './assetsListField'

export default {
    name: 'TransLog',
    components: {},
    props: {
        data: {
            type: [Object, String, Number]
        }
    },
    data() {
        return {
            entityLabel,
            // form字段
            fields: transFields,
            // 页面配置
            apiPromises: {
                list: params =>
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
                            router: data => {
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

