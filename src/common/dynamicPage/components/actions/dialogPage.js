import { deepCopy, JSONDeepCopy, downFile } from '../../utils/tool'
import { DY_DIALOG, DY_DRAWER, DY_PAGE_WRAPER } from '../../const'
export default class dialogPage {
  static handle (action,actionData,vm) {
    this.vm=vm
    const dialog = action.dialog
    if (dialog.container == DY_DRAWER) {
      dialog.properties = {
        size: dialog.properties.width,
        direction: 'rtl',
        ...dialog.properties
      }
    }
    this.dialogPageHandle(action, actionData)
  }

  static dialogPageHandle (action, actionData = null, extra = {}) {
    const dataAdapter =
      typeof action.dataAdapter === 'function'
        ? action.dataAdapter
        : (res) => {
          return res || {}
        }
    if (!action.apiPromise) {
      const data = dataAdapter(actionData)
      this.setCurrentDialogContent(action, JSONDeepCopy(data), extra)
      return
    }

    action
      .apiPromise(actionData) // todo  自定义主键
      .then(dataAdapter)
      .then((data) => {
        this.setCurrentDialogContent(action, data, extra)
      })
  }

  static setCurrentDialogContent (action, data = null, extra = {}) {
    const currentDialogContent = {
      container: DY_DIALOG,
      ...deepCopy(action.dialog),
      ...extra
    }
    currentDialogContent.data = data
    if (typeof this.vm.setGlobalDialogPage === 'function') {
      this.vm.setGlobalDialogPage(currentDialogContent)
      return
    }

    this.vm.$globalDialogPage(currentDialogContent, this.vm.actionBarWraper)
  }
}
