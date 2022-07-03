 

<template>
  <el-dialog
    class="select-point-container"
    :title="title"
    :visible.sync="visible.value"
    :width="'45vw'"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-click-escape="false"
    :append-to-body="true">
    <el-amap
      class="amap-box"
      vid="amap-vue"
      ref="map"
      :layers="layers"
      :events="events"
      v-bind="amapStyleConfig"
    >
    <el-amap-info-window  v-if="position.length" :position="position" :offset="[0,-24]">
       <div class="info" style="position:inherit;margin-bottom:0;">
         {{text}}
         </div> 
    </el-amap-info-window>
      <el-amap-marker v-if="position.length" :position="position"  ></el-amap-marker>
      <el-amap-polygon
        v-if="path.length"
        :vid="'overlay-polygon-1'"
        :path="path"
        :bubble="true"
        strokeColor="#5d7fe1"
        :strokeOpacity="1"
        :strokeWeight="2"
        fillColor="#cbdfff"
        :fillOpacity="0.5"
        strokeStyle="dashed"
        :strokeDasharray="[5, 5]"
      >
      </el-amap-polygon>
    </el-amap>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="mode=='select'" @click="clearPosition">清 除</el-button>
      <el-button type="primary" @click="selectPointConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
const amapStyleConfig = window._config?.amapStyleConfig
import {regionPath}   from  "@/network/amapData/region.js"
import {gcj02ToWgs}  from  "@/common/mapClient/amap/utils/mapUtils"
const TK_KEY = 'af3a42f19a33f75acc37a6f5b7e81331'
const vecLayer = `http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=vec_w&tk=${TK_KEY}&x=[x]&y=[y]&l=[z]`
const cvaLayer = `http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=cva_w&tk=${TK_KEY}&x=[x]&y=[y]&l=[z]`


export default {
  name: 'selectPointGis',
  props: {
    visible: {
      type: Object,
      default: function () {
        return { value: false }
      }
    },
    zoom: {
      type: Number,
      default: function () {
        return 11
      }
    },
    title: {
      type: String,
      default: function () {
        return '选择位置'
      }
    },
    position: {
      type: Array,
      default: function () {
        return []
      }
    },
    mode:{
      type:String,
      default:'select'
    }
  },
  model: {
    prop: 'position',
    event: 'change'
  },
  data () {
    return {
      amapStyleConfig,
      path: regionPath,
      center: [106.680603, 29.402348],
      text: '',
      layers:[   { type: 'tile', url: cvaLayer },
          { type: 'tile', url: vecLayer }],
      events: {
        click: (selectedPoint) => {
          debugger
          const { lng, lat } = selectedPoint.lnglat
          if(this.mode=='select'){
              this.$emit('change', [lng, lat])
          }
        }
      },
      infoWin: null
    }
  },
  watch: {
    position: {
      handler (position) {
        if (!position.length) return
        debugger
        // position=gcj02ToWgs(position)
        this.geocoder.getAddress(position, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            this.text = result.regeocode.formattedAddress
           
          } else {
            console.error('根据经纬度查询地址失败')
          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  beforeCreate () {
    this.geocoder = new AMap.Geocoder({
      // city: "010", //城市设为北京，默认：“全国”
      // radius: 1000 //范围，默认：500
    })
  },
  mounted () {
   
  },
  methods: {
    selectPointConfirm () {
      if (this.position.length < 1) {
        this.$alert('您还没有选择任何点', '', {
          confirmButtonText: '确定',
          showCancelButton: true,
          callback: (action) => {
            if (action === 'confirm') {
              this.visible.value = false
            }
          }
        })
        return
      }
      this.visible.value = false
    },
    clearPosition () {
      this.$emit('change', [])
    },

    handleClose () {
      this.visible.value = false
    }
  }
}
</script>

<style lang="css" scoped>
.amap-box {
  height: 40vh;
  min-height: 420px;
}

.select-point-container /deep/ .el-dialog__body {
  height: auto !important;
  padding: 0px 4px;
}
/deep/ .amap-info-close ,/deep/ .amap-info-sharp{
  display: none;
}
</style>
