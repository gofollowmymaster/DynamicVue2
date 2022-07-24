<template>
    <div class="brandBar">
        <div class="brand-img">
            <slot name="logo" />
        </div>
        <div class="brand-title">
            <slot name="title" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'DyBrandBar'
}
</script>
<style lang="css" scoped>
    .brandBar {
        padding-left: 10px;
        height: 50px;
        border-bottom: 1px solid var(--color-border-color, rgb(214, 213, 213));
    }
    .brandBar > div {
        display: inline-block;
        line-height: 50px;
        margin-right: 10px;
    }
    .brand-img img {
        vertical-align: middle;
        cursor: pointer;
    }
</style>
