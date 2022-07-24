<template>
    <button v-if="canControl" @click="switchStatus">{{ btnStatus | btnStatusLabel }}</button>
</template>
<script>
import registerMixin from '../mixins/register-component'

import { lngLatTo, pixelTo, toPixel } from '../utils/convert-helper'
// import { naturalDimensions }  from "../utils/imgUtils"
const TAG = 'el-amap-trail'

export default {
    name: TAG,
    filters: {
        btnStatusLabel(status) {
            const statusMap = {
                waiting: '播放轨迹',
                running: '暂停播放',
                paused: '继续播放',
                over: '重新播放'
            }
            return statusMap[status]
        }
    },
    mixins: [registerMixin],
    props: ['vid', 'trail', 'startIcon', 'endIcon', 'icon', 'autoRotation', 'canControl', 'autoRun', 'passedColor', 'pathColor', 'size', 'offset'],
    data() {
        const self = this
        return {
            $tagName: TAG,
            withSlots: false,
            btnStatus: 'waiting',
            converters: {
                icon(icon) {
                    icon = icon || 'https://webapi.amap.com/images/car.png'
                    return new AMap.Icon({
                        size: new AMap.Size(this.size[0], this.size[1]),
                        image: icon,
                        imageSize: new AMap.Size(this.size[0] * 3 / 3, this.size[1] * 3 / 3),
                        imageOffset: new AMap.Pixel(0, 0)
                    })
                },
                endIcon(icon) {
                    icon = icon 
                    return new AMap.Icon({
                        size: new AMap.Size(26, 40),
                        image: icon,
                        imageSize: new AMap.Size(26, 40),
                        imageOffset: new AMap.Pixel(0, 0)
                    })
                },
                startIcon(icon) {
                    icon = icon 
                    return new AMap.Icon({
                        size: new AMap.Size(26, 40),
                        image: icon,
                        imageSize: new AMap.Size(26, 40),
                        imageOffset: new AMap.Pixel(0, 0)
                    })
                }
            },
            handlers: {
                trail(trail) {
                    debugger
                    console.log('-----this.lineArr-----', trail)
                    if (!trail.length) return
                    self.addTrail(trail)
                }
            }
        }
    },
    created() {},
    beforeDestroy() {
        debugger
        this.polylineInstance.setMap && this.polylineInstance.setMap(null)
        this.passedPolylineInstance.setMap && this.passedPolylineInstance.setMap(null)
        this.endIconInstance.setMap && this.endIconInstance.setMap(null)
        this.startIconInstance.setMap && this.startIconInstance.setMap(null)

    // this.$amapComponent.editor && this.$amapComponent.editor.close();
    },

    methods: {
        __initComponent(options) {
            debugger
            if (this.startIcon) {
                this.startIconInstance = new AMap.Marker({
                    map: this.$amap,
                    position: this.trail[0],
                    icon: options.startIcon,
                    offset: new AMap.Pixel(-13, -40),
                    // autoRotation: options.autoRotation,
                    angle: 0,
                    visible: true
                })
            }
            if (this.endIcon) {
                this.endIconInstance = new AMap.Marker({
                    map: this.$amap,
                    position: this.trail[this.trail.length - 1],
                    icon: options.endIcon,
                    offset: new AMap.Pixel(-13, -40),
                    // autoRotation: options.autoRotation,
                    angle: 0,
                    visible: true
                })
            }
            this.featureInstance = new AMap.Marker({
                map: this.$amap,
                position: this.trail[0],
                icon: options.icon,
                offset: new AMap.Pixel(this.offset[0], this.offset[1]),
                autoRotation: options.autoRotation,
                angle: 0,
                visible: false
            })
            this.featureInstance.on('click', e => {
                debugger
                this.$emit('removeTrail')
            })

            this.$amapComponent = this.featureInstance
            this.$amapComponent.hide()
        },
        switchStatus() {
            console.log('--this.icon--', this.icon)

            debugger
            switch (this.btnStatus) {
                case 'waiting':
                    this.$amapComponent.moveAlong(this.lineArr, 200)
                    this.btnStatus = 'running'
                    break
                case 'running':
                    this.$amapComponent.pauseMove()
                    this.btnStatus = 'paused'
                    break
                case 'paused':
                    this.$amapComponent.resumeMove()
                    this.btnStatus = 'running'
                    break
                case 'over':
                    this.$amapComponent.moveAlong(this.lineArr, 200)
                    this.btnStatus = 'running'
                    break
            }
        },

        addTrail(trail) {
            this.lineArr = trail

            // 绘制轨迹
            debugger
            this.polylineInstance  = new AMap.Polyline({
                map: this.$amap,
                path: this.lineArr,
                showDir: false,
                strokeColor: this.pathColor, // 线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 4 // 线宽
                // strokeStyle: "solid"  //线样式
            })

            this.passedPolylineInstance  = new AMap.Polyline({
                map: this.$amap,
                // path: lineArr,
                strokeColor: this.pathColor, // 线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 4 // 线宽
                // strokeStyle: "solid"  //线样式
            })

            // this.$amap.add(overlayGroups);
            this.$amapComponent.setPosition(this.lineArr[0])
            this.$amapComponent.show()
            this.$amapComponent.on('moving',  e => {
                this.passedPolylineInstance.setPath(e.passedPath)
            })
            this.$amapComponent.on('moveend', e => {
                // this.btnStatus = "over";
            })
            this.passedPolylineInstance.on('click', e => {
                this.$emit('removeTrail')
            })
            this.polylineInstance.on('click', e => {
                this.$emit('removeTrail')
            })
      
            if (this.autoRun) {
                this.switchStatus('running')
            }
        }
   
    }
 
}
</script>
