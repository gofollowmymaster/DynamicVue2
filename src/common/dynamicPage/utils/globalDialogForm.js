import Vue from 'vue'
import globalDynamicFormDialog from '../components/dialog/DynamicFormDialog'

let globalDynamicFormDialogConstructor = Vue.extend(globalDynamicFormDialog)


const globalDynamicFormDialogFunc = function(options = {},el=null) {
  
    const instance = new globalDynamicFormDialogConstructor({
      propsData: {
        ...options,
      }
    })
    el=el||document.body
    el.appendChild(instance.$mount().$el)


  // 确保动画效果
  Vue.nextTick(() => {
    instance.visible = {value:true};
  });

 
}


export default globalDynamicFormDialogFunc