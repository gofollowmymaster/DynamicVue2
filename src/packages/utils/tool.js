import presetConfig from '../presetConfig'

export function parseExpression(tmpl, obj) {
    let expression = tmpl.replace(/#\{(.+?)\}/g, 'obj.$1')
    if (expression.indexOf('return') === -1) {
        expression = `return ${expression}`
    }
    const func = new Function('obj', expression)
    const res = func(obj)
    return res
}
export function parseTemplate(tmpl, obj) {
    let template = '`' + tmpl.replace(/#\{(.+?)\}/g, '${obj.$1}') + '`'
    if (template.indexOf('return') === -1) {
        template = `return ${template}`
    }
    const func = new Function('obj', template)
    const res = func(obj)
    return res
}
export function isEmpty(value, containEmptyString = false) {
    let emptyValues = ['', undefined, null]
    emptyValues = containEmptyString
        ? emptyValues.concat(['undefined', 'null'])
        : emptyValues
    return emptyValues.includes(value)
}

export function superType(data) {
    const type = Object.prototype.toString.call(data).toLowerCase()
    return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
        return rest[1]
    })
}
export function objType(data) {
    if ([undefined, null].includes(data)) {
        const type = Object.prototype.toString.call(data).toLowerCase()
        return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
            return rest[1]
        })
    }
    const type = data.constructor.toString().toLowerCase()
    if (type.startsWith('function')) {
        return type.replace(/^function\s(\w+?)/, (...rest) => {
            return rest[1]
        }).split('(')[0]
    }
}

export function hasValue(a) {
    if (a !== null && a !== undefined) {
        return true
    }
    return false
}

export function isObjEmpty(obj) {
    if (['[]', '{}', '""', 'null', 'undefined', undefined].includes(JSON.stringify(obj))) {
        return true
    }
    return false
}

// 过滤对象中的空值  ''  null
export function filterObjEmptyField(obj) {
    for (const key in obj) {
        if (isEmpty(obj[key])) {
            delete obj[key]
        }
    }
    return obj
}

export function compose(...funcs) {
    // 没有传入函数运行直接返回参数
    if (funcs.length === 0) {
        return arg => arg
    }
    // 只传入一个函数，就返回其本身
    if (funcs.length === 1) {
        return funcs[0]
    }

    // 核心代码其实就是一句reduce, reduce特性就是按顺序执行，并且将结果传递给下一次执行, 这里多说一句, reduce顺序执行多个相依赖的promise也很好用
    return funcs.reduce(
        (a, b) =>
            (...args) =>
                a(b(...args))
    )
}

export function JSONDeepCopy(data) {
    return JSON.parse(JSON.stringify(data))
}
 
export function deepCopy(origin, hashMap = new  WeakSet()) {
    const valueTypes = ['object', 'array'] // 后面可以支持下 map、set 等
    const objTypes = ['vnode', 'htmlelement', 'VNode']
    const objType1 = objType(origin)
    if (objTypes.includes(objType1)) {
        return origin // 若是特殊对象则结束
    }
    if (!valueTypes.includes(superType(origin))) {
        return origin // 若不是对象则结束
    }

    if (hashMap.has(origin)) {
        console.warn('deep copy circle obj！')
        return  origin
    }
    hashMap.add(origin)

    const target = Array.isArray(origin) ? [] : {} // 判别是数组还是对象
    for (const k in origin) {
    // 循环拷贝

        if (origin.hasOwnProperty(k)) {
            // 判断属性是否在对象自身上（非原型链上的父级属性）
 
            target[k] = deepCopy(origin[k], hashMap)
   
        }
    }
    return target
}

// 下载文件
export function downFile(data, name, suffix = '') {
    const blob = new Blob([data]) // 构造一个blob对象来处理数据
    // const fileName = 'monthAssess.xlsx' // 导出文件名
    // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
    // IE10以上支持blob但是依然不支持download
    if ('download' in document.createElement('a')) {
    // 支持a标签download的浏览器
        const link = document.createElement('a') // 创建a标签
        link.download = name + suffix // a标签添加属性
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click() // 执行下载
        URL.revokeObjectURL(link.href) // 释放url
        document.body.removeChild(link) // 释放标签
    } else {
    // 其他浏览器
        navigator.msSaveBlob(blob, name + suffix)
    }
}

function isObjectOrArray(obj) {
    return ['object', 'array'].includes(superType(obj))
}
export function objectFilter(obj, func, filterEmptyValue = true) {
    if (['object', 'array'].includes(superType(obj))) {
        for (const key in obj) {
            if (['object', 'array'].includes(superType(obj[key]))) {
                objectFilter(obj[key], func)
                continue
            }

            obj[key] = func(key, obj)

            if (filterEmptyValue && !hasValue(obj[key])) delete obj[key]
        }
    }
    return obj
}

export function deepMerge(obj1, obj2, isDeleteNull = false) {
    obj1 = deepCopy(obj1) || {}

    let key
    for (key in obj2) {
        if (!hasValue(obj2[key]) && isDeleteNull) {
            delete obj1[key]
            continue
        }
        // 都為對象
        if (obj1[key] && obj2[key] && ['object'].includes(superType(obj1[key]))) {
            if (superType(obj1[key]) === superType(obj2[key])) {
                obj1[key] = deepMerge(obj1[key], obj2[key], isDeleteNull)
                continue
            }
            console.warn('合并对象异常,类型不匹配：' + key)
            continue
        }
        // 都为数组
        if (Array.isArray(obj1[key])) {
            if (Array.isArray(obj2[key])) {
                // 数组成员都为非Object Array 时用 obj2[key] 覆盖obj1[key]
                if (obj1[key].some(item => isObjectOrArray(item))) {
                    obj1[key] = Array.from(new Set([...obj1[key], ...obj2[key]]))
                } else {
                    obj1[key] = obj2[key]
                }
                continue
            }
            console.warn('合并数组异常,类型不匹配：' + key)

            continue
        }
        obj1[key] = obj2[key]
    }
    return obj1
}
// 根据key合并  数组也按照索引直接合并
export function deepMergeByKey(obj1, obj2, clone = true) {
    if (!['object', 'array'].includes(superType(obj1))) return obj1
    if (clone) {
        obj1 = deepCopy(obj1)
    }
    let key
    for (key in obj2) {
    // 都為對象
        if (
            obj1[key] &&
      obj2[key] &&
      ['object', 'array'].includes(superType(obj1[key]))
        ) {
            if (superType(obj1[key]) === superType(obj2[key])) {
                obj1[key] = deepMergeByKey(obj1[key], obj2[key], clone)
                continue
            }
            console.warn('合并对象异常,类型不匹配：' + key)
            continue
        }

        if (!hasValue(obj2[key])) {
            delete obj1[key]
            continue
        }
        obj1[key] = obj2[key]
    }
    return obj1
}

export function loadPresetConfig(presetKey) {
    return presetConfig.getConfig(presetKey)
}
export function appendToPreset(presetKey, obj = {}, isDeleteNull = false) {
    const preset = presetConfig.getConfig(presetKey)

    if (!preset) {
        throw new Error('没有找到指定预设配置' + presetKey)
    }
    if (superType(preset) !== superType(obj)) {
        throw new Error('自定义配置与预设配置类型不同' + presetKey + '自定义：' + JSON.stringify(obj))
    }
    if (['array', 'object'].includes(superType(preset))) {
        return deepMerge(preset, obj, isDeleteNull)
    }
}

export function generatRandomNum(max) {
    return Math.round(Math.random() * max)
}
