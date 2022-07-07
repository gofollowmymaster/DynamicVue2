
<template>
    <main >
      <div class="p8" :id="instanceId">
      </div>
    </main>
</template>

<script>
import qrCode from 'qrcodejs2'
export default {
  name: 'QrCodeImg',
  props: {

    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: function () {
        return {
          width: 150,
          height: 150,
          colorDark: '#000000',
          colorLight: '#ffffff',
          typeNumber: 4
        }
      }
    }

  },

  data () {
    return {
      qrInstance: null,
      instanceId: 'qrcode' + Math.floor(Math.random() * 10000)
    }
  },
  watch: {
    value: {
      handler (url) {
        if (!url) return
        if (!this.qrInstance) {
          this.initQrCode().then(() => {
            this.qrInstance.clear()
            this.qrInstance.makeCode(url)
          })
          return
        }
        this.qrInstance.clear()
        this.qrInstance.makeCode(url)
      },
      immediate: true
    }
  },

  mounted () {
    this.initQrCode()
  },
  methods: {
    initQrCode () {
      return this.$nextTick().then(() => {
        // 只能有一个实例
        this.qrInstance || (this.qrInstance = new qrCode(this.instanceId, this.options))
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
