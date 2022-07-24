
var PI = 3.14159265358979324

function transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0
    return ret
}

function transformLon(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0
    return ret
}

export function gcj02ToWgs([lng, lat]) {
    var a = 6378245.0                 
    var ee = 0.00669342162296594323
    var lat1 = +lat
    var lng1 = +lng
    var dlat = transformLat(lng1 - 105.0, lat1 - 35.0)
    var dlng = transformLon(lng1 - 105.0, lat1 - 35.0)
    var radlat = lat1 / 180.0 * PI
    var magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    var sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
    var mglat = lat1 + dlat
    var mglng = lng1 + dlng
    var latlng = []
    latlng[0] = lng1 * 2 - mglng
    latlng[1] = lat1 * 2 - mglat
    return latlng
}

var a = 6378245.0 // 卫星椭球坐标投影到平面地图坐标系的投影因子。  
 
// 判断是否在国内，在中国国内的经纬度才需要做偏移
function out_of_china(lng, lat) {
    return (
        lng < 72.004 ||
        lng > 137.8347 ||
        (lat < 0.8293 || lat > 55.8271 || false)
    )
}
 
// 转化经度
function transformlng(lng, lat) {
    var ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng))
    ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) +
            20.0 * Math.sin(2.0 * lng * PI)) *
            2.0) /
        3.0
    ret +=
        ((20.0 * Math.sin(lng * PI) +
            40.0 * Math.sin((lng / 3.0) * PI)) *
            2.0) /
        3.0
    ret +=
        ((150.0 * Math.sin((lng / 12.0) * PI) +
            300.0 * Math.sin((lng / 30.0) * PI)) *
            2.0) /
        3.0
    return ret
}
 
// 转化纬度
function transformlat(lng, lat) {
    var ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng))
    ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) +
            20.0 * Math.sin(2.0 * lng * PI)) *
            2.0) /
        3.0
    ret +=
        ((20.0 * Math.sin(lat * PI) +
            40.0 * Math.sin((lat / 3.0) * PI)) *
            2.0) /
        3.0
    ret +=
        ((160.0 * Math.sin((lat / 12.0) * PI) +
            320 * Math.sin((lat * PI) / 30.0)) *
            2.0) /
        3.0
    return ret
}
 
// wgs84 to gcj02   天地图 转 高德坐标
export function wgs84togcj02([lng, lat]) {
    let ee = 0.00669342162296594323 // 椭球的偏心率。

    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0)
        var dlng = transformlng(lng - 105.0, lat - 35.0)
        var radlat = (lat / 180.0) * PI
        var magic = Math.sin(radlat)
        magic = 1 - ee * magic * magic
        var sqrtmagic = Math.sqrt(magic)
        dlat =
            (dlat * 180.0) /
            (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
        dlng =
            (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
        var mglat = lat + dlat
        var mglng = lng + dlng
 
        return [mglng, mglat]
    }
}

