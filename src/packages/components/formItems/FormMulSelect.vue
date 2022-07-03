<template>
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
         class="form-item-box">
        <el-select style="width:100%"
                   v-model="val"
                   multiple
                   collapse-tags
                   :disabled="getDisabled"
                   :placeholder="getSelectPlaceholder(item)"
                   v-bind="bindOptions"
                   v-if="!getTextModel">
            <el-option v-for="option in item.options"
                       :key="option.value"
                       :label="option.label"
                       :value="option.value"/>
        </el-select>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModelValue || '-' }}</div>
    </div>
</template>

<script>

    import FormMixin from './mixin';

    export default {
        name: 'FormMulSelect',
        mixins: [ FormMixin ],
        computed: {
            textModelValue () {
                if (this.item.options) {
                    let val = '';
                    this.item.options.forEach(item => {
                        if (item.value === this.value) {
                            val = item.label;
                        }
                    });
                    return val;
                } else {
                    return '';
                }
            },
            val: {
                get () {
                    return this.value||[];
                },
                set (v) {
                    this.$emit('input', v);
                    this._valueLink(v);
                    this.statusChangeFn.valueUpdateEvent({
                        [this.item.key]: v,
                    });
                
                }
            },
        }
    };
</script>

<style scoped lang="less">

    .el-select-dropdown__item.selected {
        color: #606266;
        font-weight: normal;
    }

</style>
