<template />
<script>
import registerMixin from '../mixins/register-component'

import { lngLatTo, pixelTo, toPixel } from '../utils/convert-helper'

const TAG = 'el-amap-overlay-group-polygon'

export default {
    name: TAG,
    mixins: [registerMixin],
    props: [
        'vid',
        'visible',
        'overlays',
        'layname',
        'strokeColor', // 线颜色
        'strokeOpacity', // 线透明度
        'strokeWeight', // 线宽
        'fillColor', // 填充色
        'fillOpacity', // 填充透明度
        'strokeStyle'
    ],
    
    data() {
        const self = this
        return {
            $tagName: TAG,
            withSlots: false,

            converters: {},
            handlers: {
                overlays(overlayGroup) {
           
                    const polygons = []
                    overlayGroup?.forEach((element, inedx) => {

                        try {
                            if (typeof element.path == 'string' && element.path) {
                                element.path = JSON.parse(element.path)
                            }
                            const polygon = new AMap.Polygon({
                                path: element.path, // 设置多边形边界路径
                                strokeColor: self.strokeColor || '#5d7fe1', // 线颜色
                                strokeOpacity: self.strokeOpacity || 1, // 线透明度
                                strokeWeight: self.strokeWeight || 2, // 线宽
                                fillColor: self.fillColor || '#cbdfff', // 填充色
                                fillOpacity: self.fillOpacity || 0.5, // 填充透明度
                                strokeStyle: self.strokeStyle,
                                extData: Object.assign({ type: self.layname }, element)
                
                            })
               
                            polygon.on('click', function(ev) {
                                self.$emit('click-feature', {
                                    data: this.getExtData(),
                                    ...ev,
                                    lnglat: lngLatTo(ev.lnglat)
                                })
                            })
                            polygon.on('mouseover', function(ev) {
                                console.log('---mouseover--', ev)
                                // setOptions
          
                                self.$emit('hover-feature', {
                                    data: this.getExtData(),
                                    position: ev.pixel,
                                    lnglat: lngLatTo(ev.lnglat),
                                    target: ev.target
                                })
                            })
                            polygon.on('mouseout', function(ev) {
                                self.$emit('leave-feature', {
                                    data: this.getExtData(),
                                    position: ev.pixel,
                                    lnglat: lngLatTo(ev.lnglat),
                                    target: ev.target
                                })
                            })
                            polygons.push(polygon)
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    this.clearOverlays()
                    polygons.length && this.addOverlays(polygons)
          
                }
            }
        }
    },
    created() {},

    destroyed() {
    // this.tmpVM.$destroy();
    },
    methods: {
        __initComponent(options) {
            const overlayGroups = new AMap.OverlayGroup([])
            this.$amapComponent = overlayGroups
            this.$amap.add(overlayGroups)
        }
    }
}
</script>
