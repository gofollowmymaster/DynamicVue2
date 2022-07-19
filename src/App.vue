<template>
  <div id="app" class="">
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created () {
    this.initApp()
  },
  data () {
    return {
      key: ''
    }
  },
  watch: {

  },
  methods: {
    initApp () {
    }
  }
}
</script>

<style lang="css">
  /* @import 'assets/css/base.css'; */
  /* @import 'assets/css/main.css'; */

  #app{
    min-height: 100vh;
    height: 100%;
     --primary-color :#9a51ca;
  }
  ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 2px;
  }
  .routerContaner >div >.container{
      overflow: initial;
  }
</style>
<style lang="scss">
  @import 'assets/css/element-variables.scss';
</style>
