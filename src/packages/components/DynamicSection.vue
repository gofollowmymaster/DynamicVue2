
<template>
    <components :is="layoutComp.name" v-bind="layoutComp.properties">
        <template v-for="section in bodyShow">
            <component :is="section.component" :key="section.key||(section.component+section.name)" :label="section.label"
                       :data="(section.name=='@object@'||!section.name)?data:data[section.name]"
                       v-bind="section.props" :props="section.props"
            >
                <slot />
            </component>
        </template>
    </components>
</template>
<script>

export default {
    name: 'DynamicSection',
    components: { },
    props: {
        data: {},

        body: {
            type: Array,
            default: function() {
                return []
            }
        },

        layout: {
            type: [String, Object],
            default: 'LayoutGrid'
        }

    },

    computed: {
        layoutComp() {
            if (typeof this.layout === 'string') {
                return { name: this.layout, properties: {} }
            }
            return this.layout
        },
        bodyShow() {
            return this.body.filter(item => !item.hidden)
        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>
 
