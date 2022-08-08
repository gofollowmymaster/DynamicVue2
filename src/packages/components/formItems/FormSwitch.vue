<template>
    <!-- 普通输入框 -->
    <section>
        <el-switch
            v-if="!isTextMode"
            v-model="val"
            v-bind="bindOptions"
            :disabled="isDisabled"
        />
        <div v-else :style="item.textStyle || {}" class="form-input-text">
            {{ textModeValue || '-' }}
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
 
        textModeValue() {
            return this.val === this.bindOptions['active-value'] ? this.bindOptions['active-text'] : this.bindOptions['inactive-text']
        }
    }
}
</script>

<style scoped lang="less">

</style>
