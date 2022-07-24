<template>
    <!-- 普通输入框 -->
    <section>
        <el-slider
            v-if="!getTextModel"
            v-model="val"
            v-bind="bindOptions"
            :disabled="getDisabled"
        />
        <div v-else>{{ val||'--' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormSlider',
    mixins: [FormMixin],
    data() {
        return {}
    },
    computed: {

    }
}
</script>

<style scoped lang="less">

</style>
