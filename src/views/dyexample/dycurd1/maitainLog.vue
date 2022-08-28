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
    maintainDetailApi,
    maintainListApi,
} from '@/api/assetsMaintain.js'

import {maintainFields}  from './assetsListField'
const entityLabel = '维护记录'

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
                list: params => maintainListApi({assetsId: this.data.id, ...params}),
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
                                return ''
                            },
                            routerAction: 'push'
                        },
                        delete: null
                        //  router:'/'
                    }
                },
            }
        }
    }
}
</script>

