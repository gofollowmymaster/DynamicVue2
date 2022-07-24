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
    protectDetailApi,
    protectListApi
} from '@/api/assetsMaintain.js'

import {protectFields}  from './assetsListField'

const entityLabel = '养护记录'

export default {
    name: 'ProtectLog',
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
            fields: protectFields,
            // 页面配置
            apiPromises: {
                list: params => protectListApi({treeMangeId: this.data.id, ...params}),
                detail: protectDetailApi
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
                                return `/assets/manage/protect?id=${data.id}&action=detail`
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

