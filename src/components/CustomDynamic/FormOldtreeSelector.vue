<template>
    <main>
        <div class="flex">
            <el-input
                v-if="!getTextModel"
                :value="val"
                :placeholder="getPlaceholder(item)"
                :disabled="getDisabled"
                type="text"
                v-bind="bindOptions"
            />
            <div v-else :style="item.textStyle || {}" class="form-input-text">
                {{ val || '-' }}
            </div>
            <el-button
                v-if="!getTextModel"
                size="small"
                :disabled="getDisabled"
                @click="selectHandleer"
            >
                选择
            </el-button>
        </div>

        <tableSelector
            v-if="!getTextModel"
            title="选择固定资产"
            :visible="visible"
            :fields="fields"
            :options-props="pageOptions"
            width="50%"
            :selected="valueObj"
            @change="change"
        />
    </main>
</template>
<script>
import FormMixin from '@/packages/components/formItems/mixin'
import { buildDynamicSelectOption } from '@/api/global'
import { assetsListApi } from '@/api/assets.js'
const fields = [
    {
        key: 'keyWord',
        type: 'FormInput',
        label: '关键字',
        searchOption: {
            wraperProperties: {
                class: ['grid-col-8']
            }

        }
    },
    {
        key: 'treeNumber',
        type: 'FormInput',
        label: '固定资产编号',
        tableOption: {}
    },

    {
        key: 'famousWood',
        type: 'FormSelect',
        label: '等级',
        options: buildDynamicSelectOption('tree_manage_famous_wood'),

        tableOption: {
            sort: 6
        }
 
    },
    {
        key: 'age',
        type: 'FormDecimalNumber',
        label: '使用年数（年）',
        tableOption: {
            sort: 5
        }
    
    },

    {
        key: 'districtName',
        label: '行政区划',
        searchOption: {
            wraperProperties: {
                class: ['grid-col-8'],
                'label-width': '90px'
            },
            key: 'district'

        },
        tableOption: {
            width: 140,
            sort: 9,
            sortable: false,
            template(row) {
                return row.admName
            }
        }
    },

    {
        label: '详细地址',
        key: 'address',
        tableOption: {}
    }
]
export default {
    name: 'FormOldtreeSelector',
    mixins: [FormMixin],

    props: {
        options: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },

    data() {
        return {
            visible: { value: false },
            fields,
            pageOptions: {
                searchOption: {
                    searchClasses: ['grid-col-8'],
                    properties: {
                        'label-width': '70px',
                        'label-position': 'right'
                    }
                },
                tableOption: {
                    loadListApi: assetsListApi
                }
            }
        }
    },
    computed: {

        valueArr() {
            if (this.value instanceof Array) return this.value.filter(item => item)
            return []
        },
        valueObj() {
            if (this.value instanceof Array) {
                return this.value.reduce((prev, next) => {
                    prev[next.id] = next
                    return prev
                }, {})
            }
            return {}
        },
        val: {
            get() {
                return this.valueArr.map(value => value.treeName || value.name).join(',')
            },
            set(value) {
                this.$emit('input', value)
                // 更新数据
                this.statusChangeFn.valueUpdateEvent({
                    [this.item.key]: value
                })
            }
        }
    },
    watch: {},
    methods: {
        selectHandleer() {
            this.visible.value = true
        },
        change(list) {
            this.val = Object.values(list)
        }
  
    }
}
</script>
