<template>
    <section class="full-width row-center">
        <span :style="style" class="inline-block px4 py2 border-r4" v-bind="bindOptions">
          {{content}}
        </span>
    </section>
</template>

<script>
import TableColMixin from '@/packages/components/tableColItem/mixin'

export default {
  name: 'ColDictTag',
  mixins: [TableColMixin],
  data () {
    return {
      content: '',
      style: ''
    }
  },
  computed: {
  },
  mounted () {
    debugger
    this.content = this.rowData[this.colOptions.dictInfoKey]?.dictLabel
    this.style = this.rowData[this.colOptions.dictInfoKey]?.listClass
  }
}
</script>

<style scoped lang="less">

</style>
