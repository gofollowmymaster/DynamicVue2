<template>
    <component v-bind="properties" :is="container" :visible.sync="visible.value" custom-class="hz-low-code" @closed="afterClose">
        <component :is="layoutComp.name" v-bind="layoutComp.properties">
            <component :is="section.component" v-for="section in body" :key="section.name" :label="section.label"
                       :data="(section.name=='@object@'||!section.name)?data :data[section.name]"
                       v-bind="section.props" :props="section.props"
            >
                <component :is="subSection.component" v-for="(subSection,index) in section.children" :key="index" v-bind="subSection.props" />
            </component>
        </component>
    </component>
</template>
<script>

export default {
    name: 'DynamicPageDialog',
    components: { },
    props: {
        data: {},
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
            type: Array,
            default: function() {
                return []
            }
        },
        properties: {
            type: Object,
            default: function() {
                return {}
            }
        },
        layout: {
            type: [String, Object],
            default: 'LayoutGrid'
        },
        onclose: {
            type: Function,
            default: function() {}
        }
    },
 
    computed: {
        layoutComp() {
            if (typeof this.layout === 'string') {
                return { name: this.layout }
            }
            return this.layout
        }
    },
    mounted() {
    },
    methods: {
        afterClose() {
            debugger
            this.onclose()

            if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
                this.clearRouteQuery()
            }
        },
        closeModal() {
            this.visible.value = false
            if (this.$parent?.$options.name === 'DynamicPageWrapper' && ['DyPage', 'dy-page'].includes(this.container)) {
                this.clearRouteQuery()
            }
        },
        clearRouteQuery() {
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
/deep/ .el-drawer__header {
    border-bottom: solid 1px var(--color-border-color);
}
</style>
