<template>
    <DynamicCurd
        :entity-label="entityLabel"
        :fields="fields"
        :options-props="pageOptions"
        :api-promises="apiPromises"
    />
</template>
<script>

import {
    maintainUpdateApi,
    maintainSaveApi,
    maintainDetailApi,
    maintainListApi,
    maintainDeleteApi
} from '@/api/assetsMaintain.js'

import {maintainFields}  from './assetsListField'
const entityLabel = '养护记录'

export default {
    name: 'MaitainLog',
    components: {
    },
    props: {
        data: {
            type: [Object, String, Number]
        }
    },
    data() {
        return {
            entityLabel,
            // form字段
            fields: maintainFields,
            // 页面配置
            apiPromises: {
                list: params => maintainListApi({treeMangeId: this.data.id, ...params}),
                detail: maintainDetailApi
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
                                // return `/assets/manage/maitain/${data.id}`
                                return `/assets/manage/maitain?id=${data.id}&action=detail`
                            },
                            routerAction: 'push'
                        },
                        delete: null
                        //  router:'/'
                    }
                },
                treeOption: null
            }
        }
    }
}
</script>

