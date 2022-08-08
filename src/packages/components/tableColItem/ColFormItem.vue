<template>
    <div >
        <component
            :is="formItem.type || 'FormInput'"
            v-model="rowData[formItem.key]"
            :item="formItem"
              v-on="bindEvents"
        />
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
