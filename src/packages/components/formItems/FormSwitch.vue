<template>
    <!-- 普通输入框 -->
    <section>
        <el-switch
            v-if="!getTextModel"
            v-model="val"
            v-bind="bindOptions"
            :disabled="getDisabled"
        />
        <div v-else :style="item.textStyle || {}" class="form-input-text">
            {{ textModelValue || '-' }}
        </div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormSwitch',
    mixins: [FormMixin],
    data() {
        return {}
    },
    computed: {

        bindOptions() {
            let obj = Object.assign({}, this.item)

            obj = { ...obj, ...obj.properties }
            delete obj.wraperProperties
            delete obj.key
            delete obj.type
            delete obj.label
            delete obj.readonly
            delete obj.rules
            delete obj.extra
            delete obj.properties
            delete obj.options
            //   obj['active-text']=obj['active-text']||
            return obj
        },
        textModelValue() {
            return this.val === this.bindOptions['active-value'] ? this.bindOptions['active-text'] : this.bindOptions['inactive-text']
        }
    }
}
</script>

<style scoped lang="less">

</style>
