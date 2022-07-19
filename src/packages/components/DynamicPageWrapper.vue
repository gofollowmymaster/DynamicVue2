<template>
  <main>
     <transition name="slide-fade-left">
    <div v-show="!actionKey" >
    <slot></slot>

    </div>
     </transition>
    <!-- 弹窗表单 -->
    <DynamicFormDialog v-bind="currentDialogForm"  key="dialogForm" > </DynamicFormDialog>
    <!-- 頁面表单 -->
    <DynamicFormDialog v-bind="currentPageForm"   key="pageForm"> </DynamicFormDialog>
    <!-- 页面内容 -->
    <DynamicPageDialog v-bind="currentDialogPage"   key="pageContent"> </DynamicPageDialog>
    <DynamicDetailPage   v-bind="$props"   :detailId='detailId'   :actionKey='actionKey'></DynamicDetailPage>

  </main>
</template>
<script>
export default {
  name: 'DynamicPageWrapper',
  props: {
    fields: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    actions: {
      type: Object,
      require: true
    },
    apiPromises: {
      type: Object,
      default () {
        return {}
      }
    },
    formSections: {
      type: Object,
      default () {
        return {}
      }
    },
    entityLabel: String
  },
  data () {
    return {
      currentDialogForm: {
        visible: { value: false }
      },
      currentDialogPage: {
        visible: { value: false }
      },
      currentPageForm: {
        visible: { value: false }
      },
      detailId: '',
      actionKey: 'detail'
    }
  },

  provide () {
    return {
      setGlobalDialogForm: this.setCurrentDialogForm,
      setGlobalDialogPage: this.setCurrentDialogPage,
      isGlobalDialogFormActive: this.isGlobalDialogFormActive
    }
  },
  created () {
    this.$watch(
      '$route',
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        this.getRouterIdInParams()
      }, {
        immediate: true
      }
    )
  },
  mounted () {},
  components: {},

  methods: {
    getRouterIdInParams () {
      debugger
      this.detailId = this.$route.params?.id || this.$route.query?.id
      this.actionKey = this.$route.params?.action || this.$route.query.action
    },
    setCurrentDialogForm (currentDialogForm) {
      if (['dy-page', 'DyPage'].includes(currentDialogForm.container)) {
        currentDialogForm.visible = { value: true }
        this.currentPageForm = currentDialogForm
      } else {
        currentDialogForm.visible = { value: true }
        this.currentDialogForm = currentDialogForm
      }
    },

    setCurrentDialogPage (currentDialogPage) {
      currentDialogPage.visible = { value: true }
      this.currentDialogPage = currentDialogPage
    },

    // 关闭弹窗  兜底
    close () {
      debugger
      if (this.currentDialogForm.visible.value) {
        this.currentDialogForm = { visible: { value: false } }
        this.clearRouteQuery(this.currentDialogForm)
        return
      }
      this.currentDialogPage = { visible: { value: false } }
      this.clearRouteQuery(this.currentDialogPage)
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

    isGlobalDialogFormActive () {
      return this.currentDialogForm.visible.value
    }
  }
}
</script>
<style lang="css" scoped>
 .slide-fade-left-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-left-leave-active {
  transition: all 0.4s ease;
}
 .slide-fade-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-left-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-20px);
  opacity: 0;
}

</style>
