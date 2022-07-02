<script>
import registerMixin from '../mixins/register-component'

import {
  lngLatTo,
  pixelTo,
  toPixel
} from '../utils/convert-helper'

import {
  compile,
  mountedVNode,
  mountedRenderFn
} from '../utils/compile'
import Vue from 'vue'

const TAG = 'el-amap-label-layer'

export default {
  name: TAG,
  mixins: [registerMixin],
  props: [
    'vid',
    // 'position',
    'visible',
    'zIndex',
    'opacity',
    'collision',
    'animation',
    'markers'
  ],
  data () {
    const self = this
    return {
      $tagName: TAG,
      withSlots: false,
      tmpVM: null,

      converters: {

        vnode (vnode) {
          const _vNode = typeof vnode === 'function' ? vnode(self) : vnode
          const vNode = mountedVNode(_vNode)
          this.$customContent = vNode
          return vNode.$el
        }

      },
      handlers: {
        zIndex (index) {
          this.setzIndex(index)
        },
        visible (flag) {
          flag === false ? this.hide() : this.show()
        },
        markers (LabelMarker) {
          this.add()
        }
      }
    }
  },
  created () {
    this.tmpVM = new Vue({
      data () {
        return { node: '' }
      },
      render (h) {
        const { node } = this
        return h('div', { ref: 'node' }, Array.isArray(node) ? node : [node])
      }
    }).$mount()
  },
  methods: {
    __initComponent (options) {
      if (this.$slots.default && this.$slots.default.length) {
        options.content = this.tmpVM.$refs.node
      }

      this.$amapComponent = new AMap.Marker(options)
    },

    $$getExtData () {
      return this.$amapComponent.getExtData()
    },

    $$getPosition () {
      return lngLatTo(this.$amapComponent.getPosition())
    },

    $$getOffset () {
      return pixelTo(this.$amapComponent.getOffset())
    }
  },
  render () {
    const slots = this.$slots.default || []
    if (slots.length) {
      this.tmpVM.node = slots
    }
    return null
  },
  destroyed () {
    this.tmpVM.$destroy()
    if (this.$customContent && this.$customContent.$destroy) {
      this.$customContent.$destroy()
    }
  }
}
</script>
