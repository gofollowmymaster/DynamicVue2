import Vue from 'vue'
 
Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    let hasPermission = true
   
  
    if (!hasPermission) {
      el.style.display = 'none'
    }
  }
})
