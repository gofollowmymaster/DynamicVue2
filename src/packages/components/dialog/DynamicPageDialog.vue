<template>
  <component   v-bind="properties" :is="container"  :visible.sync="visible.value"  custom-class="hz-low-code"     @closed="afterClose">
    <component  :is="layoutComp.name"    v-bind="layoutComp.properties" >
      <component v-for="section in body" :key="section.name" :is="section.component"  :label="section.label"
      :data="section.name=='@object@'?data  :data[section.name]"
      v-bind="section.props"  :props="section.props">
          <component v-for="(subSection,index) in section.children" :key="index" :is="subSection.component"   v-bind="subSection.props"   ></component>
      </component>
    </component>
  </component>
</template>
<script>

export default {
  name: 'DynamicPageDialog',
  props: {
    data: {},
    visible: {
      type: Object,
      default () {
        return { value: false }
      }
    },
    container: {
      type: String,
      default: 'el-dialog'
    },
    body: {
      type: Array,
      default: function () {
        return []
      }
    },
    properties: {
      type: Object,
      default: function () {
        return {}
      }
    },
    layout: {
      type: [String, Object],
      default: 'LayoutGrid'
    },
    onclose: {
      type: Function,
      default: function () {}
    },
    origin: String
  },
  //   inject: [
  //   'dyRefreshId',
  // ],
  computed: {
    layoutComp () {
      if (typeof this.layout === 'string') {
        return { name: this.layout }
      }
      return this.layout
    }
  },
  mounted () {
    console.log('----this.$attrs----', this.data)
  },
  components: { },
  methods: {
    afterClose () {
      debugger
      this.onclose()

      if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
        this.clearRouteQuery()
      }
    },
    closeModal () {
      this.visible.value = false
      if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
        this.clearRouteQuery()
      }
    },
    clearRouteQuery () {
      const { id, action } = this.$route.query
      if (id || action) {
        const query = { ...this.$route.query }
        delete query.id
        delete query.action
        this.$router.replace(this.$route.path, query)
      }
    }

  }
}
</script>
<style lang="css" scoped>
 /deep/ .el-drawer__header{
  border-bottom: solid 1px var(--color-border-color);
 }
</style>
