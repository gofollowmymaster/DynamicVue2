// 扩展Date的format方法
Date.prototype.format = function(format) {
    const o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length))
        }
    }
    return format
}
  
/*  转换long值为日期字符串
   *  l long值
   *  pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
   */
export function getFormatDateByLong(l, pattern) {
    return getFormatDate(new Date(l), pattern)
}
  
export function getFormatDate(date, pattern) {
    if (date == undefined) {
        date = new Date()
    }
    if (pattern == undefined || pattern == '') {
        pattern = 'yyyy-MM-dd hh:mm:ss'
    }
    return date.format(pattern)
}
  
const formatTime = (date, formate = 'YmdHi') => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    switch (formate) {
        case 'YmdHis':
            return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
            break
        case 'YmdHi':
            return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute].map(formatNumber).join(':')}`
            break
        case 'Ymd':
            return [year, month, day].map(formatNumber).join('/')
            break
        case 'Hi':
            return [hour, minute].map(formatNumber).join(':')
            break
    }
    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute].map(formatNumber).join(':')}`
}
  
// 时间格式转换
export function returnDiyDate(time) {
    time = time < 10000000000 ? time * 1000 : time
    // date = parseInt(date);  //强转整型
    const tDate = formatTime(new Date(), 'Ymd') // 当前凌晨时间(string)
    const tTime = new Date(tDate).getTime() // 当前凌晨时间(long)
    const eTime = 24 * 60 * 60 * 1000 // 一天时间(long)
    const yTime = tTime - eTime // 昨天凌晨时间(long)
    // var byTime = tTime - 2 * eTime; //前天凌晨时间(long)
    let result = ''
    if (time >= tTime) {
        // 今天
        result = '今天'
    } else if (time < tTime && time >= yTime) {
        // 昨天
        result = '昨天 '
    }
    // else if (time < yTime && date >= byTime) {
    //   //前天
    //   var result = "前天 ";
    // }
    else {
        // 之前
        result = formatTime(new Date(time), 'Ymd')
    }
    return result
}
  
const momentTime = (dateTimeStamp, isDayMoment = false) => {
    dateTimeStamp = dateTimeStamp > 2000000000 ? dateTimeStamp : dateTimeStamp * 1000
    const minute = 1000 * 60
    const now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    let result = ''
    const minuteComment = diffValue / minute
    if (minuteComment > 60 * 24 && isDayMoment) {
        result = returnDiyDate(dateTimeStamp)
    } else if (minuteComment > 60) {
        result = formatTime(new Date(dateTimeStamp), 'Hi')
    } else if (minuteComment <= 60 && minuteComment >= 2) {
        result = `${parseInt(minuteComment)}分前`
    } else if (minuteComment < 2) {
        result = '刚才'
    }
    return result
}
  
const isNewDay = (time, nextTime) => {
    let dateOld = new Date(time * 1000)
    let dateNew = new Date(nextTime * 1000)
  
    dateOld = dateOld.getDate()
    dateNew = dateNew.getDate()
  
    if (dateOld != dateNew) {
        return returnDiyDate(nextTime)
    }
    if (nextTime - time > 300) {
        return momentTime(nextTime)
    }
}
  
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}
function getTime() {
    return (new Date()).getTime() / 1000
}
 