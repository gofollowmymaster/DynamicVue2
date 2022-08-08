<template>
    <section class="form-table-wraper full-width">
        <TableEditable
            class="table-wraper "
            :data="val"
            :table="item.options"
            :columns="item.fields"
            :api-promise="item.apiPromise"
            :pagination="item.pagination"
            :is-text-mode="isTextMode"
            size="small"
        />
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
    name: 'FormTableEditable',
    mixins: [FormMixin],

    data() {
        return {

        }
    },
    computed: {

        val: {
            get() {
                return this.value || []
            },
            set(tableList) {
                this.$emit('input', tableList)

                this.statusChangeFn.valueUpdateEvent({
                    [this.item.key]: tableList
                })
            }
        }

    },

    watch: {

    },
    mounted() {},
    methods: {
        resetFields() {
            localStorage.removeItem(this.localTableName)
            this.$refs.dynamiCurd && this.$refs.dynamiCurd.refresh()
        }

    }
}
</script>

<style scoped lang="css">
.hz-low-code .dynamic-form .form-text-mode .el-form-item__content .form-item-box.form-table-wraper {
 position: relative;
 top: 0px;
 transform: rotateY(0);

 padding-left: 0;
padding-bottom: 0;
}
</style>
