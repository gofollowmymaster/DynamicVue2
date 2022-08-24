<template>
    <div class="layout-wrapper grid-wrap  " :class="[mode + '-curd',scene+'-curd']">
        <aside class="left-section ">
            <slot name="left" />
        </aside>
        <main class="main-section    ">
            <section class="top-section">
                <slot name="top" />
            </section>
            <div class="middle-gap " />
            <article class="bottom-section">
                <slot name="bottom" />
            </article>
        </main>
    </div>
</template>
<script>
export default {
    name: 'CurdLayout',
    props: {
        mode: { type: String, default: 'tb' },
        scene: { type: String, default: 'component' }
    },
    data: function() {
        return {}
    },
    computed: {},
    created() {},

    methods: {}
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
    padding: 0 0 0 0;
    .left-section {
        display: none;
    }
    .top-section {
        padding: 0 24px 12px;
    }
    .middle-gap {
        height: 1px;
        width: calc(100% - 48px);
        margin: 0 auto;
        background-color: var(--main-color);
    }
    .main-section {
        grid-column-end: 25;
        grid-column-start: 1;
        padding: 24px 0 12px;
        .bottom-section {
            padding: 24px 24px 0;
        }
    }
}
.layout-wrapper.ltb-curd {
    display: flex;
    position: relative;
    .left-section {
        //  flex: 1;
        // float: left;
        grid-column-end: 6;
        min-width: 240px;
        width: 320px;
        padding: 24px;
        // height: 100%;
        position: sticky;
        top: 12px;
        display: block;
        height: calc(100% - 20px) ;
    }
    .middle-gap {
        background-color:  var(--main-color);
         width: calc(100%);
    }
    .main-section {
        // float: left;
         grid-column-end: 18;

        // flex: 1;
        padding: 24px 24px 12px 0;
        overflow-x: hidden;
        .bottom-section {
            padding: 24px 0 0;
        }
    }
}
.layout-wrapper.component-curd {
    .top-section {
        padding: 0;
    }
    .middle-gap {
        display: none;
    }
    .main-section {
        padding: 0;
        .bottom-section {
            padding: 0;
        }
    }
}
</style>
