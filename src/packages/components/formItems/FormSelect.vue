<template>
    <section>
        <el-select v-if="!isTextMode"
                   v-model="val"
                   style="width: 100%;"
                   :disabled="isDisabled"
                   :placeholder="placeholder"
                   v-bind="bindOptions"
        >
            <el-option v-for="option in item.options"
                       :key="option.value"
                       :label="option.label"
                       :value="option.value"
            />
        </el-select>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModeValue || '-' }}   </div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormSelect',
    mixins: [FormMixin],
    computed: {
        textModeValue() {
            if (this.item.options) {
                let val = ''
                this.item.options.forEach(item => {
                    if (item.value === this.value) {
                        val = item.label
                    }
                })
                return val
            } else {
                return ''
            }
        }

    }
}
</script>

<style scoped lang="css">

</style>
