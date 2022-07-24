<template>
    <div class="full-height">
        <div v-if="!getTextModel" class="full-height" :style="item.textStyle||{}">
            {{ value||item.content || '-' }}
        </div>
    </div>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormText',
    mixins: [FormMixin],
    computed: {

    }
}
</script>

<style scoped lang="less">

</style>
