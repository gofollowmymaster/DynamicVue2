
function   resetHandle (vm,isReset=false) {
    if(!isReset)return
    const DynamicFormContent2 =
      vm.$refs.DynamicFormContent || vm.$parent.$refs.DynamicFormContent
    if (DynamicFormContent2) {
      DynamicFormContent2.resetFields()
    } else {
      console.warn(
        'submit 动作 在组件中没有定义对应的 DynamicFormContent 表单 ref,'
      )
    }
  }
  function  refreshHandle (vm, refresh) {
    if (typeof refresh === 'function') {
      refresh()
      return
    }
    if (refresh === true) {
      if (typeof vm.refresh === 'function') {
        vm.refresh()
      } else {
        debugger
        if(vm.origin){
          vm.$dynamicBus.$emit('dynamicRefresh:'+vm.origin)
        }else{
          vm.$dynamicBus.$emit('dynamicRefresh')
        }
      }
    }
  }
  function  emitEventHandle (vm, eventName, data) {
    typeof eventName === 'string' && vm.$emit(eventName, data) // formSubmited
  }
  function  showTipHandle (vm, showTip, data) {
    showTip === true &&
      vm.$message &&
      vm.$message({
        type: 'success',
        message: data.msg || data.message || '操作成功'
      })
  }

  function  closeHandle (vm,isClose=true) {
    if(!isClose)return

    if (typeof vm.close === 'function') {
      vm.close()
      return
    }
    if (typeof vm.closeModal === 'function') {
      vm.closeModal()
      return
    }
    if (vm.visible) {
      if (vm.visible instanceof Object) {
        vm.visible.value = false
        return
      }
      vm.visible = false
      return
    }
    closeHandle(vm.$parent,isClose)
  }
  function  backHandle (vm,backStep=-1) {
    vm.$router.go(backStep)
  }


export  default {
  reset:resetHandle,
  refresh:refreshHandle,
  emitEvent:emitEventHandle,
  closeModal:closeHandle,
  close:closeHandle,
  showTip:showTipHandle,
  back:backHandle
} 
