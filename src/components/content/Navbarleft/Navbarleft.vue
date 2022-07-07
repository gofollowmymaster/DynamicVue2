<template>
  <div class="container" :style="{ width: elWidth+6 + 'px',height:'calc(100vh - 64px)' }">
    <div class="scroll-y scroll navbarleft">
      <!-- 菜单 -->
      <el-row class="tac">
        <el-col class="px8" :style="{ width: elWidth + 'px' }">
          <el-menu
            class="el-menu-vertical-demo"
            active-text-color="white"
            :default-active="currentPath"
            :collapse="isCollapse"
            :unique-opened="true"
          >
            <Basemenu :data="menuList"></Basemenu>
          </el-menu>
        </el-col>
      </el-row>
      <!-- 折叠bar -->
      <div class="">
        <span class="showBar" @click="changeCollapse">
          <img
            src="~assets/img/Navbarleft/menu-close.png"
            alt=""
            v-show="!isCollapse"
          />
          <img
            src="~assets/img/Navbarleft/menu-open.png"
            alt=""
            v-show="isCollapse"
          />
        </span>
      </div>
    </div>
    <!-- 默认菜单 -->
    <div class="navbarleft" v-if="isShowMenu('/')">
      <el-row class="tac">
        <el-col :style="{ width: elWidth + 'px' }">
          <el-menu
            :default-active="currentPath"
            class="el-menu-vertical-demo"
            active-text-color="white"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            :collapse="isCollapse"
          >
            <el-menu-item
              index="/backstage/dataoverview"
              v-permission="'数据概览'"
            >
              <i class="el-icon-data-line"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item
              index="/backstage/profileCenter"
              v-permission="'个人中心'"
            >
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-submenu index="基础信息管理" v-permission="'基础信息管理'">
              <template slot="title">
                <i class="el-icon-bangzhu"></i>
                <span>基础信息管理</span>
              </template>
              <el-menu-item
                index="/backstage/solationointmanagement"
                v-permission="'基础信息管理_隔离点管理'"
                >隔离点管理</el-menu-item
              >
              <el-menu-item
                index="/backstage/managementofmedicalinstitutions"
                v-permission="'基础信息管理_医疗机构管理'"
                >医疗机构管理</el-menu-item
              >
              <el-menu-item
                index="/backstage/collectionointanagement"
                v-permission="'基础信息管理_采集点管理'"
                >采集点管理</el-menu-item
              >
            </el-submenu>
            <el-submenu index="隔离管理" v-permission="'隔离管理'">
              <template slot="title">
                <i class="el-icon-discount"></i>
                <span>隔离管理</span>
              </template>
              <el-menu-item
                index="/backstage/isolationpersonnelmanagement"
                v-permission="'隔离管理_隔离人员管理'"
                >隔离人员管理</el-menu-item
              >
              <el-menu-item
                index="/backstage/Isolationrecord"
                v-permission="'隔离管理_隔离记录'"
                >隔离记录</el-menu-item
              >
            </el-submenu>
            <el-submenu index="系统管理" v-permission="'系统管理'">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item
                index="/backstage/usermanagement"
                v-permission="'系统管理_用户管理'"
                >用户管理</el-menu-item
              >
              <el-menu-item
                index="/backstage/rolemanagement"
                v-permission="'系统管理_角色管理'"
                >角色管理</el-menu-item
              >
              <el-menu-item
                index="/backstage/Parameterconfiguration"
                v-permission="'系统管理_参数设置'"
                >参数配置</el-menu-item
              >
              <el-menu-item
                index="/backstage/dictionaries"
                v-permission="'系统管理_字典表配置'"
                >字典表配置</el-menu-item
              >
              <el-menu-item
                index="/backstage/loginlog"
                v-permission="'系统管理_登录日志'"
                >登录日志</el-menu-item
              >
              <el-menu-item
                index="/backstage/operationrecord"
                v-permission="'系统管理_操作日志'"
                >操作日志</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-col>
        <span class="showBar" @click="changeCollapse">
          <img
            src="~assets/img/Navbarleft/menu-close.png"
            alt=""
            v-show="!isCollapse"
          />
          <img
            src="~assets/img/Navbarleft/menu-open.png"
            alt=""
            v-show="isCollapse"
          />
        </span>
      </el-row>
    </div>
    <!-- 绿化监控 -->
    <div
      class="navbarleft"
      v-else-if="isShowMenu('/GreeningMonitoringBackstage')"
    >
      <el-row class="tac">
        <el-col :style="{ width: elWidth + 'px' }">
          <el-menu
            :default-active="currentPath"
            class="el-menu-vertical-demo"
            active-text-color="white"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            :collapse="isCollapse"
          >
            <el-menu-item
              index="/GreeningMonitoringBackstage/GreeningMonitoringAmap"
            >
              <i class="el-icon-data-line"></i>
              <span slot="title">绿化监控一张图</span>
            </el-menu-item>
            <el-menu-item
              index="/GreeningMonitoringBackstage/KeyAreasOfConcern"
            >
              <i class="el-icon-user-solid"></i>
              <span slot="title">重点关注区域</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <span class="showBar" @click="changeCollapse">
          <img
            src="~assets/img/Navbarleft/menu-close.png"
            alt=""
            v-show="!isCollapse"
          />
          <img
            src="~assets/img/Navbarleft/menu-open.png"
            alt=""
            v-show="isCollapse"
          />
        </span>
      </el-row>
    </div>
    <!-- 智能养护 -->
    <div
      class="navbarleft"
      v-else-if="isShowMenu('/IntelligentMaintenanceBackstage')"
    >
      <el-row class="tac">
        <el-col :style="{ width: elWidth + 'px' }">
          <el-menu
            :default-active="currentPath"
            class="el-menu-vertical-demo"
            active-text-color="white"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            :collapse="isCollapse"
          >
            <el-menu-item
              index="/IntelligentMaintenanceBackstage/IntelligentMaintenanceAmap"
            >
              <i class="el-icon-data-line"></i>
              <span slot="title">智能养护一张图</span>
            </el-menu-item>
            <el-submenu index="智能循环灌溉">
              <template slot="title">
                <i class="el-icon-bangzhu"></i>
                <span>智能循环灌溉</span>
              </template>
              <el-menu-item
                index="/IntelligentMaintenanceBackstage/IrrigationEquipmentManagement"
                >灌溉设备管理</el-menu-item
              >
              <!-- <el-menu-item index="/backstage/managementofmedicalinstitutions" v-permission="'基础信息管理_医疗机构管理'">医疗机构管理</el-menu-item>
            <el-menu-item index="/backstage/collectionointanagement" v-permission="'基础信息管理_采集点管理'">采集点管理</el-menu-item> -->
            </el-submenu>
          </el-menu>
        </el-col>
        <span class="showBar" @click="changeCollapse">
          <img
            src="~assets/img/Navbarleft/menu-close.png"
            alt=""
            v-show="!isCollapse"
          />
          <img
            src="~assets/img/Navbarleft/menu-open.png"
            alt=""
            v-show="isCollapse"
          />
        </span>
      </el-row>
    </div>
    <!-- 权限体系管理 -->
    <div class="navbarleft" v-else-if="false">
      <el-row class="tac">
        <el-col :style="{ width: elWidth + 'px' }">
          <el-menu
            :default-active="currentPath"
            class="el-menu-vertical-demo"
            active-text-color="white"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            :collapse="isCollapse"
          >
            <el-submenu index="权限体系管理">
              <template slot="title">
                <i class="el-icon-bangzhu"></i>
                <span>权限体系管理</span>
              </template>
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/AdministrativeDivisionManagement"
                >行政区划管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/InternalOrganizationManagement"
                >内部组织管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/ExternalOrganizationManagement"
                >外部组织管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/MenuManagement"
                >菜单管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/PostManagement"
                >岗位管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/RoleManagement"
                >角色管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/userManagement"
                >用户管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/IndexManagement"
                >指标管理</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/DataDictionaryManagement"
                >数据字典管理</el-menu-item
              >
              <el-menu-item index="/AuthoritySystemManagementBackStage/LoginLog"
                >登录日志</el-menu-item
              >
              <el-menu-item
                index="/AuthoritySystemManagementBackStage/OperationLog"
                >操作日志</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-col>
        <span class="showBar" @click="changeCollapse">
          <img
            src="~assets/img/Navbarleft/menu-close.png"
            alt=""
            v-show="!isCollapse"
          />
          <img
            src="~assets/img/Navbarleft/menu-open.png"
            alt=""
            v-show="isCollapse"
          />
        </span>
      </el-row>
    </div>
  </div>
</template>
<script>
import Basemenu from '@/components/BaseBackend/BaseMenu.vue'

export default {
  components: { Basemenu },
  data () {
    return {
      isCollapse: false,
      elWidth: 250,
      menuList: []
    }
  },
  methods: {
    handleOpen () {},
    handleClose () {},
    changeCollapse () {
      this.$emit('realChangeCollapse', this.isCollapse)
      // 改变Navleft宽度
      if (!this.isCollapse) {
        this.elWidth = 65
        this.isCollapse = true
      } else {
        this.elWidth = 250
        this.isCollapse = false
      }
    },
    isShowMenu (sign) {
      return false && this.$route.matched[0].path === sign
    },
    fixRoutes (list) {
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
      return { origin: originList, linear: linearList }
    }
  },
  computed: {
    currentPath () {
      return this.$route.path
    }
  },
  mounted () {
    const { origin } = this.fixRoutes(this.$router.options.routes)
    console.log('###############', this.$route, origin)
    const rootMenuPath = this.$route.matched[0].path
    const focusTopMenu = origin.filter((unit) => unit.path === rootMenuPath)
    if (focusTopMenu) {
      this.menuList = focusTopMenu[0].children || []
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-y {
  overflow-x: auto;
  overflow-y: auto;
}
.scroll {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #efefef;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
  ::-webkit-scrollbar-corner {
    background: #ddd;
  }
}
// 调整el-menu样式
.navbarleft {
  /deep/.el-submenu {
    margin: 8px 0 !important;
    .el-menu-item:hover {
      background: rgba(243, 243, 243, 1);
    }
  }
  /deep/[class*='el-icon-'] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  /deep/.el-menu--collapse {
    .el-menu-item {
      [class*='el-icon-'] {
        margin: 0;
        vertical-align: middle;
        width: 24px;
        text-align: center;
      }
    }
    .el-submenu {
      [class*='el-icon-'] {
        margin: 0;
        vertical-align: middle;
        width: 24px;
        text-align: center;
      }
      .el-submenu__title {
        span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
        [class*='el-icon-'] {
          margin: 0;
          vertical-align: middle;
          width: 24px;
          text-align: center;
        }
      }
    }
  }
  /deep/.is-active {
    // background: var(--color-nav-background);
  }
}
.el-col {
  /* width: 240px; */
}
.navbarleft {
  top: 64px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  background: var(--color-nav-menu-background);
}
.svgLog {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-left: 5px;
}
.el-row {
  margin-top: 15px;
}
/deep/.el-submenu__title {
  background: white;
}
.showBar {
  position: absolute;
  bottom: 16px;
  left: 29px;
  cursor: pointer;
}
.tac {
  position: relative;
}
/deep/.el-submenu.is-active .el-submenu__title:hover {
  // color: red;
  background: rgba(243, 243, 243, 1) !important;
}
/deep/.el-menu{
  border-right: none !important;
}
.h{
  height: 40px;
  line-height: 40px;
  margin: 4px 0 0 0;
}
/deep/.el-menu .el-menu-item {
  .h();
}
.container{
  padding-right: 2px;
  background: #fff;
}
.scroll::-webkit-scrollbar {
    width: 4px;

}
.scroll::-webkit-scrollbar-track {
    background: #fff;
}
</style>
