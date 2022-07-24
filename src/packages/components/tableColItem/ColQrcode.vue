<template>
    <main class="full-width row-center">
        <el-popover placement="top" width="auto" trigger="hover">
            <QrCodeImg
                :style="colOptions.style || {}"
                class="table-col-box"
                v-bind="bindOptions"
                :value="rowData[colOptions.key]"
            />
            <!-- <el-button slot="reference">hover 激活</el-button> -->

            <img slot="reference" :src="thumbnail" class="thumbnail block" alt="">
        </el-popover>
    </main>
</template>

<script>
import TableColMixin from './mixin'

export default {
    name: 'ColQrcode',
    mixins: [TableColMixin],
    data() {
        return {
            thumbnail:
                'data:image/png;base64,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'
        }
    },
    computed: {}
}
</script>

<style scoped lang="css">
.thumbnail {
    height: 36px;
    width: 36px;
}
</style>
