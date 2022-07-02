import moment from 'moment'

export function treeToMap (tree, childrenKey, key) {
  return tree.reduce((prev, item, index) => {
    if (!item[key]) {
      console.log('---------warn-------', `key:${key} undefined in tree item`)
      return prev
    }
    if (item[childrenKey]) {
      const childrenList = item[childrenKey]
      prev[item[key]] = item
      return Object.assign(prev, treeToMap(childrenList, childrenKey, key))
    }
    prev[item[key]] = item
    return prev
  }, {})
}

export function treeToLineMap (tree, childrenKey, key) {
  let res = {}
  tree.forEach((item, index) => {
    if (item[childrenKey]) {
      const childrenList = item[childrenKey]
      res = { ...res, ...treeToMap(childrenList, childrenKey, key) }
      return
    }
    if (!item[key]) {
      console.warn('---------warn-------', `key:${key} undefined in tree item`)
      return
    }
    res[item[key]] = item
  })
  return res
}

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
// 对象扁平化
export function objFlat (obj) {
  var result = {}

  function recurse (src, prop) {
    var toString = Object.prototype.toString
    if (toString.call(src) === '[object Object]') {
      var isEmpty = true
      for (var p in src) {
        isEmpty = false
        recurse(src[p], prop ? prop + '.' + p : p)
      }
      if (isEmpty && prop) {
        result[prop] = {}
      }
    } else if (toString.call(src) === '[object Array]') {
      var len = src.length
      if (len > 0) {
        src.forEach(function (item, index) {
          recurse(item, prop ? prop + '.[' + index + ']' : index)
        })
      } else {
        result[prop] = []
      }
    } else {
      result[prop] = src
    }
  }
  recurse(obj, '')

  return result
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

/* BaseModal组件数据纯净化(过滤空值，将对象直接取value，将日期格式的数据直接转格式，有格式函数的执行格式函数)
一般用作提交数据时处理参数
@createTime 2022-04-22
@createUser luyi
@updateTime 2022-04-22
@updateUser luyi

@params items:[]，modalItems数组
@params data，获取到的formData
*/

export function formDataPureValue (items, data) {
  const result = { ...data }
  console.log('纯化值，之前=', result)
  for (const key in result) {
    if (pureType(result[key]) === 'object') {
      result[key] = result[key].value
    }
  }
  for (const index in items) {
    const item = items[index]
    const key = item.key
    if (item.ignore) {
      delete result[key]
      continue
    }
    if (hasValue(result[key])) {
      // 有值的时候
      if (item.type === 'date' && item.moment) {
        // 有moment配置，直接格式日期
        result[key] = moment(result[key]).format(item.moment)
      }
      if (item.formater) {
        // 有格式函数
        result[key] = item.formater(result, result[key])
      }
    } else {
      // 去掉空值
      delete result[key]
    }
    if (item.type === 'slot' || item.slot) {
      // 去掉slot项
      delete result[key]
    }
  }
  function hasValue (val) {
    if (val === '' || val === undefined || val === null) {
      return false
    }
    if (val instanceof Array) {
      if (val.length) {
        return true
      } else {
        return false
      }
    }
    return true
  }
  console.log('纯化值，之后=', result)
  return result
}

/* BaseModal组件回显数据
@createTime 2022-04-22
@createUser luyi
@updateTime 2022-04-22
@updateUser luyi

@params items:[]，modalItems数组
@params data:{}||null，后端响应的数据，若配置为null，则不做数据回显
@params echo:{}，需要回显的字段，例如key1字段需要回显成key2字段，{key1(data){return data[key2]}}，最终都以此配置为准
@params httpDict:function(dictKey){}，用于select，有此配置时，对应项会自动请求数据字典(数据字典为公用方法)
@params httpPromise:boolean，用于select，有此配时置，对应项会自动请求数据字典
*/

export function formDataEchoData ({
  items = [],
  data,
  echo = {},
  httpDict = true, // 用于select
  httpPromise = true // 用于select
} = {}) {
  for (const index in items) {
    const unit = items[index]
    const key = unit.key
    if (unit.type === 'select') {
      if (httpPromise && unit.httpPromise) {
        // 对应项，需要请求后台
        unit.httpPromise(unit)
      }
    }
    if (data) {
      // 需要回显数据
      unit.data = data[key]
      if (unit.type === 'select') {
        unit.data = { value: data[key] }
      }
    }
    if (key in echo) {
      unit.data = echo[key](data, unit)
    }
  }
  console.log('回显值为=', items)
  return items
}


export function isEmpty (value, containEmptyString = false) {
  let emptyValues = ['', undefined, null]
  emptyValues = containEmptyString
    ? emptyValues.concat(['undefined', 'null'])
    : emptyValues
  return emptyValues.includes(value)
}
