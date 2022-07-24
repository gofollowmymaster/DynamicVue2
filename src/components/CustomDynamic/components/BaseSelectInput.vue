<template>
    <el-input
        v-model="value"
        :placeholder="placeholder"
        readonly
        :disabled="disabled"
        :size="size"
        @focus="onFocus"
    >
        <i v-if="clearable && !disabled && value" slot="suffix" class="el-icon-circle-close" @click.stop="onClear" />
    </el-input>
</template>
<script>
export default {
    name: 'BaseSelectInput',
    props: {
        // 输入框内容
        value: {
            type: String,
            default: ''
        },
        // 输入框尺寸
        size: {
            type: String,
            default: 'small'
        },
        placeholder: {
            type: String,
            default: ''
        },
        // 是否显示清除按钮
        clearable: {
            type: Boolean,
            default: true
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onFocus() {
            this.$emit('focus')
        },
        onClear() {
            this.$emit('clear')
        }
    }
}
</script>