
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
            class="amap-box"
            vid="amap-vue"
            :events="events"
            v-bind="amapStyleConfig"
            @created="mapCreated"
        >
            <component :is="elementType" v-bind="elementInfo" :editable="true" />
        </el-amap>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="mode=='select'" @click="clearDrawElement">清 除</el-button>
            <el-button type="primary" @click="selectPointConfirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
 
 
export default {
    name: 'DrawElementGis',
    model: {
        prop: 'elementdata',
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
        drawType: {
            type: String,
            default: function() {
                return 'polygon'
            }
        },
    
        elementdata: {
            type: [Array],
            default: function() {
                return []
            }
        },
        mode: {
            type: String,
            default: 'select'
        }
    },
    data() {
        return {
            amapStyleConfig: this.$dynamicConfig.amapStyleConfig,
            path: this.$dynamicConfig.regionPath,
            events: {},
            drawTypeClone: ''
            // overlays:[]
        }
    },
    computed: {
        elementType() {
            return 'el-amap-' + this.drawType
        },
        elementInfo() {
            debugger
            switch (this.drawType) {
                case 'marker':
                    debugger
                    return {position: this.elementdata}
                case 'polygon':
                case 'polyline':
                    if (!Array.isArray(this.elementdata)) {
                        console.warn('数据格式错误：' + this.elementdata)
                        return  {path:[]}
                    }
                    return {path: this.elementdata}
                case 'circle':
                case 'ellipse':
                case 'rectangle':
                    // todo 验证数据格式
                    return this.elementdata
                default:
                    throw '不支持的图形:' + this.drawType
            }
        }
    },

    mounted() {},
    methods: {
        selectPointConfirm() {
            if (this.elementdata.length < 1 && this.mode == 'select') {
                this.$alert('您还没有选择任何要素', '', {
                    confirmButtonText: '确定',
                    showCancelButton: true,
                    callback: action => {
                        if (action === 'confirm') {
                            this.visible.value = false
                        }
                    }
                })
                return
            }
            this.visible.value = false
        },
        clearDrawElement() {
            this.$emit('change', [])
            this.initDrawTool()

        },
        handleClose() {
            this.$emit('change', [])
            // this.visible.value = false;

        },
        mapCreated(mapIns) {
            debugger
            // this.drawTypeClone=this.drawType
            // this.$forceUpdate()
            console.log('----mapCreated---')
            if (this.mode == 'view') return
            mapIns.plugin(['AMap.MouseTool'], () => {
                debugger
                this.mouseTool = new AMap.MouseTool(mapIns)
                this.initDrawTool()
            })
        },
        initDrawTool() {
            var drawObj = this.mouseTool[this.drawType]()
            AMap.event.addListener(this.mouseTool, 'draw',  e => {
                debugger
                let drawData
                switch (this.drawType) {
                    case 'marker':
                        drawData = e.obj.getPosition()
                        drawData = [drawData.getLng(), drawData.getLat()]
                        break
                    case 'polygon':
                    case 'polyline':
                        const path = e.obj.getPath()
                        drawData = []
                        path.forEach(point => {
                            drawData.push([point.lng, point.lat])
                        })
                        this.mouseTool.close(true)

                        break
                    case 'circle':
                    case 'ellipse':
                    case 'rectangle':
                        // todo 验证数据格式
                        break

                    default:
                        throw '不支持的图形:' + this.drawType
                }

                this.$emit('change', drawData)
            })
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
</style>
