
function resetHandle({vm, callback: isReset = false}) {
    if (!isReset) return
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
function refreshHandle({vm, callback: refresh}) {
    if (!refresh) return 

    if (typeof refresh === 'function') {
        refresh()
        return
    }

    if (typeof vm.refresh === 'function') {
        vm.refresh()
        return 
    } 

    if (typeof refresh === 'string') {
        vm.$dynamicBus.$emit('dynamicRefresh:' + refresh)
    } else {
        vm.$dynamicBus.$emit('dynamicRefresh')
    }

}
function emitEventHandle({vm, callback: eventName, data}) {
    typeof eventName === 'string' && vm.$emit(eventName, data) // formSubmited
}
function showTipHandle(vm, showTip, data) {
    showTip === true &&
      vm.$message &&
      vm.$message({
          type: 'success',
          message: data.msg || data.message || '操作成功'
      })
}

function closeHandle({vm, callback: isClose = true}) {
    if (!isClose) return

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
    closeHandle({vm: vm.$parent, callback: isClose})
}
function backHandle({vm, callback: backStep = -1}) {
    vm.$router.go(backStep)
}

export default {
    reset: resetHandle,
    refresh: refreshHandle,
    emitEvent: emitEventHandle,
    closeModal: closeHandle,
    close: closeHandle,
    showTip: showTipHandle,
    back: backHandle
}
