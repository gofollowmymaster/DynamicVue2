<template>
    <!-- 普通输入框 -->
    <div :style="item.style||{}"
         :class="`form-unqiue-${item.key} ${isTextMode ? 'hz-text-box' : 'hz-untext-box'}`"
         class="form-input-box form-item-box"
    >
        <el-rate :value="val.grade" class="mb8"
                 :allow-half="true" :disabled="isDisabled" @change="rateChange"
        />
        <el-input v-if="!isTextMode"
                  :value="val.evaluate"
                  :disabled="isDisabled"
                  :placeholder="placeholder"
                  type="text"
                  v-bind="bindOptions"
                  @blur="e => onBlur( e)"
                  @focus="e => onFocus( e)"
                  @input="evaluateChange"
        />
        <div v-else :style="item.textStyle||{}" class="form-input-text">
            <span class="text">{{ val.evaluate || '-' }}</span>
        </div>
    </div>
</template>

<script>
import FormMixin from  '@/packages/components/formItems/mixin'

export default {
    name: 'FormProjectEvaluate',
    mixins: [FormMixin],
    computed: {
        val: {
            get() {
                return this.value instanceof Object ? this.value : { grade: 0, evaluate: '' }
            },
            set(v) {
       
                this.$emit('input', v)

                this.formMethods.valueUpdateEvent({
                    [this.item.key]: v
                })
            }
        }
    },
    methods: {
        rateChange(grade) {
            this.val = { grade, evaluate: this.val.evaluate }
        },
        evaluateChange(evaluate) {
            this.val = { evaluate, grade: this.val.grade }
        }
    }
}
</script>
<style>                                                                                                                                                                                                                                   position: relative;
    /* width: 100%;
    height: 36px;
    .el-input__inner {
        height: 36px;
        line-height: 36px;
    }
} */
.form-input-text {
    position: relative;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #12182a;
}
</style>
