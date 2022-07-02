import Vue from 'vue'
import { treeToLinearArrayGenerator } from './utils'

const {
  localStorage: { GlobalMenuPermissionList }
} = {localStorage:[]}

Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    // debugger
    let hasPermission = false
    const permissionList = localStorage.getItem(GlobalMenuPermissionList)
      ? JSON.parse(localStorage.getItem(GlobalMenuPermissionList))
      : []
    const linear = treeToLinearArrayGenerator(permissionList)
    const route = vnode.context.$route
    if (!route) return
    const menus = linear.filter((unit) => unit.menuUrl === route.path)
    // console.log('权限按钮测试', linear, route, menus)
    if (menus.length) {
      const menuId = menus[0].id
      const btnNames = linear
        .filter((unit) => unit.parentId === menuId && unit.menuType === 2)
        .map((unit) => unit.menuName)
      console.log(`${route.name}(菜单)=>权限按钮：`, btnNames.join(','))
      if (btnNames.indexOf(binding.value) > -1) {
        hasPermission = true
      }
    } else {
      hasPermission = true
    }
    if (!hasPermission) {
      el.style.display = 'none'
    }
  }
})
