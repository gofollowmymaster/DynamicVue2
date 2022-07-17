<template>
    <!-- switch -->
    <section>
          <el-switch :style="colOptions.style||{}"
         class="table-col-box  "
         v-bind="bindOptions"
         v-model="rowData[colOptions.key]"
         @change="colOptions.events.change(rowData,$event)">
    </el-switch>
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

<style scoped lang="less">

</style>
