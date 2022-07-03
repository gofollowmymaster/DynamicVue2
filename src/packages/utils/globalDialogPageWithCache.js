import Vue from 'vue'
import globalDynamicPageDialog from '../components/dialog/DynamicPageDialog'


let globalDynamicPageDialogConstructor = Vue.extend(globalDynamicPageDialog)
let instanceCached

// 生成一个唯一的key
const COMPONENT_CONTAINER_SYMBOL = Symbol('component_container')


/**
 * 创建组件实例对象
 * 返回的实例和调用 getCurrentComponent() 返回的一致
 * @param {*} Component
 */
 function createComponent(Component, props, el=null) {
  // 创建vnode
  const vnode =  new Component({
    propsData: {
      ...props,
    }
  })
  el=el||document.body
  el.appendChild(vnode.$mount().$el)
  // 返回组件实例
  return vnode
}


/**
 * 销毁组件实例对象
 * @param {*} ComponnetInstance 通过createComponent方法得到的组件实例对象
 */
 export function unmountComponent(ComponnetInstance) {
  // 移除组件节点，render函数的第一个传null，表示为移除动作，会执行unmount方法
   ComponnetInstance.$destroy()
}
 
 
const globalDynamicPageDialogFunc = function(options = {},el=null) {
  debugger
  console.table('----options-----',options)
  const close = options.onClose
  // 重新封装close，添加移除元素操作
  const onclose = () => {
    debugger
    close && close.call()
    if(el!=document.body){
      unmountComponent(instanceCached)
      instanceCached=null
    }

  }
 
  if(!instanceCached){

    instanceCached=createComponent(globalDynamicPageDialogConstructor,options,el)
    el!=document.body&&(instanceCached['onclose']=onclose)
    
  }else{
     for(let prop in options){
      instanceCached[prop]=options[prop]
     }
  }

  // 确保动画效果
  Vue.nextTick(() => {
    instanceCached.visible = {value:true};
  });
}

 

export default globalDynamicPageDialogFunc