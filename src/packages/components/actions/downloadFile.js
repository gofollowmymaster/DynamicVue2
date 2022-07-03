
import { deepCopy, JSONDeepCopy, downFile } from '../../utils/tool'
import callbackHandles from  "./callback"
export default class downloadFile {
  static handle (action,actionData,vm) {
    this.vm=vm
      const dataAdapter =
        typeof action.dataAdapter === 'function'
          ? action.dataAdapter
          : (res) => {
            return res
          }

      action
        .apiPromise(actionData).then(dataAdapter)
        .then((response) => {
          debugger
          const fileName = action.fileName?? response.headers['content-disposition']?.replace(
              /.*=(.*\.\w+)/g,
              '$1'
            )
          downFile(response.data, decodeURIComponent(fileName))
        })
        .then((res = {}) => {
          this.actionCallback(action, res)
          return res
        })
 
  }
 

  static actionCallback (action, res) {
    if (action.callback instanceof Object) {
      for (const callbackItem in action.callback) {
          //自定义回调
          if(typeof action.callback[callbackItem]==='function')action.callback[callbackItem](this.vm,res)
          //
        typeof callbackHandles[callbackItem + 'Handle'] === 'function' &&
        callbackHandles[callbackItem + 'Handle'](this.vm,action.callback[callbackItem], res,)
      }
    }
  }
}


 
