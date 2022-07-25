<template>
    <div class="full-width p20 bg-white ">
        <DynamicSection :data="pageData" :body="body" />
    </div>
</template>
<script>
import { deepCopy } from '@/util/index'
import { protectLevStatisticApi, growthSituationStatisticApi, treeAgeStatisticApi, treeSpeciesStatisticApi } from '@/api/assets.js'

const searchFieldsTmpl = [

    {
        key: 'statisticType',
        type: 'FormRadio',
        label: '所属类目',
        options: [
            {
                label: '等级',
                value: 'protectLev'
            },
            {
                label: '使用状况',
                value: 'growStatus'
            },
            {
                label: '使用年数',
                value: 'treeAge'
            },
            {
                label: '资产类型',
                value: 'treeSpecies'
            }
        ],
        searchOption: {
            wraperProperties: {
                class: ['grid-col-16', 'grid-col-lg-12', 'grid-col-md-14']
            },
            groupProperties: {
                size: 'small'
            },
            properties: {
                button: true,
                border: true,
                style: { width: '120px' }
            }
        }
    }
]

export default {
    name: 'AssetsStatistic',
    components: {},
    data: function() {
        return {
            pageData: {
                statisticType: { statisticType: 'protectLev' },
                protectLev: { '': [] },
                growStatus: { '': [] },
                treeAge: { '': [] },
                treeSpecies: { '': [] },
                protectLevTable: [],
                growStatusTable: [],
                treeAgeTable: [],
                treeSpeciesTable: []

            },
            num: 100,
            layout: {
                name: 'LayoutGrid'
            }
        }
    },
    computed: {
        body() {
           
            const searchFields = deepCopy(searchFieldsTmpl)
            searchFields.push({
                key: 'tip',
                type: 'FormText',
                wraperProperties: {
                    class: ['grid-col-8']
                },
                searchOption: {
                    content: `该区域下固定资产总共${this.num}台`
                }
            })
            return [
                {
                    component: 'DynamicSearchForm',
                    name: 'statisticType',
                    props:
                        {
                            class: ['grid-col-24'],
                            options:  this.$appendToPreset('searchOption',{
                                properties: {
                                    'label-width': '100px',
                                    'label-position': 'right'
                                },
                                borderForm: false,
                                trigger: 'click',
                                resetable: false,
                                testTool:false,
                            }),
                            fields: this.$buildSearchFields(searchFields)
                        }
                },

                {
                    component: 'componentWithTitle',
                    name: 'protectLev',
                    key: 'protectLevChart',
                    hidden: this.pageData.statisticType.statisticType !== 'protectLev',
                    props:
                        {
                            bodyComponent: 'dBarChart',
                            title: '统计图',
                            class: ['grid-col-12'],
                            style: { height: '300px' },
                            // data:this.protectLevData,
                            extraOptions: {
                            }
                        }
                },
                {
                    component: 'componentWithTitle',
                    name: 'protectLevTable',
                    key: 'protectLevTable',
                    hidden: this.pageData.statisticType.statisticType !== 'protectLev',
                    props:
                        {
                            bodyComponent: 'DynamicTable',
                            class: ['grid-col-12'],
                            style: { height: '300px' },
                            title: '统计表',
                            table: this.$appendToPreset('tableOption', {
                                hasCheckbox: false
                            }),
                            columns: [
                                {
                                    key: 'label',
                                    label: '等级'
                                },
                                {
                                    key: 'value',
                                    label: '台资产'
                                }],

                            extraOptions: {
                            }
                        }
                },
                {
                    component: 'componentWithTitle',
                    name: 'growStatus',
                    key: 'growStatusChart',
                    hidden: this.pageData.statisticType.statisticType !== 'growStatus',
                    props:
                        {
                            bodyComponent: 'dBarChart',
                            title: '统计图',
                            class: ['grid-col-12'],
                            style: { height: '300px' },
                            // data:this.situationData,
                            extraOptions: {
                            }
                        }
                },
                {
                    component: 'componentWithTitle',
                    name: 'growStatusTable',
                    key: 'growStatusTable',
                    hidden: this.pageData.statisticType.statisticType !== 'growStatus',
                    props:
                        {

                            bodyComponent: 'DynamicTable',
                            class: ['grid-col-12'],
                            style: { height: '300px' },
                            title: '统计表',
                            table: this.$appendToPreset('tableOption', {
                                hasCheckbox: false
                            }),
                            columns: [ 
                                {
                                    key: 'label',
                                    label: '使用状况'
                                },
                                {
                                    key: 'value',
                                    label: '台资产'
                                }],

                            extraOptions: {
                            }
                        }
                },

                {
                    component: 'componentWithTitle',
                    name: 'treeAge',
                    key: 'treeAgeChart',
                    hidden: this.pageData.statisticType.statisticType !== 'treeAge',
                    props:
                        {
                            bodyComponent: 'dBarChart',
                            title: '统计图',
                            class: ['grid-col-12'],
                            style: { height: '300px' },
                            // data:this.treeAgeData,
                            extraOptions: {
                            }
                        }
                },
                {
                    component: 'componentWithTitle',
                    name: 'treeAgeTable',
                    key: 'treeAgeTable',
                    hidden: this.pageData.statisticType.statisticType !== 'treeAge',
                    props:
                        {
                            bodyComponent: 'DynamicTable',
                            class: ['grid-col-12'],
                            style: { height: '300px' },
                            title: '统计表',
                            table: this.$appendToPreset('tableOption', {
                                hasCheckbox: false
                            }),
                            columns: [ 
                                {
                                    key: 'label',
                                    label: '使用年数'
                                },
                                {
                                    key: 'value',
                                    label: '台资产'
                                }],

                            extraOptions: {
                            }
                        }
                },
                {
                    component: 'componentWithTitle',
                    name: 'treeSpecies',
                    key: 'treeSpeciesChart',
                    hidden: this.pageData.statisticType.statisticType !== 'treeSpecies',
                    props:
                        {
                            bodyComponent: 'dBarChart',
                            title: '统计图',
                            class: ['grid-col-24'],
                            style: { height: '300px' },
                            extraOptions: {
                            }
                        }
                },
                {
                    component: 'componentWithTitle',
                    name: 'treeSpeciesTable',
                    key: 'treeSpeciesTable',
                    hidden: this.pageData.statisticType.statisticType !== 'treeSpecies',
                    props:
                        {
                            bodyComponent: 'DynamicTable',
                            class: ['grid-col-24'],
                            style: { height: '300px' },
                            title: '统计表',
                            table: this.$appendToPreset('tableOption', {
                                hasCheckbox: false
                            }),
                            columns: [ 
                                {
                                    key: 'label',
                                    label: '资产类型'
                                },
                                {
                                    key: 'value',
                                    label: '台资产'
                                }],

                            extraOptions: {
                            }
                        }
                }
            ]
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        onSearch(params) {},
        loadData() {
            protectLevStatisticApi().then(data => {
                this.pageData.protectLev = {
                    等级: data.map(item => {
                        return { value: item.countNumber, label: item.categoryName }
                    })
                }
                this.pageData.protectLevTable = data.map(item => {
                    return { value: item.countNumber, label: item.categoryName }
                })
                this.num = data.reduce((prev, next) => {
                    return prev + next.countNumber
                }, 0)
            })

            growthSituationStatisticApi().then(data => {
                this.pageData.growStatus = {
                    使用状况: data.map(item => {
                        return { value: item.countNumber, label: item.categoryName }
                    })
                }

                this.pageData.growStatusTable = data.map(item => {
                    return { value: item.countNumber, label: item.categoryName }
                })
            })

            treeAgeStatisticApi().then(data => {
                this.pageData.treeAge = {
                    使用年数: data.map(item => {
                        return { value: item.countNumber, label: item.categoryName }
                    })
                }
                this.pageData.treeAgeTable = data.map(item => {
                    return { value: item.countNumber, label: item.categoryName }
                })
            })

            treeSpeciesStatisticApi().then(data => {
                this.pageData.treeSpecies = {
                    资产类型: data.map(item => {
                        return { value: item.countNumber, label: item.categoryName?.slice(0, 5) }
                    })
                }
                this.pageData.treeSpeciesTable = data.map(item => {
                    return { value: item.countNumber, label: item.categoryName?.slice(0, 5) }
                })
            })
        }
    }
}
</script>

<style lang="css" scoped>
.BackStageFrameWork {
    height: 100%;
    padding: 20px;
}
.margin-top16 {
    margin-top: 16px;
}
</style>
