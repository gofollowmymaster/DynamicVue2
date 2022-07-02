<template>
  <div>
    <div v-for="(unit, index) in data" :key="index">
      <div v-if="unit.path && unit.isMenu !== false">
        <el-submenu
          :index="unit.$sumPath"
          v-if="unit.children && unit.children.length"
          :sum-path="unit.$sumPath"
        >
          <template slot="title">
            <i :class="['iconfont', unit.icon]"></i>
            <span slot="title">{{ unit.name }}</span>
          </template>
          <basemenu :data="unit.children"></basemenu>
        </el-submenu>
        <router-link
          :to="unit.$sumPath || ''"
          v-else
          v-show="unit.name != '全区公园概览'"
        >
          <el-menu-item :index="unit.$sumPath" :sum-path="unit.$sumPath">
            <i :class="['iconfont', unit.icon]"></i>
            <span slot="title">{{ unit.name }}</span>
          </el-menu-item>
        </router-link>

        <i :class="['iconfont', unit.icon]"></i>
        <a
          v-if="unit.name == '全区公园概览'"
          class="cf"
          href="http://183.230.49.150:46009/parkManagement/manage/statistics"
          target="_blank"
        >
          <el-menu-item :index="unit.$sumPath" :sum-path="unit.$sumPath">
            <span slot="title">{{ unit.name }}</span>
          </el-menu-item>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basemenu",
  components: {},
  props: {
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.h {
  height: 40px;
  line-height: 40px;
  margin: 4px 0 0 0;
  background-color: var(--color-nav-menu-background);
  border-radius: 2px;
 
}
/deep/.el-submenu .el-menu-item {
  .h();
}
/deep/.el-submenu__title {
  .h();
}
 /deep/.el-menu-item.is-active{
   background: var(--color-nav-background) !important;
  }
</style>
