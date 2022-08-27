<template>
    <div class=" inline-block" :class="[size+'-label']">
        <el-tooltip :content="tip" placement="top">
            <i :class="icon||'el-icon-info'" />
        </el-tooltip>
        <span class="ml4">{{ label }}</span>
    </div>
</template>
<script>
export default {
    name: 'LabelWithTip',
    components: {},
    props: {

        label: {
            type: String,
            require: true
        },
        tip: {
            type: String,
            require: true
        },
        icon: {
            type: String,
            default: 'el-icon-info'
        },
        size: {
            type: String,
            default: 'small'
        }
    },
    data: function() {
        return {}
    },

    watch: {

    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style lang="css" scoped>
    .small-tip{

    }
    .mini-tip{

    }
    .normal-tip{

    }
</style>
