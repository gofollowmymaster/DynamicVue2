<template>
    <div class="px8 py4" v-html="content" />
</template>
<script>
import { parseTemplate, superType } from '../../utils/tool'
export default {
    name: 'DyTmpl',
    components: {},
    props: {
        tmpl: String,
        data: [String, Array, Object, Number]

    },
    data: function() {
        return {}
    },
    computed: {
        content() {
            const data = superType(this.data) === 'object' ? this.data : { data: this.data }
            const content = parseTemplate(this.tmpl, data)
            return content.replace(/<(script|img|video)/g, (...rest) => {
                return '&lt;' + rest[1]
            })
        }
    },
    watch: {

    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>

</style>
