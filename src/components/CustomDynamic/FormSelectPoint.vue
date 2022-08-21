<template>
    <main>
        <div class="flex justify-between pr12">
            <el-input
                v-if="!isTextMode"
                :value="val.regeocode.formattedAddress"
                :placeholder="placeholder"
                :disabled="isDisabled"
                type="text"
                v-bind="bindOptions"
                readonly
                @blur="(e) => onBlur(item, e)"
            />
            <div v-else class="form-input-text text-ellipsis">{{ value || '-' }}   </div>
            <el-button size="small" type="text" :disabled="isDisabled" class="ml10" @click="selectPoint">{{ !isTextMode?"选择":"查看" }}</el-button>
        </div>
 
        <PointSelectDialog
            v-if="visible.value"
            :position="val"
            :visible="visible"
            :zoom="zoom"
            :title="title"
            :mode="isTextMode?&quot;view&quot;:&quot;select&quot;"
            @confirm="onSaveDialog"
        />
    </main>
</template>

<script>
import FormMixin from  '@/packages/components/formItems/mixin'
export default {
    name: 'FormSelectPoint',
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
                return this.value?.lnglat ? this.value : {    lnglat: [],      regeocode: {}   } 
            },
            set(value) {
                this.$emit('input', value)
                // 更新数据
                this.statusChangeFn.valueUpdateEvent({
                    [this.item.key]: value
                })
            }
        }
 
    },
    created() {

    },

    methods: {
        selectPoint() {
            this.visible.value = true
        },
        onSaveDialog(value) {
            this.$emit('input', value)
        },
 
        onClear() {
            this.$emit('input', {lnglat: [], regeocode: {}   })
        }
    }
}
</script>

<style scoped lang="css"></style> 
