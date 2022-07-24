<template>
    <div class="pie-container  ">
        <v-chart class="chart" :option="lineChartOption" :autoresize="true" />
    </div>
</template>
<script>

import { JSONDeepCopy } from '../../utils/tool'
import { baseLineChartOption } from './chartConfig'
export default {
    name: 'DLineChart',
    components: {},
    props: {
        hasAreaStyle: Boolean,
        colorStyle: {
            type: Array,
            default() {
                return [['#6F89EC', '#97FFD4', '#FFFFFF'], ['#0BC972', '#B5CFFF', '#FFFFFF']]
            }
        },
        title: String,
        data: {
            type: Object,
            default() {
                return {}
            }
        }

    },
    data() {
        return {
            lineChartOptionTemplate: JSONDeepCopy(baseLineChartOption)
        }
    },
    computed: {
        lineChartOption() {
            const lineChartOptionTemplate = this.lineChartOptionTemplate
            const max = Math.max(...Object.values(this.data).flat(2).map(item => item.value).map(parseFloat), 20)

            const xAxis = Object.values(this.data)[0]?.map(item => {
                return item.label
            })
            lineChartOptionTemplate.xAxis[0].data = xAxis
            lineChartOptionTemplate.yAxis[0].max = Math.ceil(max * 1.2)
            lineChartOptionTemplate.yAxis[0].interval = Math.ceil(max / 5)
            const series = []
            let index = 0
            debugger
            for (const seriesName in this.data) {
                const seriesData = {
                    name: seriesName,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        color: this.colorStyle[index][0]
                    },
                    itemStyle: {
                        color: this.colorStyle[index][0]
                    },
                    data: this.data[seriesName]
                }
                if (this.hasAreaStyle) {
                    seriesData.areaStyle = {}
                    seriesData.areaStyle.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: this.colorStyle[index][1]
                        },
                        {
                            offset: 1,
                            color: this.colorStyle[index][2]
                        }
                    ])
                }
                series.push(seriesData)

                index++
            }

            lineChartOptionTemplate.series = series

            return lineChartOptionTemplate
        }
    },

    mounted() {

    },
    methods: {}
}
</script>

<style lang="css" scoped>
.statistic-container {
    background: #fff;
    width: 100%;
}

</style>
