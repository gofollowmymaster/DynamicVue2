<template>
    <!-- 普通展示 -->
    <section>
        <div><i v-if="!hideIcon" :class="`icon`" :style="{color:iconColor}" /> {{ title }}</div>
        <div style="text-align: right;" class="mt6">
            <el-button :type="cancelButtonType" size="mini" @click="$emit('cancel',{})">{{ cancelButtonText }}</el-button>
            <el-button :type="confirmButtonType" size="mini" @click="$emit('confirm',data)">{{ confirmButtonText }}</el-button>
        </div>
    </section>
</template>

<script>
import poplMixin from './mixin'

export default {
    name: 'PopConfirm',
    mixins: [poplMixin],
    props: {
        title: {
            type: String,
            default: 'el-icon-info'
        },
        icon: {
            type: String,
            default: 'el-icon-info'
        },
        'icon-color': {
            type: Boolean,
            default: false
        },
        'hide-icon': {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            data: {}

        }
    },
    computed: {},
    mounted() {

    }
}
</script>

<style scoped lang="css"></style>
