<template />
<script>
import registerMixin from '../mixins/register-component'

import { lngLatTo, pixelTo, toPixel } from '../utils/convert-helper'

const TAG = 'el-amap-overlay-group-marker'

export default {
    name: TAG,
    mixins: [registerMixin],
    props: [
        'vid',
        'visible',
        'overlays',
        'layname',
        'icon',
        'limitPolygon'
    ],
    data() {
        const self = this
        return {
            $tagName: TAG,
            withSlots: false,

            converters: {},
            handlers: {
                overlays(overlayGroup) {
                    const markers = []
                    overlayGroup?.forEach((element, index) => {
                        try {
                            // if(!element.center[0]||!element.center[1])return
                            let isPointInRing = self.limitPolygon
                                ? AMap.GeometryUtil.isPointInRing(
                                    element.center,
                                    self.limitPolygon
                                )
                                : true
                            // isPointInRing=true
                            if (isPointInRing) {
                                const marker = new AMap.Marker({
                                    position: new AMap.LngLat(
                                        element.center[0],
                                        element.center[1]
                                    ),
                                    icon: self.icon,
                                    animation: element.animation,
                                    anchor: element.anchor,
                                    extData: Object.assign({ type: self.layname }, element)
                                })
                                marker.on('click', function(ev) {
                                    self.$emit('click-feature', {
                                        data: this.getExtData(),
                                        lnglat: lngLatTo(ev.lnglat)
                                    })
                                })
                                marker.on('mouseover', function(ev) {
                                    console.log('---mouseover--', ev)
                    
                                    self.$emit('hover-feature', {
                                        data: this.getExtData(),
                                        position: AMap.DomUtil.getViewportOffset(ev.originEvent.target),
                                        lnglat: lngLatTo(ev.lnglat)
                                    })
                                })
                                marker.on('mouseout', function(ev) {
                                    self.$emit('leave-feature', {
                                        data: this.getExtData(),
                                        position: ev.pixel,
                                        lnglat: lngLatTo(ev.lnglat)
                                    })
                                })
                                markers.push(marker)
                            }
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    this.clearOverlays()
                    this.addOverlays(markers)
          
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
