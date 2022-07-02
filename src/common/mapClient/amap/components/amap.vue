<template>
  <div class="el-vue-amap-container">
    <div class="el-vue-amap"></div>
    <slot></slot>
  </div>
</template>
<script>
import guid from "../utils/guid";
import CONST from "../utils/constant";
import { lngLatTo, toLngLat, toPixel } from "../utils/convert-helper";
import registerMixin from "../mixins/register-component";
import { lazyAMapApiLoaderInstance } from "../services/injected-amap-api-instance";
// import  AMap from  'AMap'

export default {
  name: "el-amap",
  mixins: [registerMixin],
  props: [
    //  add v1.4.0 new feature
    "viewMode",
    "skyColor",
    "rotateEnable",
    "pitch",
    "buildingAnimation",
    "pitchEnable",
    "vid",
    "events",
    "center",
    "zoom",
    "draggEnable",
    "level",
    "zooms",
    "lang",
    "defaultCursor",
    "crs",
    "animateEnable",
    "isHotspot",
    "defaultLayer",
    "layers",
    "labelzIndex",
    // 'rotateEnable',
    "resizeEnable",
    "showIndoorMap",
    "indoorMap",
    "expandZoomRange",
    "dragEnable",
    "zoomEnable",
    "doubleClickZoom",
    "keyboardEnable",
    "jogEnable",
    "scrollWheel",
    "touchZoom",
    "mapStyle",
    "plugin",
    "features",
    "amapManager", // 地图管理 manager
    "showLabel",
    "drawOpen",
    "lockMapBound",
    'toolbar'
  ],

  beforeCreate() {
    this._loadPromise = lazyAMapApiLoaderInstance.load();
  },

  destroyed() {
    this.$amap && this.$amap.destroy();
  },

  computed: {
    /**
     * convert plugin prop from 'plugin' to 'plugins'
     * unify plugin options
     * @return {Array}
     */
    plugins() {
      let plus = [];
      // amap plugin prefix reg
      const amap_prefix_reg = /^AMap./;
      debugger
      // parse plugin full name
      const parseFullName = (pluginName) => {
        return amap_prefix_reg.test(pluginName)
          ? pluginName
          : "AMap." + pluginName;
      };

      // parse plugin short name
      const parseShortName = (pluginName) => {
        return pluginName.replace(amap_prefix_reg, "");
      };

      if (typeof this.plugin === "string") {
        plus.push({
          pName: parseFullName(this.plugin),
          sName: parseShortName(this.plugin),
        });
      } else if (this.plugin instanceof Array) {
        plus = this.plugin.map((oPlugin) => {
          let nPlugin = {};

          if (typeof oPlugin === "string") {
            nPlugin = {
              pName: parseFullName(oPlugin),
              sName: parseShortName(oPlugin),
            };
          } else {
            oPlugin.pName = parseFullName(oPlugin.pName);
            oPlugin.sName = parseShortName(oPlugin.pName);
            nPlugin = oPlugin;
          }
          return nPlugin;
        });
      }
      return plus;
    },
  },

  data() {
    const self=this
    return {
      converters: {
        center(arr) {
          return toLngLat(arr);
        },
        layers(layers) {
           
          layers= JSON.parse(JSON.stringify(layers))
          console.log('----layers---',layers)
 
          return layers.reverse().map((layer, index) => {
            if(layer.type=='img'){
              return new AMap.ImageLayer({
                url: layer.url,
                bounds: new AMap.Bounds( [106.54856606369019,29.639075637020165],[106.56977108764648,29.64855979552438]),
                zooms: [15, 18],
              });
            }
            return new AMap.TileLayer({
              // 天地图底图图块取图地址
              getTileUrl: layer.url,
              zIndex: index + 1,
            });
          });
        },
      },
      handlers: {
        zoomEnable(flag) {
          this.setStatus({ zoomEnable: flag });
        },
        dragEnable(flag) {
          this.setStatus({ dragEnable: flag });
        },
        rotateEnable(flag) {
          this.setStatus({ rotateEnable: flag });
        },
        animateEnable(flag) {
          this.setStatus({ animateEnable: flag });
        },
        jogEnable(flag) {
          this.setStatus({ jogEnable: flag });
        },
        showBuildingBlock(flag) {
          this.setStatus({ showBuildingBlock: flag });
        },
        showLabel(flag) {},
      
        features(features) {
          if (Array.isArray(features)) {
            this.setFeatures(features);
          }
        },
        drawOpen(drawOpen){
         debugger
          // if(!this)return 
          
            this.plugin(["AMap.MouseTool"], () => {
              var mouseTool = new AMap.MouseTool(this);

              if (drawOpen) {
                  if( !mouseTool[drawOpen])return
                  
                mouseTool[drawOpen]();
              AMap.event.addListener(mouseTool, "draw", function (e) {
                //  e.obj.Je.visible = false
                
                const path = e.obj.getPath();
                  // overlays.push(e.obj);

                const lnglatpoints = [];
                path.forEach((point) => {
                  lnglatpoints.push(`[${point.lng},${point.lat}]`);
                });
                console.log(`[${lnglatpoints.join(',')}]`);
                // vm.mapDates =path
                // e.obj.hide()
                mouseTool.close();
                self.$emit('drawOver')
              });
                 return
          }
          
          mouseTool.close(true)//关闭，并清除覆盖物

            });
         
        },
      
        

      },
    };
  },
  watch:{
      layers:{
        handler(layers) {
          try{
          debugger
          if(!this.$amap)return 
          if(layers.length<1)return
          layers= JSON.parse(JSON.stringify(layers))
          console.log('----layers---',layers)

         layers.reverse().forEach((layer, index) => {
           debugger
              if(layer.type=='img'){
                 new AMap.ImageLayer({
                url: layer.url,
                bounds: new AMap.Bounds( [106.54856606369019,29.639075637020165],[106.56977108764648,29.64855979552438]),
                // zooms: [15, 18],
                zIndex: index + 1,

              }).setMap(this.$amap);
              return
            }
             new AMap.TileLayer({
              // 天地图底图图块取图地址
              getTileUrl: layer.url,
              zIndex: index + 1,
            }).setMap(this.$amap);
          })
          }catch(err){
            console.error(err)
          }
        },
        deep:true,
        immediate:true
      },
     
  },

  mounted() {
    debugger
    this.createMap().then(() => {
      // 限制地图显示范围
      if (this.lockMapBound) {
        var bounds = this.$amap.getBounds();
        
        const swLngLat = bounds.getSouthWest().offset(-this.lockMapBound, -this.lockMapBound);
        const neLngLat = bounds.getNorthEast().offset(this.lockMapBound, this.lockMapBound);
        this.$amap.setLimitBounds(new AMap.Bounds(swLngLat, neLngLat));
      }
      
       this.$emit('created',this.$amap)
    });
  },

  addEvents() {
    this.$amapComponent.on("moveend", () => {
      const centerLngLat = this.$amapComponent.getCenter();
      this.center = [centerLngLat.getLng(), centerLngLat.getLat()];
    });
  },

  methods: {
    addPlugins() {
      debugger
      const _notInjectPlugins = this.plugins.filter(
        (_plugin) => !AMap[_plugin.sName]
      );

      // if (!_notInjectPlugins || !_notInjectPlugins.length) {
        return this.addMapControls();
      // }
      // return this.$amapComponent.plugin(_notInjectPlugins, this.addMapControls);
        // return this.addMapControls();

    },

    addMapControls() {
      if (!this.plugins || !this.plugins.length) return;
      //  store plugin instances
      this.$plugins = this.$plugins || {};
        debugger
      
      this.plugins.forEach((_plugin) => {
        const realPluginOptions = this.convertAMapPluginProps(_plugin);
        let pluginInstance 
        if(AMap[realPluginOptions.sName]){
                   pluginInstance = (this.$plugins[realPluginOptions.pName] =
          new AMap[realPluginOptions.sName](realPluginOptions));
        }


        // add plugin into map
        this.$amapComponent.addControl(pluginInstance);

        // register plugin event
        if (_plugin.events) {
          for (const k in _plugin.events) {
            const v = _plugin.events[k];
            if (k === "init") v(pluginInstance);
            else AMap.event.addListener(pluginInstance, k, v);
          }
        }
      });
    },

    /**
     * parse plugin
     * @param  {Object}
     * @return {Object}
     */
    convertAMapPluginProps(plugin) {
      if (typeof plugin === "object" && plugin.pName) {
        switch (plugin.pName) {
          case "AMap.ToolBar": {
            // parse offset
            if (plugin.offset && plugin.offset instanceof Array) {
              plugin.offset = toPixel(plugin.offset);
            }
            break;
          }
          case "AMap.Scale": {
            // parse offset
            if (plugin.offset && plugin.offset instanceof Array) {
              plugin.offset = toPixel(plugin.offset);
            }
            break;
          }
        }
        return plugin;
      } else {
        return "";
      }
    },

    setStatus(option) {
      this.$amap.setStatus(option);
    },

    createMap() {
      return this._loadPromise.then(() => {
        const mapElement = this.$el.querySelector(".el-vue-amap");
        const elementID = this.vid || guid();
        mapElement.id = elementID;
        this.$amap = this.$amapComponent = new AMap.Map(
          elementID,
          this.convertProps()
        );

        console.log("---this.convertProps()---", this.convertProps());
  
        if (this.amapManager) this.amapManager.setMap(this.$amap);
        this.$emit(CONST.AMAP_READY_EVENT, this.$amap);
        this.$children.forEach((component) => {
          component.$emit(CONST.AMAP_READY_EVENT, this.$amap);
        });

        if (this.plugins && this.plugins.length) {
          this.addPlugins();
        }
      });
    },
    $$getCenter() {
      if (!this.$amap) return lngLatTo(this.center);
      return lngLatTo(this.$amap.getCenter());
    },
  },
};
</script>

<style lang="css">
.el-vue-amap-container {
  height: 100%;
}
.el-vue-amap-container .el-vue-amap {
  height: 100%;
}
</style>
