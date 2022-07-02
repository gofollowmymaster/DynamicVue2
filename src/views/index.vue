<template>
  <div class="BackStageFrameWork hz-low-code hz-main-wrapper">
    <NavbarTop/>
    <Navbarleft @realChangeCollapse="operatCollapseNav"/>
    <ShowRouterView ref="showRouterView">
      <router-view style="height:100%"></router-view>
    </ShowRouterView>
  </div>
</template>
<script>
import NavbarTop from 'components/content/NavbarTop/NavbarTop.vue'
import Navbarleft from 'components/content/Navbarleft/Navbarleft.vue'
import ShowRouterView from 'components/content/ShowRouterView/ShowRouterView.vue'
export default {
  components: {
    NavbarTop,
    Navbarleft,
    ShowRouterView
  },
  methods: {
    operatCollapseNav (isCollapse) {
      if (isCollapse === false) { // 展开
        this.$refs.showRouterView.changeRouterLeftClose()
      } else { // 关闭
        this.$refs.showRouterView.changeRouterLeftOpen()
      }
    }
  }
}
</script>
<style lang="css" scoped>
  .BackStageFrameWork{
    height: 100vh;
    background: rgba(149, 54, 179, 0.15);
  }
</style>
