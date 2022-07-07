<template>
  <!-- 普通展示 -->
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key}`"
    class="table-col-box text-ellipsis" >
    {{ content }}
  </div>
</template>

<script>
import TableColMixin from './mixin'

export default {
  name: 'ColTeml',
  mixins: [TableColMixin],
  data () {
    return {
    }
  },
  computed: {
    content () {
      const content = this.rowData[this.field]
      if (typeof this.colOptions.tableOption?.template === 'function') {
        return this.colOptions.tableOption?.template(
          this.rowData,
          this.field
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
  mounted () {

  }
}
</script>

<style scoped lang="less"></style>
