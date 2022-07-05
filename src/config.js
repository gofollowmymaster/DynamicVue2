const dev = "//23.13.5.135:8090";  
const amapWebKey = 'ffe3f53e63db6ca6bbe1d85264a8fc5b'
const amapWebMapKey = '467fddcf60be0b46a5506d94cd2cc858'
const tandiMapKey = 'b0c8343e73356d02148906ef935c9cf8'
const amapStyleConfig={
    zoom:15,
    zooms:[13, 18],
    showLabel:false,
    expandZoomRange:false,
    animateEnable:true,
    jogEnable:true,
    center:[106.559675,29.559168], 
    labelzIndex:120,
    lockMapBound:10000,
    regionPath:[]
}
const isDebug=false
const host = dev;

export default {
    actionTip:'msg',
    isDebug,
    host,
    staticHost:'http:'+host+'/file/static',
    amapWebKey,
    amapWebMapKey,
    tandiMapKey,
    amapStyleConfig,
    regionCode:'500103000000'
}