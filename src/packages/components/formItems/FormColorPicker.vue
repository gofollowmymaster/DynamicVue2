<template>
    <!-- 普通输入框 -->
    <section>
        <el-color-picker
            v-if="!getTextModel"
            v-model="val"
            class="block"
            v-bind="bindOptions"
            :disabled="getDisabled"
        />
        <div v-else class="full-width flex align-center">{{ val }} <div class="inline-block ml12" :style="{backgroundColor:val,width:'18px',height:'18px'}" /></div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormColorPicker',
    mixins: [FormMixin],
    data() {
        return {}
    },
    computed: {

    }
}
</script>

<style scoped lang="less">

/deep/ .el-color-picker__trigger {
    width: 100%;
}
</style>
