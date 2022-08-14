<template>
    <main>
        <transition name="slide-fade-left">
            <div v-show="!actionKey">
                <slot />
            </div>
        </transition>
        <!-- 弹窗表单 -->
        <DynamicFormDialog v-bind="currentDialogForm" key="dialogForm" />
        <!-- 頁面表单 -->
        <DynamicFormDialog v-bind="currentPageForm" key="pageForm" />
        <!-- 页面内容 -->
        <DynamicPageDialog v-bind="currentDialogPage" key="pageContent" />
        <DynamicDetailPage v-bind="$props" :detail-id="detailId" :action-key="actionKey" />
    </main>
</template>
<script>
export default {
    name: 'DynamicPageWrapper',
    components: {},

    provide() {
        return {
            setGlobalDialogForm: this.setCurrentDialogForm,
            setGlobalDialogPage: this.setCurrentDialogPage,
            isGlobalDialogFormActive: this.isGlobalDialogFormActive,
            refreshComponentKey: '',
       
        }
    },
    props: {
        fields: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        actions: {
            type: Object,
            require: true
        },
        apiPromises: {
            type: Object,
            default() {
                return {}
            }
        },
        formSections: {
            type: Object,
            default() {
                return {}
            }
        },
        entityLabel: String
    },
    data() {
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
    created() {
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
    mounted() {},

    methods: {
        getRouterIdInParams() {
            debugger
            this.detailId = this.$route.params?.id || this.$route.query?.id
            this.actionKey = this.$route.params?.action || this.$route.query.action
        },
        setCurrentDialogForm(currentDialogForm) {
            debugger
            if (['dy-page', 'DyPage'].includes(currentDialogForm.container)) {
                currentDialogForm.visible = { value: true }
                this.currentPageForm = currentDialogForm
                this.actionKey = this.actionKey? this.actionKey: currentDialogForm.actionKey

            } else {
                currentDialogForm.visible = { value: true }
                this.currentDialogForm = currentDialogForm
            }
            //  this.actionKey = currentDialogForm.actionKey
        },

        setCurrentDialogPage(currentDialogPage) {
            debugger
            currentDialogPage.visible = { value: true }
            this.currentDialogPage = currentDialogPage
             if (['dy-page', 'DyPage'].includes(currentDialogPage.container)) {
                this.actionKey = this.actionKey? this.actionKey: currentDialogPage.actionKey
             }
        },

        // 关闭弹窗  兜底
        close() {
            debugger
            if (this.currentDialogForm.visible.value) {
                this.currentDialogForm = { visible: { value: false } }
                this.clearRouteQuery(this.currentDialogForm)
                return
            }
            this.currentDialogPage = { visible: { value: false } }
            this.clearRouteQuery(this.currentDialogPage)
        },
        clearRouteQuery() {
            const { id, action } = this.$route.query
            if (id || action) {
                const query = { ...this.$route.query }
                delete query.id
                delete query.action

                this.$router.replace(this.$route.path, query)
            }
        },

        isGlobalDialogFormActive() {
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
