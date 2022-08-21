import presetConfig from '../presetConfig'

export function generateDefaultValue(fields) {
    if (!Array.isArray(fields)) {
        throw new Error('fields 应该为数组类型')
    }
    let data = {}
    fields.forEach(field => {
        if (field.children?.length) {
            data = { ...data, ...generateDefaultValue(field.children) }
        } else if (field.key) {
            data[field.key] = field.defaultValue
        }
    })
    return data
}

function setDialogPageAction(options) {
    const baseOption = setActionBaseOption(options)

    options.container = options.container || presetConfig.getConfig('defaultContainerType') || 'el-dialog'
    const containerType = options.container == 'el-drawer' ? 'drawerProperties' : (options.container == 'el-dialog' ? 'dialogProperties' : 'pageProperties')
    const containerProperties = presetConfig.getConfig(containerType)
  
    // action = setDialogPageAction(options)
    let actionType = 'dialogPage', routerAction = 'push', router
    if (['DyPage', 'dy-page'].includes(options.container)) {
        actionType = 'routerDialogPage'
        routerAction = options.routerAction || 'push'
        router =  options.router
    }
  
    const actionOption = {
        ...baseOption,
        actionType,
        routerAction,
        router,
        dialog: {
            key: options.key,
            properties: {
                ...containerProperties,
                title: options.title,
                ...(options.containerProperties || {})
            },
            container: options.container || 'dy-page',
            // layout: options.layout||'LayoutGrid',
            //
            layout: {
                name: options.layout || 'LayoutGrid',
                properties: {
                    type: 'card',
                    ...(options.layoutProperties || {})
                }
            },
            body: options.body
        }
    }
    return actionOption
}

function setSubmitAction(options) {
    options = setDetaultOptions(options)
    const baseOption = setActionBaseOption(options)

    const actionOption = {
        ...baseOption,
        label: options.label || '提交',
        component: options.component || 'el-button',
        properties: {
            type: 'primary',
            size: presetConfig.getConfig('btnSize'),
            key: '',
            ...options.componentProperties
        },
        actionType: 'submit',
        isLoadData: false,
        apiPromise: options.apiPromise,
        callback: {
            closeModal: true,
            showTip: true,
            refresh: true,
            reset: true,
            ...(options.callback || {})
        }
    }
    return actionOption
}
function setCloseAction(options) {
    options = setDetaultOptions(options)
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,
        actionType: 'close',
        label: options.label || '关闭',
        isLoadData: options.isLoadData ?? false
    }
    return actionOption
}
function setResetAction(options) {
    options = setDetaultOptions(options)
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,
        actionType: 'reset',
        label: options.label || '重置'
    }
    return actionOption
}
function setLinkAction(options) {
    options = setDetaultOptions(options)
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,
        actionType: 'link',
        label: options.label || '跳转',
        link: options.link,
        window: options.window || '_blank'
    }
    return actionOption
}

function setActionBaseOption(options) {
    return {
        hasBuild: true,
        component: options.component || 'el-button',
        actionKey: options.actionKey || 'undefined',
        properties: {
            type: 'default',
            size: presetConfig.getConfig('btnSize'),
            key: options.key || options.label || options.permission,
            ...options.componentProperties
        },
        mainKey: options.mainKey || presetConfig.getConfig('mainKey'),
        label: options.label || '操作',
        sort: options.sort || 100,
        permission: options.permission,
        isShow: options.isShow || '',
        dataAdapter: options.dataAdapter || (data => data),
        isLoadData: options.isLoadData ?? true,
        actionDataKey: options.actionDataKey || undefined,
        actionPop: options.actionPopComponent
            ? {
                component: options.actionPopComponent || presetConfig.getConfig('popTipOptions').actionPopComponent,
                properties: {
                    ...presetConfig.getConfig('popTipOptions').actionPopProperties,
                    ...(options.actionPopProperties || {})
                }
            }
            : null,
        msgBox: options.msgBox
            ? {
                ...presetConfig.getConfig('msgBoxProperties'),
                ...options.msgBox
            }
            : null,
        actionHook: options.actionHook || ''
    }
}

function setDialogFormAction(options) {
    const baseOption = setActionBaseOption(options)

    options.container = options.container || presetConfig.getConfig('defaultContainerType') || 'el-dialog'
 
    const containerType = options.container == 'el-drawer' ? 'drawerProperties' : (options.container == 'el-dialog' ? 'dialogProperties' : 'pageProperties')
    const containerProperties = presetConfig.getConfig(containerType)

    let actionType = 'dialogForm', routerAction = 'push', router  
    if (['DyPage', 'dy-page'].includes(options.container)) {
        actionType = 'routerDialogForm'
        routerAction = options.routerAction || 'push'
        router = options.router
    }

    const actionOption = {
        ...baseOption,
        router,
        isLoadData: options.isLoadData ?? true,
        actionType,
        routerAction,
        apiPromise: options.apiPromise || '',
        dialog: {
            key: options.key,
            container: options.container,
            properties: {
                ...containerProperties,
                title: options.title || '',
                ...(options.containerProperties || {})
            },
            body: {
                formOption: generateFormOptions(options),
                formItemList: options.formItemList,
                // data: options.data || {},
                formDataUpdateHandle: options.formDataUpdateHandle || ((formVm, param) => null),
                actions: {
                    save: [null].includes(options.saveAction)
                        ? null
                        : setSubmitAction({
                            ...options.saveAction,
                            callback: {
                                closeModal: true
                            }
                        }),
                    cancel: [null].includes(options.cancelAction)
                        ? null
                        : setCloseAction(options.cancelAction),
                    reset: [null, undefined, ''].includes(options.resetAction)
                        ? null
                        : setResetAction(options.resetAction),
                    ...options.actions
                }
            }
        }
    }

    return actionOption
}

function setRequestApiAction(options) {
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,

        actionType: 'requestApi',
        apiPromise: typeof options.apiPromise == 'function' ? options.apiPromise : (() => Promise.resolve()),
        callback: {
            showTip: true,
            refresh: true,
            ...(options.callback || {})
        }
    }
    return actionOption
}

function setDownloadAction(options) {
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,
        actionType: 'download',
        label: options.label || '下载',
        apiPromise: typeof options.apiPromise == 'function' ? options.apiPromise : (() => Promise.resolve()),
        callback: {
            showTip: true,
            ...(options.callback || {})
        }
    }
    return actionOption
}

function setRouterAction(options) {
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,
        actionType: 'router',
        label: options.label || '跳转',
        router: options.router || '',
        routerAction: options.routerAction || 'push'

    }
    return actionOption
}

function setRouterBackAction(options) {
    const baseOption = setActionBaseOption(options)
    const actionOption = {
        ...baseOption,
        actionType: 'back',
        isLoadData: false,
        label: options.label || '返回',
        backStep: options.backStep
    }
    return actionOption
}

function setCustomAction(options) {
    const baseOption = setActionBaseOption(options)

    const actionOption = {
        ...baseOption,
        label: options.label || '自定义操作',
        actionType: 'customerAction',
        actionHandle: options.actionHandle
    }
    return actionOption
}
function setDetaultOptions(options) {
    if (!(options instanceof Object)) options = {}
    options.key = options.key || Math.floor(Math.random() * 10000)
    return options
}
export function generateActionOption(type, options = {}) {
    options = setDetaultOptions(options)
    
    let action
    
    switch (type) {
        case 'submit':
        case 'submitAction':
        case 'submitActionOption':
            return setSubmitAction(options)
        case 'dialogPage':
        case 'dialogPageAction':
        case 'dialogPageActionOption':
            return setDialogPageAction(options)
        case 'routerDialogPageActionOption':
        case 'routerDialogPage':
        case 'routerDialogPageAction':

            options.container = 'dy-page'
            action = setDialogPageAction(options)
            // action.actionType = 'routerDialogPage'
            // action.routerAction = options.routerAction || 'push'

            return action
        case 'dialogForm':
        case 'dialogFormAction':
        case 'dialogFormActionOption':
            return setDialogFormAction(options)
        case 'routerDialogFormActionOption':
        case 'routerDialogForm':
        case 'routerDialogFormAction':

            options.container = 'dy-page'
            action = setDialogFormAction(options)
            action.actionType = 'routerDialogForm'
            action.routerAction = options.routerAction || 'push'
            action.router =  options.router
            // action.dialog.body.formOption.formProperties['label-width'] = '150px'
            return action
        case 'requestApiActionOption':
        case 'requestApi':
        case 'requestApiAction':
            return setRequestApiAction(options)
        case 'downloadActionOption':
        case 'downloadAction':
            return setDownloadAction(options)
        case 'routerActionOption':
        case 'router':
        case 'routerAction':

            return setRouterAction(options)
        case 'backActionOption':
        case 'back':
        case 'backAction':
            return setRouterBackAction(options)
        case 'closeActionOption':
        case 'closeAction':
        case 'close':
            return setCloseAction(options)
        case 'link':
        case 'linkActionOption':
        case 'linkAction':
            return setLinkAction(options)
        default:
            return setCustomAction(options)
    }
}

export function loadActionTipConfig() {
    const actionTip = presetConfig.getConfig('actionTip')
    return actionTip === 'pop'
        ?   presetConfig.getConfig('popTipOptions')
        : {
            msgBox: {
                ...presetConfig.getConfig('msgBoxTipOptions')
            }
        }
}
export function generateFormOptions(options) {
    debugger
 
    let { 'label-width': labelWidth, pageLabelWidth, 'label-position': labelPosition, formProperties, showFoldBtn, borderForm, colNum, testTool} = presetConfig.getConfig('formOption')
    labelWidth = ['dy-page', 'DyPage'].includes(options.container) ? pageLabelWidth : labelWidth
    return  {
        formProperties: {
            ...formProperties,
            'label-width': options['label-width'] || labelWidth,
            'label-position': options['label-position'] || labelPosition,
            ...(options.formProperties || {})

        },
        showFoldBtn: options.showFoldBtn ?? showFoldBtn,
        borderForm: options.borderForm ?? borderForm,
        textMode: options.textMode ?? false,
        colNum: options.colNum ??  colNum,
        testTool: options.testTool ?? testTool
    }
}
 
