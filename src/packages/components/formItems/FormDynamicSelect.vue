<template>
    <!--  字典下拉框（指通过数据字典获取选项）  -->
    <section>
        <el-select
            v-if="!getTextModel"
            v-model="val"
            style="width: 100%;"
            :disabled="getDisabled"
            :placeholder="getPlaceholder(item)"
            v-bind="bindOptions"
        >
            <el-option
                v-for="option in dynamicDict"
                :key="option[dictKey]"
                :label="option[dictLabel]"
                :value="option[dictValue]"
            />
        </el-select>
        <div v-else :style="item.textStyle || {}" class="form-input-text">
            {{ textModelValue || "-" }}
        </div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormDynamicSelect',
    mixins: [FormMixin],

    data: function() {
        return {
            dynamicDict: {},
            dictKey: 'id',
            dictLabel: 'dictLabel',
            dictValue: 'dictValue'
        }
    },
    computed: {
        textModelValue() {
            const content = this.dynamicDict[this.val]
            return (content && content[this.dictLabel]) || this.val
        }
    },
    mounted() {
        if (this.item.options.key) {
            this.dictKey = this.item.options.key
        }
        if (this.item.options.label) {
            this.dictLabel = this.item.options.label
        }
        if (this.item.options.value) {
            this.dictValue = this.item.options.value
        }

        this.item.options.apiPromise(this.formData()).then(res => {
            this.dynamicDict = res.reduce((prev, next) => {
                prev[next[this.dictKey] + ''] = next
                return prev
            }, {})
        })
    }
}
</script>

<style scoped lang="less">

</style>
