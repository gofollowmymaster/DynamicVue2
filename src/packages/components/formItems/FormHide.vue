<template>
    <!-- 普通输入框 -->
    <div  class="hide">
        <input type="hide" :value="value">
    </div>
</template>

<script>
    import FormMixin from './mixin';

    export default {
        name: 'FormHide',
        mixins: [ FormMixin ],
        computed: {
             
        }
    };
</script>

<style scoped lang="less">
    
</style>
