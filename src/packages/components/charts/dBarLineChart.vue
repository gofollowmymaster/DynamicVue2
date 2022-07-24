<template>
    <div class="pie-container  ">
        <v-chart class="chart" :option="barChartOption" :autoresize="true" />
    </div>
</template>
<script>

import { deepMergeByKey, JSONDeepCopy } from '../../utils/tool'
import chartOptions from './chartConfig'
export default {
    name: 'DBarLineChart',
    components: {},
    props: {
        title: String,
        data: {
            type: Object,
            default() {
                return {}
            }
        },
        type: String,
        extraOptions: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        const barChartOptionTemplate = chartOptions[this.type + 'BarChart'] ? (chartOptions[this.type + 'BarChart']) : chartOptions.baseBarChart
        const self = this
        return {
            barChartOptionTemplate: JSONDeepCopy(deepMergeByKey(barChartOptionTemplate, self.extraOptions))
        }
    },
    computed: {
        barChartOption() {
            const barChartOptionTemplate = this.barChartOptionTemplate
            const max = Math.max(...Object.values(this.data).flat(2).map(item => item.value).map(parseFloat), 20)

            const xAxis = Object.values(this.data)[0]?.map(item => {
                return item.label
            })
            debugger
            barChartOptionTemplate.xAxis.data = xAxis
            barChartOptionTemplate.yAxis[0].max = Math.ceil(max * 1.5)
            barChartOptionTemplate.yAxis[0].interval = Math.ceil(max / 5)
            const series = []

            const seriesBarTemplate = barChartOptionTemplate.series[0] || {}
            const seriesLineTemplate = barChartOptionTemplate.series[1] || {}
            barChartOptionTemplate.series = []
            const lineData = {}
            for (const seriesName in this.data) {
                const seriesData = deepMergeByKey(seriesBarTemplate, {
                    name: seriesName,
                    type: 'bar',
                    data: this.data[seriesName].map(item => item.value)
                })
                series.push(seriesData)

                // line
                this.data[seriesName].forEach((item, index) => {
                    const oldValue = (lineData[item.label]?.value) || 0
                    const newValue = oldValue + item.value
                    lineData[item.label] = { ...item, value: newValue }
                    // lineData[item.label]={...item,value:}
                })
            }
            series.push(deepMergeByKey(seriesLineTemplate, {
                name: '合计',
                type: 'line',
                yAxisIndex: 0,
                data: Object.values(lineData).map(item => item.value)
            }))

            barChartOptionTemplate.series = series

            return barChartOptionTemplate
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
