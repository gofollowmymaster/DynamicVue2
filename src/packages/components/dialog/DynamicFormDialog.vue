<template>

    <component
      v-bind="properties"
      :is="container"
      :visible.sync="visible.value"
      custom-class="hz-low-code"
      :append-to-body="true"
      @closed="afterClose"
    >
      <section v-if="visible.value">
        <DynamicFormContent
         class=" "
          ref="DynamicFormContent"
          :data="body.data"
          :formItemList="body.formItemList"
          @formDataUpdated="formDataUpdateHandle"
          v-bind="body.formOption"
          :mode="isPageForm?'page':'dialog'"
        >
        </DynamicFormContent>
        <section
          class="action-btns flex   mt18"
          :style="{'margin-left':isPageForm?(body.formOption.formProperties['label-width']||'100px'):'0px'}"
          :class="[ isPageForm?'big-main-btn':'align-right ' ]">
          <el-button
            v-for="action in actionsOrdered"
            v-bind="action.properties"
            size='medium'
            v-permission="action.permission"
            :key="action.label"
            @click="actionHandle(action)"
          >
            {{ action.label }}
          </el-button>
        </section>
      </section>
    </component>

</template>
<script>
import actionMixin from '../actionMixin'

export default {
  name: 'DynamicFormDialog',
  mixins: [actionMixin],
  props: {
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
      type: Object,
      default: function () {
        return {}
      }
    },
    properties: {
      type: Object,
      default: function () {
        return {}
      }
    },
    origin: String
  },

  computed: {
    actionsOrdered () {
      const actions = Object.entries(this.body.actions)
        .map(([key, value], index) => {
          return { ...value, actionKey: key }
        }).filter(action => {
          return action?.actionType
        })
        .map((action, index) => {
          return this.$generateActionOption(action.actionType, action)
        })

      actions.sort((a, b) => a.sort - b.sort)
      return actions
    },
    isPageForm () {
      return ['DyPage', 'dy-page'].includes(this.container)
    }
  },
  mounted () {
    console.log(this)
  },
  components: {},
  methods: {
    reset () {
      this.$refs.DynamicFormContent.resetFields()
    },
    actionHandle (action) {
      this.actionHandles(action)
    },
    formDataUpdateHandle (formVm, param) {
      if (this.body.formDataUpdateHandle) {
        this.body.formDataUpdateHandle(formVm, param)
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
    },
    afterClose () {
      if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
        this.clearRouteQuery()
      }
    }
  }
}
</script>
<style lang="css" scoped>
 .dialog-height{
   max-height: 72vh;
 }
  /deep/ .el-drawer__header{
  border-bottom: solid 1px var(--color-border-color);
 }

</style>
