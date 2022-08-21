<template>
    <section>
        <el-slider
            v-if="!isTextMode"
            v-model="val"
            v-bind="bindOptions"
            :disabled="isDisabled"
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
