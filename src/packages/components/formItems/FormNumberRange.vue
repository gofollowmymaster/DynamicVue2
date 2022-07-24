<template>
    <!-- 数字输入框 -->
    <section>
        <section v-if="!getTextModel" class="flex justify-between">
            <el-input :value="val[0]"
                      :disabled="getDisabled"
                      type="number"
                      v-bind="bindOptions"
                      @input="startChange"
            >
                <template v-if="item.prepend" slot="prepend">{{ item.prepend }}</template>
                <template v-if="item.append" slot="append">{{ item.append }}</template>
            </el-input>
            <span class="mx12">-</span>
            <el-input :value="val[1]"
                      :disabled="getDisabled"
                      type="number"
                      v-bind="bindOptions"
                      @input="endChange"
            >
                <template v-if="item.prepend" slot="prepend">{{ item.prepend }}</template>
                <template v-if="item.append" slot="append">{{ item.append }}</template>
            </el-input>
            <!-- <span class="ml8 mr16">{{item.append}}</span> -->
        </section>
        <div v-else :style="item.textStyle||{}" class="form-input-text">
            {{ item.prepend }}
            {{ textModelValue }}
            {{ item.append }}
        </div>
    </section>
</template>

<script>

import FormMixin from './mixin'
// import { isEmpty } from '../../utils/tool'

export default {
    name: 'FormNumberRange',
    mixins: [FormMixin],
    data() {
        return {
            readonly: true
            // 在编辑模式下，使用这个 tempVal 替代真实的 val
            // 在触发 blur 事件时，用这个更新原来的 val

        }
    },
    computed: {
        valueObj() {
            return (Array.isArray(this.value) && this.value.length > 1) ? this.value : [null, null]
        },
        textModelValue() {
            return this.valueObj.join(' - ')
        },
        val: {
            get() {
                return this.valueObj
            },
            set(v) {
                this.$emit('input', v)

                // 只有非子表单的情况下，才会冒泡上去数据变更
                if (this.formItemType !== 'childForm') {
                    this.statusChangeFn.valueUpdateEvent({
                        [this.item.key]: v
                    })
                } else {
                    // 如果是子表单的话，执行内置的变更
                    this.childChangeData.valueUpdateEvent()
                }
            }
        }
    },
    methods: {
        startChange(data) {
            debugger
            this.val = [data, this.val[1]]
        },
        endChange(data) {
            debugger
            this.val = [this.val[0], data]
        }

    }
}
</script>

<style scoped lang="less">

</style>
