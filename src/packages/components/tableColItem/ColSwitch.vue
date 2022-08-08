<template>
    <!-- switch -->
    <section>
        <el-switch v-model="rowData[colOptions.key]"
                   :style="colOptions.style||{}"
                   v-bind="bindOptions"
                   v-on="bindEvents"
        />
    </section>
</template>

<script>
import TableColMixin from './mixin'

export default {
    name: 'ColSwitch',
    mixins: [TableColMixin],
    computed: {
    }
}
</script>

<style scoped lang="css">

</style>
