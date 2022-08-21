<template>
    <div class=" hz-low-code flex flex-direction full-width">
        <DynamicPageWrapper class="flex1   " :actions="actionList" :fields="fields" :entity-label="entityLabel"
                            :api-promises="apiPromises" :form-sections="formSections"
        >
            <dyBrandBar>
                <span slot="title">{{ entityLabel }}</span>
            </dyBrandBar>
            <DynamicCurd :options-props="pageOptionsprops" :fields="fields" :entity-label="entityLabel"
                         :api-promises="apiPromises" :mode="mode" :form-sections="formSections" scene="page"
            />
        </DynamicPageWrapper>
    </div>
</template>
<script>

export default {
    name: 'DynamicCurdPage',
    props: {
        pageOptionsprops: {
            type: Object,
            default: function() {
                return {}
            }
        },
        fields: {
            type: Array,
            required: true
        },
        formSections: {
            type: Object,
            default: function() {
                return {}
            }
        },
        apiPromises: {
            type: Object,
            default() {
                return {}
            }
        },
        entityLabel: String,
        mode: { type: String }

    },
    data: function() {
        return {

        }
    },
    computed: {
        actionList() {
            debugger
            const { topToolBar: customTopActions = {}, listOption = {} } = this.pageOptionsprops
            const { lineActions: customLineActions = {} } = listOption
            console.log('----actionList---', { ...customTopActions, ...customLineActions })

            return { ...customTopActions, ...customLineActions }
        }
    }

}
</script>

