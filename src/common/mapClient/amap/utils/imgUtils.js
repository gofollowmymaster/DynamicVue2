// 获取图片原始尺寸
export class naturalDimensions {

    static getImgNaturalDimensions(imgDom) {
        var nWidth, nHeight
        if (imgDom.naturalWidth) { // 现代浏览器
            nWidth = imgDom.naturalWidth
            nHeight = imgDom.naturalHeight
        } else { // IE6/7/8
            nWidth = imgDom.width
            nHeight = imgDom.height
        }
        return { w: nWidth, h: nHeight }
    }
    static handle(imgDom) {
        return new Promise((resolve, reject) => {
           
            // 图片已加载
            if (this.isLoaded(imgDom)) {
                resolve(this.getImgNaturalDimensions(imgDom))
            } else {
                // 加载超时
                let timer = setTimeout(() => {
                    imgDom.onload = null
                    reject('img load failed')
                }, 5000)
                imgDom.addEventListener('load',  () => {
                    clearTimeout(timer)
                    // 加载成功
                    resolve(this.getImgNaturalDimensions(imgDom))
                })
                imgDom.addEventListener('error',  () => {
                    clearTimeout(timer)
                    console.error('load image  error:' + imgDom.src)
                    // 加载失败
                    resolve({ w: 300, h: 400 })
                })
            }
        })
    }
    static isLoaded(imgDom) {
        return imgDom.complete || imgDom.readyState == 'complete' || imgDom.readyState == 'loaded'
    }
}

export function cloneCanvas(oldCanvas, scale) {
  
    // create a new canvas
    var newCanvas = document.createElement('canvas')
    var context = newCanvas.getContext('2d')
    // set dimensions
    newCanvas.width = oldCanvas.width / scale
    newCanvas.height = oldCanvas.height / scale
    // apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0, oldCanvas.width, oldCanvas.height, 0, 0, newCanvas.width, newCanvas.height)
    // return the new canvas
    return newCanvas
}
export function mergeImg(canvas, bgImg, scale) {
  
    // create a new canvas
    var newCanvas = document.createElement('canvas')
    var context = newCanvas.getContext('2d')
    // set dimensions
    newCanvas.width = canvas.width / scale
    newCanvas.height = canvas.height / scale
    // apply the old canvas to the new one
    context.drawImage(bgImg, 0, 0, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height)
    context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newCanvas.width, newCanvas.height)
    // return the new canvas
    return newCanvas
}

export  function openNewWindow(innerHtml) {
    var newwindow = window.open()
    newwindow.document.write(innerHtml)
}

// 笔刷配置
export const brushOption = {
    1: {
        minWidth: 0.2,
        maxWidth: 1.3
    },
    2: {
        minWidth: 0.3,
        maxWidth: 2
    },
    3: {
        minWidth: 0.4,
        maxWidth: 3
    },
    4: {
        minWidth: 0.5,
        maxWidth: 4
    },
    5: {
        minWidth: 0.6,
        maxWidth: 5
    },
    6: {
        minWidth: 0.7,
        maxWidth: 6
    },
    7: {
        minWidth: 0.8,
        maxWidth: 7
    },
    8: {
        minWidth: 0.9,
        maxWidth: 8
    },
    9: {
        minWidth: 1,
        maxWidth: 10
    }
}

// 扩展Date的format方法
function formatDate(date, format) {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length))
        }
    }
    return format
}

export  function getFormatDate(date, pattern) {
    if (date == undefined) {
        date = new Date()
    }
    if (pattern == undefined || pattern == '') {
        pattern = 'yyyy-MM-dd hh:mm:ss'
    }
    return formatDate(date, pattern)
}

export function log(info, type = 'log') {
    console.log('------[signPad]------')
    console[type] && console[type](info)
}

export function throttle(fn, wait = 250) {
    let previous = 0
    let timeout = null
    let result
    let storedContext
    let storedArgs
    const later = () => {
        previous = Date.now()
        timeout = null
        result = fn.apply(storedContext, storedArgs)
        if (!timeout) {
            storedContext = null
            storedArgs = []
        }
    }
    return function wrapper(...args) {
        const now = Date.now()
        const remaining = wait - (now - previous)
        storedContext = this
        storedArgs = args
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            result = fn.apply(storedContext, storedArgs)
            if (!timeout) {
                storedContext = null
                storedArgs = []
            }
        } else if (!timeout) {
            timeout = window.setTimeout(later, remaining)
        }
        return result
    }
}

export  function getWindowClientSize() {
    let width = 0, height = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        height = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        width  == (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth
    } else {
        height = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        width  == (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth
    }
    return {width, height}
}

