<template>
    <!-- switch -->
    <section>
        <el-switch v-model="rowData[colOptions.key]"
                   :style="colOptions.style||{}"
                   class="table-col-box  "
                   v-bind="bindOptions"
                   @change="colOptions.events.change(rowData,$event)"
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
