<template>
    <!-- 普通展示 -->
    <section class="hz-low-code m6" style="width: 180px;">
        <div>新增订单状态:</div>
        <el-radio-group v-model="data.orderStatus" class="flex flex-direction align-left px12">
            <el-radio :label="0" class="mt12">下单中</el-radio>
            <el-radio :label="1" class="mt12">处理中</el-radio>
            <el-radio :label="2" class="mt12">运输中</el-radio>
            <el-radio :label="3" class="mt12">完成</el-radio>
        </el-radio-group>
        <div style="text-align: right;" class="mt18">
            <el-button :type="cancelButtonType" size="mini" @click="$emit('cancel',{})">{{ cancelButtonText }}</el-button>
            <el-button :type="confirmButtonType" size="mini" @click="$emit('confirm',data)">{{ confirmButtonText }}</el-button>
        </div>
    </section>
</template>

<script>
import popMixin from '@/packages/components/popContents/mixin'

export default {
    name: 'PopProjectRadio',
    mixins: [popMixin],
    props: {

    },
    data() {
        return {
            data: {
                orderStatus: 1
            }

        }
    },
    computed: {},
    mounted() {

    }
}
</script>

