
<template>
    <el-dialog
        class="select-point-container"
        :title="title"
        :visible.sync="visible.value"
        :width="'45vw'"
        :show-close="true"
        :close-on-click-modal="false"
        :close-on-click-escape="false"
        :append-to-body="true"
    >
        <el-amap
            ref="map"
            class="amap-box"
            vid="amap-vue"
            :events="events"
            v-bind="amapStyleConfig"
        >
            <el-amap-info-window v-if="lnglatTemp.length" :position="lnglatTemp" :offset="[0,-24]">
                <div class="info" style="position: inherit; margin-bottom: 0;">
                    <div>坐标: {{ lnglatTemp.join(',') }}</div>
                    <div class="mt4">地址: {{ regeocodeTemp.formattedAddress }}</div>
                </div> 
            </el-amap-info-window>
            <el-amap-marker v-if="lnglatTemp.length" :position="lnglatTemp" />
            <el-amap-polygon
                v-if="path.length"
                :vid="'overlay-polygon-1'"
                :path="path"
                :bubble="true"
                stroke-color="#5d7fe1"
                :stroke-opacity="1"
                :stroke-weight="2"
                fill-color="#cbdfff"
                :fill-opacity="0.5"
                stroke-style="dashed"
                :stroke-dasharray="[5, 5]"
            />
        </el-amap>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="mode=='select'" @click="clearPosition">清 除</el-button>
            <el-button type="primary" @click="selectPointConfirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {gcj02ToWgs, wgs84togcj02}  from  '@/common/mapClient/amap/utils/mapUtils'

export default {
    name: 'PointSelectDialog',
    model: {
        prop: 'position',
        event: 'change'
    },
    props: {
        visible: {
            type: Object,
            default: function() {
                return { value: false }
            }
        },
        zoom: {
            type: Number,
            default: function() {
                return 11
            }
        },
        title: {
            type: String,
            default: function() {
                return '选择位置'
            }
        },
        position: {
            type: Object,
            default: function() {
                return {
                    lnglat: [],
                    regeocode: {}
                }
            }
        },
        mode: {
            type: String,
            default: 'select'
        }
    
    },
    data() {
        return {
            // positionTemp:{lnglat:[],regeocode:{}},
            regeocodeTemp: {},
            lnglatTemp: [],
            amapStyleConfig: this.$dynamicConfig.amapStyleConfig,
            path: this.$dynamicConfig.regionPath || [],
            center: this.$dynamicConfig.mapCenter,
       
            events: {
                click: selectedPoint => {
                    const { lng, lat } = selectedPoint.lnglat
                    if (this.mode == 'select') {
                        this.changed = true

                        this.lnglatTemp = [ lng, lat] 
               
                    }
                }
            },
            infoWin: null
        }
    },
    computed: {
 
        positionClone: {
            get() {
                return this.position.lnglat ? this.position : {  lnglat: [],    regeocode: {}}
            },
            set(position) {
                this.position = position
            }
        }
    },
    watch: {
        lnglatTemp: {
            handler(lnglat) {
                if (!lnglat?.length || !this.changed) return
         
                lnglat =  this.amapStyleConfig.layers?.length?wgs84togcj02(lnglat):lnglat
                this.geocoder.getAddress(lnglat, (status, result) => {
                    if (status === 'complete' && result.regeocode) {
                        debugger
                        console.log('--result.regeocode.addressComponent.citycode,---', result.regeocode.addressComponent.citycode,)
                        this.regeocodeTemp = {
                            formattedAddress: result.regeocode.formattedAddress,
                            citycode: result.regeocode.addressComponent.citycode,
                            adcode: result.regeocode.addressComponent.adcode,
                            country: result.regeocode.addressComponent.country,
                            district: result.regeocode.addressComponent.district,
                            province: result.regeocode.addressComponent.province,
                            street: result.regeocode.addressComponent.street,
                            streetNumber: result.regeocode.addressComponent.streetNumber,
                            towncode: result.regeocode.addressComponent.towncode,
                            township: result.regeocode.addressComponent.township,
                            businessAreas: result.regeocode.addressComponent.businessAreas
                        }
                    } else {
                        console.error('根据经纬度查询地址失败')
                    }
                })
            },
            deep: true
        }
    },
    beforeCreate() {
        this.geocoder = new AMap.Geocoder({
        })
    },
    created() {
        //  this.selected=this.position.lnglat||[]
        this.lnglatTemp = this.position.lnglat || []
        this.regeocodeTemp = this.position.regeocode || {}

    },
    methods: {
        selectPointConfirm() {
            debugger
            if (this.lnglatTemp.length < 1) {
                this.$alert('您还没有选择任何点', '', {
                    confirmButtonText: '确定',
                    showCancelButton: true,
                    callback: action => {
                        if (action === 'confirm') {
                            this.visible.value = false
                            this.$emit('confirm', {lnglat: [], regeocode: {}})
                        }
                    }
                })
                return
            }
            this.$emit('confirm', {lnglat: this.lnglatTemp, regeocode: this.regeocodeTemp})
            this.visible.value = false
        },
        clearPosition() {
            this.lnglatTemp = [ ]
        },

        handleClose() {
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
.select-point-container :deep .el-dialog__body {
    height: auto !important;
    padding: 0 4px;
}
:deep .amap-info-close,
:deep .amap-info-sharp {
    display: none;
}
</style>
