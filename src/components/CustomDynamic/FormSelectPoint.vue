<template>
    <main>
        <div class="flex justify-between pr12">
            <el-input
                v-if="!getTextModel"
                :value="val.regeocode.formattedAddress"
                :placeholder="getPlaceholder(item)"
                :disabled="getDisabled"
                type="text"
                v-bind="bindOptions"
                readonly
                @blur="(e) => onBlur(item, e)"
            />
            <div v-else class="form-input-text text-ellipsis">{{ value || '-' }}   </div>
            <el-button size="small" type="text" :disabled="getDisabled" class="ml10" @click="selectPoint">{{ !getTextModel?"选择":"查看" }}</el-button>
        </div>
 
        <PointSelectDialog
            v-if="visible.value"
            :position="val"
            :visible="visible"
            :zoom="zoom"
            :title="title"
            :mode="getTextModel?&quot;view&quot;:&quot;select&quot;"
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
