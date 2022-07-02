import { defineComponent, h, render } from 'vue'

// 生成一个唯一的key
const COMPONENT_CONTAINER_SYMBOL = Symbol('component_container')

/**
 * 创建组件实例对象
 * 返回的实例和调用 getCurrentComponent() 返回的一致
 * @param {*} Component
 */
function createComponent(Component, props, children) {
  // 创建vnode
  console.log('----props---',{...props})
  const vnode = h(Component, { ...props }, children)
  // 创建组件容器
  const container = document.createElement('div')
  // @ts-ignore 将组件容器挂载到vnode上，方便后续移除
  vnode[COMPONENT_CONTAINER_SYMBOL] = container
  // 将vnode渲染到组件容器内, 在 vue2 的版本中，父级元素是可以传 null 的，但是 vue3 不支持
  render(vnode, container)
  // 返回组件实例
  return vnode.component
}

/**
 * 销毁组件实例对象
 * @param {*} ComponnetInstance 通过createComponent方法得到的组件实例对象
 */
export function unmountComponent(ComponnetInstance) {
  // 移除组件节点，render函数的第一个传null，表示为移除动作，会执行unmount方法
  render(null, ComponnetInstance.vnode[COMPONENT_CONTAINER_SYMBOL])
}


// const componentConstructor = defineComponent(TestComp)

// 创建一个变量接收创建的组件实例
let instance;

// 创建节点
const showComponent = (component,options) => {
  // 创建组件实例对象
  instance = createComponent(component, options, null)
  // 添加到body
  document.body.appendChild(instance.vnode.el)
}

// options为组件的props
export const   useComponentByservice  = function (component,options) {
    debugger
  const close = options.onClose
  // 重新封装close，添加移除元素操作
  options.onClose = () => {
    close && close.call()
    unmountComponent(instance)
  }
  showComponent(component,options)
} 
 