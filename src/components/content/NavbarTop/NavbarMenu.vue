<template>
  <div class="nav-horizontal-menu">
    <el-menu
      :default-active="getCurrentRoute"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
    <el-menu-item
        v-for="(item, index) in menuListSplit.showing"
        :key="index"
        :index="item.meta && item.meta.out_skip ? 1 : item.$sumPath"
        class="inline-block"
      >
        <a
          v-if="item.meta && item.meta.link"
          :href="item.meta.link"
          :target="item.target || '_blank'"
        >
          {{ item.name }}
        </a>
        <a
          v-else-if="item.meta && item.meta.out_skip"
          :href="'/#' + item.path"
          target="_blank"
          :sum-path="item.$sumPath"
        >
          {{ item.name }}
        </a>
          <a
            class="cf"
            href="http://183.230.49.150:46009/capitals/approval/download"
            target="_blank"
            v-else-if="item.name=='园林审批'" >园林审批</a>
        <router-link :to="item.$sumPath" :sum-path="item.$sumPath" v-else>
          {{ item.name }}
        </router-link>
      </el-menu-item>
       <el-submenu
        index="2"
        v-if="menuListSplit.hidden.length"
        class="el-sub-selected"
      >
        <template slot="title">更多功能</template>
        <el-menu-item
          v-for="(unit, index) in menuListSplit.hidden"
          :key="index"
          :index="unit.$sumPath"
          :sum-path="unit.$sumPath"
          >{{ unit.name }}</el-menu-item
        >
      </el-submenu>

    </el-menu>

  </div>
</template>
<script>
import { treeToLinearArrayGenerator } from '@/common/utils'
export default {
  data () {
    return { menuList: [] }
  },
  computed: {
    menuListSplit () {
      const splitIndex = 6
      const result = {
        showing: this.menuList.slice(0, splitIndex),
        hidden: []
      }
      if (this.menuList.length > splitIndex) {
        result.hidden = this.menuList.slice(6)
      }
      return result
    },
    getCurrentRoute () {
      return this.$route.matched[0].path
    }
  },
  methods: {
    fixRoutes (list) {
      const permissionList = localStorage.getItem('GlobalMenuPermissionList')
        ? JSON.parse(localStorage.getItem('GlobalMenuPermissionList'))
        : []
      const permissionLinear = treeToLinearArrayGenerator(
        permissionList
      ).filter((unit) => unit.menuType === 0 || unit.menuType === 1)
      console.log('permissionLinear====', permissionLinear)
      const originList = list
      const linearList = []
      const initialLevel = 1 // 初始层级
      const initialPath = ''
      const run = function * (arr, level, parentPath) {
        for (let i = 0; i < arr.length; i++) {
          const itemOrigin = arr[i]
          // const itemOrigin = { ...arr[i] }
          // 添加层级
          itemOrigin.$level = level
          // 路由累加path
          if (itemOrigin.path) {
            if (itemOrigin.path.startsWith('/')) {
              itemOrigin.$sumPath = parentPath + itemOrigin.path
            } else {
              itemOrigin.$sumPath = parentPath + `/${itemOrigin.path}`
            }
          }
          if (/\/:(\w+?)\?$/.test(itemOrigin.$sumPath)) {
            itemOrigin.$sumPath = itemOrigin.$sumPath.replace(
              /\/:(\w+?)\?/g,
              ''
            )
          }
          // if(/\/:(\w+?)$/.test(itemOrigin.$sumPath)){
          //     itemOrigin.$sumPath =itemOrigin.$sumPath.replace(/\/:(\w+?)\?$/,'')
          // }

          yield itemOrigin
          if (itemOrigin.children && itemOrigin.children.length) {
            yield * run(itemOrigin.children, level + 1, itemOrigin.$sumPath)
          }
        }
      }
      const gen = run(originList, initialLevel, initialPath)
      for (const item of gen) {
        linearList.push(item)
      }
      console.log('-----linearList----', linearList)
      return { origin: originList, linear: linearList }
    },
    handleClickMenu (row) {
      console.log(row)
      if (row.meta && row.meta.link) {
        window.open(row.meta.link, row.meta.target || '_blank')
      } else {
        this.$router.push(row.path)
      }
    },
    openPage (link, event) {
      window.open(link, '_blank')
    }
  },
  mounted () {
    this.$nextTick(() => {
      const { origin, linear } = this.fixRoutes(this.$router.options.routes)
      this.menuList = origin.filter((unit) => unit.isMenu !== false)
    })
  }
}
</script>

<style lang="less" scoped>
.nav-horizontal-menu {
  float: left;
  width: calc(100% - 500px);
}

.el-menu--horizontal > .el-menu-item {
  // height: 64px;
  // line-height: 64px;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  // height: 64px !important;
  // line-height: 64px !important;
  color: white;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  .el-submenu__icon-arrow {
    color: white;
  }
}
.el-menu {
  background: none;
}
.el-menu--horizontal > .el-menu-item {
  color: white;
}
/deep/.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(66, 195, 175, 0.301960784313725) !important;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(66, 195, 175, 0.301960784313725) !important;
}
/deep/.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: white;
}
.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: white;
}
/deep/.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: white;
  background: rgba(28, 147, 153, 1);
}
/deep/.el-menccu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  color: #333333;
  margin-top: 0px !important;
}
.is-active {
  background: rgba(66, 195, 175, 0.301960784313725);
}
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  background: var(--color-nav-background);
  color: white;
}
.el-menu.el-menu--horizontal {
  border: none;
}
  .nav-horizontal-menu .el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 12px;
  margin-left: 8px;
  margin-right: 8px;
  &:hover {
    background: #8541b1;
  }

}
/deep/ .nav-horizontal-menu  {
     .a-link{
    color: white;

  }
 }

.nav-horizontal-menu {
  .is-active {
    // background: rgba(4, 123, 127, 1);
    background: transparent;

  }
}
.el-menu--horizontal > .el-menu-item.is-active {
  // border: none;
}
.frameworkcontainer
  .nav-horizontal-menu
  .el-menu--horizontal
  .el-menu-item:hover {
  background: #8541b1 !important;
}
.el-menu--horizontal > .el-submenu {
  margin-top: 12px;
  border-radius: 20px;
}
.el-menu.el-menu--popup.el-menu--popup-bottom-start li {
  &:hover {
    background: rgba(243, 243, 243, 1);
    color: rgba(18, 158, 158, 1);
  }
  margin: 8px;
}
/deep/.el-submenu {
  margin: 8px;
}
</style>
