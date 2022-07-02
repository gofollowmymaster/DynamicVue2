<template>
    <!-- 小时、分钟 输入框 -->
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
         class="form-item-box">
        <el-time-picker v-model="val"
                        class="form-date-item"
                        type="date"
                        style="width: 100%"
                        :disabled="getDisabled"
                        :placeholder="getPlaceholder(item)"
                        @blur="e => onBlur(item, e)"
                        @focus="e => onFocus(item, e)"
                        :format="item.format || 'HH:mm'"
                        :value-format="item['value-format'] || 'HH:mm:00'"
                        v-bind="bindOptions"
                        v-if="!getTextModel"/>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ val || '-' }}</div>
    </div>
</template>

<script>
    import FormMixin from './mixin';

    export default {
        name: 'FormHourMinute',
        mixins: [ FormMixin ],
        methods: {}
    };
</script>

<style scoped lang="less">
    .form-item-box /deep/ .el-input {
 

        .el-input__inner {
            position: absolute;
            width: 100%;
            padding-right: 10px;
            padding-left: 32px;
        }

        /deep/ .el-input__prefix {
            left: 12px;

            .el-input__icon {
                line-height: 100%;
                display: block;
                width: 16px;
            }

            .el-input__icon:before {
                font-size: 16px;
                // line-height: 36px;
            }
        }

    }
</style>
