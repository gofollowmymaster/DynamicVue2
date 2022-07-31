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

               
                    this.statusChangeFn.valueUpdateEvent({
                        [this.item.key]: v
                    })
               
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
