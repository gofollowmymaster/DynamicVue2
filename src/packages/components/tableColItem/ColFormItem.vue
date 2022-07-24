<template>
    <!-- 普通展示 -->
    <div
        :style="colOptions.style || {}"
        :class="`form-unqiue-${colOptions.key}`"
        class="table-col-box text-ellipsis"
    >
        <component
            :is="formItem.type || 'FormInput'"
            v-model="rowData[formItem.key]"
            :item="formItem"
        />
    <!-- <DynamicFormItem v-model="rowData[formItem.key]" :formItem="formItem"></DynamicFormItem> -->
    </div>
</template>

<script>
import TableColMixin from './mixin'

export default {
    name: 'ColFormItem',
    mixins: [TableColMixin],
    data() {
        return {
        }
    },
    computed: {
        formItem() {
            return {
                ...this.colOptions, ...this.colOptions.formOption
            }
        }
    },
    mounted() {

    }
}
</script>

<style scoped lang="css"></style>
