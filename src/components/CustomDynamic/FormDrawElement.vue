<template>
    <!-- 普通输入框 -->
    <main>
        <div class="flex justify-between pr12">
            <el-input
                v-if="!isTextMode"
                :value="value"
                :placeholder="placeholder"
                :disabled="isDisabled"
                type="text"
                v-bind="bindOptions"
                readonly
                @blur="e => onBlur(item, e)"
            />
            <div
                v-else
                :style="item.textStyle || {}"
                class="form-input-text text-ellipsis"
            >
                {{ value || '-' }}
            </div>
            <el-button
                size="small"
                type="text"
                :disabled="isDisabled"
                class="ml10"
                @click="selectPoint"
            >
                {{ !isTextMode ? '选择' : '查看' }}
            </el-button>
        </div>
        <DrawElementGis
            v-if="visible.value"
            v-model="val"
            :visible="visible"
            :zoom="zoom"
            :title="title"
            :draw-type="bindOptions.drawType"
            :mode="isTextMode ? 'view' : 'select'"
        />
    </main>
</template>

<script>
import  FormMixin  from '@/packages/components/formItems/mixin'
import DrawElementGis from './components/DrawElementGis.vue'

export default {
    name: 'FormDrawElement',
    components: { DrawElementGis },
    mixins: [FormMixin],
    props: {
        zoom: {
            type: Number,
            default: function() {
                return 11
            }
        },
        title: {
            type: String,
            default: function() {
                return '选择位置'
            }
        }
    },
    data: function() {
        return {
            visible: { value: false }
        }
    },
    computed: {
        val: {
            get() {
                let value
                try {
                    value = JSON.parse(this.value)
                } catch (e) {
                    value = []
                }
                return value
            },
            set(lnglat) {
                this.$emit('input', JSON.stringify(lnglat))

                this.formMethods.valueUpdateEvent({
                    [this.item.key]: lnglat
                })
            }
        }
    },
    created() {},

    methods: {
        selectPoint() {
            this.visible.value = true
        }
    }
}
</script>
