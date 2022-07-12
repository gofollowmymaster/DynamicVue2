<template>
    <!-- 普通输入框 -->
    <section    class=" form-area-box">
        <RightEditor v-model="val"
                  :placeholder="getPlaceholder(item)"
                  :disabled="getDisabled"
                  v-bind="bindOptions"
                  v-if="!getTextModel"/>
        <div v-else :style="item.textStyle || {}" class="form-input-text" v-html="val">
        </div>
    </section>
</template>

<script>
    import FormMixin from './mixin';

    export default {
        name: 'FormRichEditor',
        mixins: [ FormMixin ],
        data () {
            return {};
        },
        computed: {
            // 前置符号
            prepend () {
                // 兼容性处理
                if (this.item.prepend) {
                    return this.item.prepend;
                } else if (this.item.prependMsg) {
                    return this.item.prependMsg;
                } else {
                    return '';
                }
            },
            // 后置符号
            append () {
                // 兼容性处理
                if (this.item.append) {
                    return this.item.append;
                } else if (this.item.appendMsg) {
                    return this.item.appendMsg;
                } else {
                    return '';
                }
            },
        }
    };
</script>

<style scoped lang="css">
 

    .form-area-box   /deep/ .el-form-item__content {
            height: auto;
    }


</style>
