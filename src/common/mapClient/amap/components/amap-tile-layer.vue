<template></template>
<script>
import registerMixin from '../mixins/register-component'

import { lngLatTo, pixelTo, toPixel } from '../utils/convert-helper'

const TAG = 'el-amap-tile-layer'

export default {
  name: TAG,
  mixins: [registerMixin],
  props: [
    'vid',
    'zIndex',
    'opacity',
    'zooms',
    'detectRetina',
    'tileSize',
    'tileUrl',
    'errorUrl'
  ],
  data () {
    const self = this
    return {
      $tagName: TAG,
      withSlots: false,

      converters: {},
      handlers: {
        opacity (opacity) {
          if (!opacity) return
          this.setOpacity(opacity)
        },
        tileUrl (tileUrl) {
          if (!tileUrl) return
          this.setTileUrl(tileUrl)
        },
        zIndex (zIndex) {
          if (!zIndex) return
          this.setzIndex(zIndex)
        },
        zooms (zooms) {
          if (!zooms) return
          this.getZooms(zooms)
        }
      }
    }
  },
  created () {},
  methods: {
    __initComponent (options) {
      console.log(options)

      let tileLayer
      switch (options.tileUrl) {
        case 'Satellite':
          options.tileUrl = undefined
          options.errorUrl = undefined
          options.tileSize = undefined
          tileLayer = new AMap.TileLayer.Satellite(options)
          break
        case 'RoadNet':
          options.tileUrl = undefined
          options.errorUrl = undefined
          options.tileSize = undefined
          tileLayer = new AMap.TileLayer.RoadNet(options)
          break
        default:
          tileLayer = new AMap.TileLayer(options)
      }
      // tileLayer.setMap(this.$amap);
      this.$amapComponent = tileLayer
    }
  },

  destroyed () {
    // this.tmpVM.$destroy();
  }
}
</script>
