<template>
    <!-- 日期选择框 -->
    <section>
        <el-date-picker v-if="!isTextMode"
                        v-model="val"
                        class="form-date-item"
                        type="date"
                        style="width: 100%;"
                        :disabled="isDisabled"
                        :placeholder="placeholder"
                        :picker-options="item.pickerOptions ? handlerDate(item.pickerOptions) : () => false"
                        value-format="yyyy-MM-dd"
                        v-bind="bindOptions"
                        @blur="e => onBlur(item, e)"
                        @focus="e => onFocus(item, e)"
        />
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ val || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormDate',
    mixins: [FormMixin],
    methods: {
        handlerDate(item) {
            const { before, after, maxOffset, minOffset } = item
            return {
                disabledDate: time => {
                    if (before) { // 限制当前时间之前
                        return time.getTime() < (Date.now() - 1000 * 60 * 60 * 24)
                    } else if (after) { // 限制当前时间之后的时间
                        return time.getTime() > Date.now()
                    } else if (maxOffset && !minOffset) {
                        return time.getTime() < maxOffset
                    } else if (minOffset && !maxOffset) {
                        return time.getTime() > minOffset - 1000 * 60 * 60 * 24
                    } else if (maxOffset && minOffset) {
                        return time.getTime() > minOffset - 1000 * 60 * 60 * 24 || time.getTime() < maxOffset
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="less">

    .form-item-box /deep/ .el-input {
        display: block;
        .el-input__inner {
            position: absolute;
            width: 100%;
            padding-right: 10px;
            padding-left: 32px;
        }
        /deep/ .el-input__prefix {
            left: 12px;
            .el-input__icon {
                // line-height: 100%;
                display: block;
                width: 16px;
            }
            .el-input__icon::before {
                font-size: 16px;
                // line-height: 36px;
            }
        }
    }
</style>
