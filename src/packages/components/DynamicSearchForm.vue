<template>
    <main class="flex relative search-container">
        <DynamicFormContent ref="searchOption" :form-item-list="formFields" v-bind="searchFormOption"
                            :form-properties="searchFormOption.properties" :data="data" :col-num="4" @formDataUpdated="change"
        >
            <template #actionBtnSlot>
                <section class="  ">
                    <el-button v-if="searchFormOption.trigger=='click'" class="lh10" type="primary" :size="btnSize" icon="el-icon-search" @click="submit">{{ searchFormOption.searchLabel||'搜索' }}</el-button>
                    <el-button v-if="searchFormOption.resetable" class="lh10" :size="btnSize" icon="el-icon-refresh" @click="reset">重置</el-button>
                </section>
            </template>
        </DynamicFormContent>
        <el-button v-if="searchFormOption.mainNum<fields[0].children.length" class="ml12 align-self-start " type="text" :size="btnSize" @click="switchSearchBar">
            高级筛选
            <i :class="[isExpand?'el-icon-arrow-up':'el-icon-arrow-down']" />
        </el-button>
    </main>
</template>
<script>
import { deepCopy,  } from '../utils/tool'
import { presetConfig,loadPresetConfig }  from '../presetConfig'

export default {
    name: 'DymamicSearchForm',
    components: {},
    props: {
        data: {
            type: [Object],
            default() {
                return {}
            }
        },
        fields: {
            type: Array,
            default: function() {
                return []
            }
        },
        options: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data: function() {
        return {
            btnSize: presetConfig.getConfig('btnSize'),
            isExpand: false
        }
    },
    computed: {
        searchFormOption() {
            return  this.$appendToPreset('searchOption', this.options)
        },
        formFields() {
            const fieldsClone = deepCopy(this.fields)
            if (!this.isExpand) {
                const mainNum = this.searchFormOption.mainNum || 5
                if (fieldsClone[0].children.length >= mainNum) {
                    fieldsClone[0].children.splice(mainNum)
                }
            }
            fieldsClone[0].children.push({
                type: 'slot',
                wrapertype: 'div',
                key: 'actionBtnSlot',
                label: '',
                wraperProperties: {
                    class: this.isExpand ? ['grid-col-24'] : this.searchFormOption.searchClasses,
                    style: { 'margin-left': this.isExpand ? (this.searchFormOption.properties['label-width'] || '100px') : '12px' }
                }
            })
            return fieldsClone
        }

    },
    mounted() {

    },
    methods: {
        switchSearchBar() {
            debugger
            this.isExpand = !this.isExpand
        },
        change() {
            if (this.searchFormOption.trigger === 'change') {
                this.$nextTick(() => {
                    this.submit()
                })
            }
        },
        submit() {
            const data = this.$refs.searchOption.getData()
            delete data.actionBtnSlot
            this.$emit('search', data)
        },
        reset() {
            this.$refs.searchOption.resetFields()
            const data = this.$refs.searchOption.getData()
            delete data.actionBtnSlot
            this.$emit('search', data)
        }
    }
}
</script>
<style lang="css" scoped>
.search-container {
    --layout-row-gap: 24px;
    --layout-gap: 4px;
}
.align-self-start {
    align-self: flex-start;
}
</style>
