<template>
    <div class="layout-wrapper relative ">
        <ul v-if="formItemList.length>3" class="left-section sticky top1 flex flex-direction justify-right mr12">
            <li v-for="formSection of formItemList" :key="formSection.label" class="py6 pr12 text-right cursor-point"
                :class="[curSetion==formSection.label?'active':'']"
            >
                <span @click="scrollTo(formSection)">{{ formSection.label }}</span>
            </li>
        </ul>
        <main class="main-section flex1  ">
            <slot name="main" />
        </main>
    </div>
</template>
<script>
export default {
    name: 'FormLayout',
    props: {
        // curSetion: { type: String, default: '' },
        scene: { type: String, default: 'component' },
        formItemList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data: function() {
        return {
            curSetion: ''
        }
    },
    computed: {},
    created() {},

    methods: {
        scrollTo(section) {
            this.$emit('scroll', section)
            this.curSetion = section.label
        }
    }
}
</script>

<style lang="scss" scoped>

.layout-wrapper {
    display: flex;
    .left-section {
        min-width: 120px;
        padding: 24px 0 24px 0;
        max-height: calc(100vh - 120px);
        border-right: solid 1px var(--grey);
    }
    .main-section {
        margin-right: 1px ;
        margin-bottom: 1px ;

    }
    .active {
        color: var(--main-color);
        border-right: solid 2px var(--main-color);
    }
}

</style>
