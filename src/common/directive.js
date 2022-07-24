import Vue from 'vue'
 
Vue.directive('permission', {
    bind: function(el, binding, vnode) {
    
        // const buttonName = binding.value
        // if(!buttonName) return
        let hasPermission = false
        // // 获取当前页面路由
        // const route = vnode.context.$route
        // if (!route) return
        // const path = route.path
        // // 获取当前页面的按钮权限
        // const buttonHash = vnode.context.$store.state.permission.modelButtons || {}
        // // 解析当前模块所属权限
        // const modelPaths = Object.keys(buttonHash).filter(modelPath => { return path.startsWith(modelPath) })
        // if (!modelPaths || !modelPaths.length) return
        // // 获取按钮数据
        // const buttons = buttonHash[modelPaths[0]][path] || []
        // // 判断是否有权限
        // hasPermission = buttons.includes(buttonName)
        // console.log('ddddddddddd', path, buttons)
        // const buttonName = binding.value
        // hasPermission = buttons.includes(buttonName)
        // const permissionList = localStorage.getItem(GlobalMenuPermissionList)
        //   ? JSON.parse(localStorage.getItem(GlobalMenuPermissionList))
        //   : []
 
        if (!hasPermission) {
            // el.style.display = 'none'
        }
    }
})
