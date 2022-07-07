<template>
  <div class="routerContaner" :class="{'amaprouterContaner':isAmap}" :style="{left:routerContainerLeft+'px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routerContainerLeft: 280,
      isAmap: false
    }
  },
  watch: {
    $route: {
      handler () {
        debugger
        this.module = this.$route.fullPath.split('/').pop()
        if (this.module == 'amap') {
          this.isAmap = true
          return
        }
        this.isAmap = false
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeRouterLeftClose () {
      this.routerContainerLeft = 89
    },
    changeRouterLeftOpen () {
      this.routerContainerLeft = 280
    }
  }
}
</script>
<style lang="css">
  .routerContaner{
    position: absolute;
    top: 88px;
    /* left: 250px; */
    bottom: 24px;
    right: 24px;
    background: var(--color-router-view-background);
    overflow-x: scroll;
  }
   .routerContaner::-webkit-scrollbar {
      /*滚动条整体样式*/
      /* height : 0px; */
    width: 8px !important;
    height: 8px !important;
  }
  .routerContaner::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d7d9dc;
    background: #bebebe;
  }
  .amaprouterContaner{
     top: 64px!important;
    bottom: 0px!important;
    right: 0px!important;
    left: 250px !important;
    overflow: hidden !important;

  }
</style>
