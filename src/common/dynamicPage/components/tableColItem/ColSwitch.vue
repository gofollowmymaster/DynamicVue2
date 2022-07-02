<template>
    <!-- switch -->
    <section>
          <el-switch :style="item.style||{}"
         class="table-col-box  "
         v-bind="bindOptions"
         v-model="rowData[field]"
         @change="item.events.change(rowData,$event)">
    </el-switch>
    </section>

</template>

<script>
    import TableColMixin from './mixin';

    export default {
        name: 'ColSwitch',
        mixins: [ TableColMixin ],
        computed: {
        }
    };
</script>

<style scoped lang="less">
    
</style>
