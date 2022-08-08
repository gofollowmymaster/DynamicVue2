<template>
    <!-- 普通输入框 -->
    <section>
        <el-cascader v-if="!isTextMode" v-model.trim="val" :disabled="isDisabled" :options="item.options" v-bind="bindOptions" />
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModeValue || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormCascader',
    mixins: [FormMixin],
    data() {
        return {
        }
    },
    computed: {
        textModeValue() {
            return this.val.join(',')
        }
    }
}
</script>

<style scoped lang="css">
   .el-cascader {
                 width: 100%;
          }
</style>
