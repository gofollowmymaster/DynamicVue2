import store from '@/store/index'

export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

function hasPermission(permission) {
    if (store.state.settings.openPermission) {
        return store.state.user.permissions.some(v => {
            return v === permission
        })
    } else {
        return true
    }
}

export function auth(value) {
    let auth
    if (typeof value === 'string') {
        auth = hasPermission(value)
    } else {
        auth = value.some(item => {
            return hasPermission(item)
        })
    }
    return auth
}

export function authAll(value) {
    const auth = value.every(item => {
        return hasPermission(item)
    })
    return auth
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
const superType = data => {
    const type = Object.prototype.toString.call(data).toLowerCase()
    return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
        return rest[1]
    })
}

// 下载文件
export function downFile(data, name, suffix = '') {
    const content = data
    const blob = new Blob([content]) // 构造一个blob对象来处理数据
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
  
export function deepCloneJson(json) {
    return JSON.parse(JSON.stringify(json))
}
export function deepCopy(origin) {
    const valueTypes = ['object', 'array'] // 后面可以支持下 map、set 等
    if (!valueTypes.includes(superType(origin))) {
        throw new Error('必须传入对象或数组') // 若不是对象则结束
    }
    const target = Array.isArray(origin) ? [] : {} // 判别是数组还是对象
    for (const k in origin) {
        // 循环拷贝
        if (origin.hasOwnProperty(k)) {
        // 判断属性是否在对象自身上（非原型链上的父级属性）
            if (valueTypes.includes(superType(origin[k]))) {
                // 复杂类型，递归
                target[k] = deepCopy(origin[k])
            } else {
                target[k] = origin[k]
            }
        }
    }
    return target
}
export function isEmpty(value, containEmptyString = false) {
    let emptyValues = ['', undefined, null]
    emptyValues = containEmptyString
        ? emptyValues.concat(['undefined', 'null'])
        : emptyValues
    return emptyValues.includes(value)
}