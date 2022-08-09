<template>
    <!--  字典下拉框（指通过数据字典获取选项）  -->
    <section>
        <el-select
            v-if="!isTextMode"
            v-model="val"
            style="width: 100%;"
            :disabled="isDisabled"
            :placeholder="placeholder"
            v-bind="bindOptions"
        >
            <el-option
                v-for="option in dynamicDict"
                :key="option[dictValue]"
                :label="option[dictLabel]"
                :value="option[dictValue]"
            />
        </el-select>
        <div v-else :style="item.textStyle || {}" class="form-input-text">
            {{ textModeValue || "-" }}
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
           
            dictLabel: 'dictLabel',
            dictValue: 'dictValue'
        }
    },
    computed: {
        textModeValue() {
            const content = this.dynamicDict[this.val]
            return (content && content[this.dictLabel]) || this.val
        }
    },
    mounted() {
   
        if (this.item.options.label) {
            this.dictLabel = this.item.options.label
        }
        if (this.item.options.value) {
            this.dictValue = this.item.options.value
        }

        this.item.options.apiPromise().then(res => {
            this.dynamicDict = res.reduce((prev, next) => {
                prev[next[this.dictValue] + ''] = next
                return prev
            }, {})
        })
    }
}
</script>

 