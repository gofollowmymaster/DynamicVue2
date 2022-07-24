<template>
    <!-- 普通展示 -->
    <div
        :style="colOptions.style || {}"
        :class="`form-unqiue-${colOptions.key}`"
        class="table-col-box text-ellipsis"
    >
        {{ content }}
    </div>
</template>

<script>
import TableColMixin from './mixin'

export default {
    name: 'ColTeml',
    mixins: [TableColMixin],
    data() {
        return {
        }
    },
    computed: {
        content() {
            const content = this.rowData[this.colOptions.key]
            if (typeof this.colOptions.template === 'function') {
                return this.colOptions.template(
                    this.rowData,
                    this.colOptions.key
                )
            }
            if (['FormSelect', 'FormRadio'].includes(this.colOptions.type)) {
                const optionMap = this.colOptions.options.reduce((prev, next) => {
                    prev[next.value] = next.label
                    return prev
                }, {})
                return optionMap[content]
            }
            return content
        }
    },
    mounted() {

    }
}
</script>

<style scoped lang="css"></style>
