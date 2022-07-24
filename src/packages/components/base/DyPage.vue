<template>
    <transition name="slide-fade-left">
        <main v-if="visible" class="dy-page   bg-white  z-index10 ">
            <header class="flex align-center vertical-center height50 border-b pl16">
                <el-page-header :content="title" @back="goBack" />
            </header>
            <section class="p24  ">
                <slot />
            </section>
        </main>
    </transition>
</template>
<script>

export default {
    name: 'DyPage',
    components: {},
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: ''
        },
        navType: {
            type: String,
            default: 'dialog'
        }

    },
    data: function() {
        return {}
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        goBack() {
            if (this.navType === 'router') {
                this.$router.go(-1)
            }
            this.closeModal()
        },
        closeModal() {
            this.$emit('update:visible', false)
            this.$nextTick(() => {
                debugger
                this.$emit('closed')
            })
        }

    }
}
</script>
<style lang="less" scoped>
.bg-white {
    background: white;
}
.slide-fade-left-enter-active {
    transition: all 0.4s ease;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.slide-fade-left-leave-active {
    transition: all 0.4s ease;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
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
.border-b {
    border-bottom: solid 1px var(--color-border-color);
}
.dy-page {
    min-height: 100%;
    background-color: white;
}
</style>
