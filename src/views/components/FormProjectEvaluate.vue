<template>
    <!-- 普通输入框 -->
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
         class="form-input-box form-item-box">
        <el-rate :value="val.grade"  @change="rateChange"
            class="mb8" :allow-half="true" :disabled="getDisabled"></el-rate>
        <el-input :value="val.evaluate"
                 :disabled="getDisabled"
                  :placeholder="getPlaceholder(item)"
                  @blur="e => onBlur( e)"
                  @focus="e => onFocus( e)"
                  @input="evaluateChange"
                  type="text"
                  v-bind="bindOptions"
                  v-if="!getTextModel">
        </el-input>
        <div v-else :style="item.textStyle||{}" class="form-input-text">
            <span class="text">{{ val.evaluate || '-' }}</span>
        </div>
    </div>
</template>

<script>
    import FormMixin from '@/packages/components/formItems/mixin'

    export default {
        name: 'FormProjectEvaluate',
        mixins: [ FormMixin ],
        computed: {
             val: {
            get() {
                return this.value instanceof Object?this.value:{grade:0,evaluate:''};
            },
            set(v) {
                debugger
                this.$emit('input', v);

            
                this.statusChangeFn.valueUpdateEvent({
                    [this.item.key]: v,
                });
            }
        },
        },
        methods:{
            rateChange(grade){
                this.val={grade,evaluate:this.val.evaluate}
            },
            evaluateChange(evaluate){
                this.val={evaluate,grade:this.val.grade}

            }
        }
    };
</script>

<style scoped lang="less">
    .form-input-box /deep/ .el-input {
        position: relative;
        width: 100%;
        height: 36px;

        .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
    }

    .form-input-text {
        position: relative;
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #12182A;
    }
</style>
