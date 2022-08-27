<template>
    <component
        v-bind="properties"
        :is="container"
        :visible.sync="visible.value"
        custom-class="hz-low-code"

        @closed="afterClose"
    >
        <section v-if="visible.value">
            <DynamicFormContent
                ref="DynamicFormContent"
                class=" "
                :data="body.data"
                :form-item-list="body.formItemList"
                v-bind="body.formOption"
                :mode="isPageForm?'page':'dialog'"
                @formDataUpdated="formDataUpdateHandle"
            />
            <section
                class="action-btns flex   mt18"
                :style="{'margin-left':isPageForm?(body.formOption.formProperties['label-width']||'100px'):'0px'}"
                :class="[ isPageForm?'big-main-btn':'align-right ' ]"
            >
                <el-button
                    v-for="action in actionsOrdered"
                    v-bind="action.properties"
                    :key="action.label"
                    v-permission="action.permission"
                    size="medium"
                    @click="doActionHandle(action)"
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
    components: {},
    mixins: [actionMixin],
    props: {
        visible: {
            type: Object,
            default() {
                return { value: false }
            }
        },
        container: {
            type: String,
            default: 'el-dialog'
        },
        body: {
            type: Object,
            default: function() {
                return {}
            }
        },
        properties: {
            type: Object,
            default: function() {
                return {}
            }
        }
    // origin: String
    },

    computed: {
        actionsOrdered() {
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
        isPageForm() {
            return ['DyPage', 'dy-page'].includes(this.container)
        }
    },
    mounted() {
    },
    methods: {
        doActionHandle(action, actionData) {
            
            // if (typeof action.actionHook === 'function') {
            //     action.actionHook(action, actionData)
            // }
            // if (action.isLoadData === false) {
            //     actionData = {}
            // }
            this.actionHandle(action, actionData)
        }, 
        reset() {
            this.$refs.DynamicFormContent.resetFields()
        },
     
        formDataUpdateHandle(formVm, param) {
            if (this.body.formDataUpdateHandle) {
                this.body.formDataUpdateHandle(formVm, param)
            }
        },
        closeModal() {
            if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
                this.clearRouteQuery()
            }
            this.visible.value = false

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
        afterClose() {
            if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
                this.clearRouteQuery()
            }
        }
    }
}
</script>
<style lang="css" scoped>
.dialog-height {
    max-height: 72vh;
}
/deep/ .el-drawer__header {
    border-bottom: solid 1px var(--color-border-color);
}

</style>
