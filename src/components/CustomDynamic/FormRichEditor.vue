<template>
    <!-- 普通输入框 -->
    <section class="">
        <RightEditor v-if="!isTextMode"
                     v-model="val"
                     :placeholder="placeholder"
                     :disabled="isDisabled"
                     v-bind="bindOptions"
        />
        <div v-else :style="item.textStyle || {}" class="form-input-text" v-html="val" />
    </section>
</template>

<script>
import FormMixin from '@/packages/components/formItems/mixin'

export default {
    name: 'FormRichEditor',
    mixins: [FormMixin],
    data() {
        return {}
    },
    computed: {

    }
}
</script>

<style scoped lang="css">

</style>
