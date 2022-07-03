
import callbackHandles from  "./callback"
export default class requestApi {
  static handle (action,actionData,vm) {
    this.vm=vm
    const dataAdapter =
    typeof action.dataAdapter === 'function'
      ? action.dataAdapter
      : (res) => {
        return res
      }

  action
    .apiPromise(actionData)
    .then(dataAdapter)
    .then((res) => {
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
        typeof callbackHandles[callbackItem ] === 'function' &&
        callbackHandles[callbackItem ](this.vm,action.callback[callbackItem], res,)
      }
    }
  }
}


 
