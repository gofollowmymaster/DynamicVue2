import moment from 'moment'

export function arrayToObject (arr, key) {
  return arr.reduce((prev, next) => {
    prev[next.id] = next
    return prev
  }, {})
}

// Date的format方法
function dateFormat (date, format) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

/*  转换long值为日期字符串
 *  l long值
 *  pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 */
export function getFormatDateByLong (l, pattern) {
  return getFormatDate(new Date(l), pattern)
}

function getFormatDate (date, pattern) {
  if (!(date instanceof Date)) {
    date = new Date()
  }
  if (!pattern) {
    pattern = 'yyyy-MM-dd hh:mm:ss'
  }
  return dateFormat(date, pattern)
}
const superType = (data) => {
  const type = Object.prototype.toString.call(data).toLowerCase()
  return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
    return rest[1]
  })
}
export function deepCloneJson (json) {
  return JSON.parse(JSON.stringify(json))
}
export function deepCopy (origin) {
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

export function isNullOrUndefined (variable) {
  return variable === null || variable === undefined
}
export function isNumber (obj) {
  return typeof obj === 'number' && isFinite(obj)
}

// 下载文件
export function downFile (data, name, suffix = '') {
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

// 基于fileId下载文件
// export function downloadBaseFileId (fileId) {
//   request({
//     url: env + '/file/downloadFile',
//     method: 'post',
//     responseType: 'blob',
//     responseOrigin: true,
//     data: { id: fileId }
//   }).then(res=>{})
// }

/* 树形结构转一维数组
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi

@params obj:[Object]，形式为：{id:1,children:[{id:2}]}，需要一个根节点
@params childrenKey，子节点的key，默认为children
@params noChildren，返回的一维数组是否不要children
*/
export function treeToLinearArray (
  obj,
  { childrenKey = 'children', noChildren = true } = {}
) {
  const result = []
  result.push(obj)
  if (obj[childrenKey] && obj[childrenKey].length) {
    ;(function deep (arr) {
      arr.forEach((unit) => {
        result.push(unit)
        if (unit[childrenKey] && unit[childrenKey].length) {
          deep(unit[childrenKey])
        }
        if (noChildren) {
          delete unit[childrenKey]
        }
      })
    })(obj[childrenKey])
  }
  if (result.length && noChildren) {
    delete result[0][childrenKey]
  }
  return result
}

/* 树形结构转一维数组(generator方式)
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi

@params list:[Object]，形式为：[{id:1,children:[{id:11}]},{id:2,children:[id:21]}]
@params childrenKey，子节点的key，默认为children
@params noChildren，返回的一维数组是否不要children
@params addLevel，是否添加层级$level
@params routeSumPath，是否给路由累加path，一般用作处理$router的children为相对路径时
*/
export function treeToLinearArrayGenerator (
  list,
  {
    childrenKey = 'children',
    noChildren = true,
    addLevel = true,
    routeSumPath = false
  } = {}
) {
  const result = []
  const initialLevel = 1 // 初始层级
  const initialPath = ''
  const run = function * (arr, level, parentPath) {
    for (let i = 0; i < arr.length; i++) {
      const itemOrgin = arr[i]
      const itemPure = { ...arr[i] }
      if (noChildren) {
        // 删除children
        delete itemPure[childrenKey]
      }
      if (addLevel) {
        // 添加层级
        itemPure.$level = level
      }
      if (routeSumPath) {
        // 路由累加path
        if (itemPure.path) {
          if (itemPure.path.startsWith('/')) {
            itemPure.$sumPath = parentPath + itemPure.path
          } else {
            itemPure.$sumPath = parentPath + `/${itemPure.path}`
          }
        }
      }
      yield itemPure
      if (itemOrgin[childrenKey] && itemOrgin[childrenKey].length) {
        yield * run(itemOrgin[childrenKey], level + 1, itemOrgin.path)
      }
    }
  }
  const gen = run(list, initialLevel, initialPath)
  for (const item of gen) {
    result.push(item)
  }
  return result
}

export function hasValue (a) {
  if (a !== null && a !== undefined) {
    return true
  }
  return false
}

export function pureType (value) {
  const type = Object.prototype.toString.call(value).toLowerCase()
  return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
    return rest[1]
  })
}

export function isEmpty (value, containEmptyString = false) {
  let emptyValues = ['', undefined, null]
  emptyValues = containEmptyString
    ? emptyValues.concat(['undefined', 'null'])
    : emptyValues
  return emptyValues.includes(value)
}
