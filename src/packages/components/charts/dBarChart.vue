<template>
  <div class="pie-container  ">
         <v-chart class="chart" :option="barChartOption"  :autoresize="true"/>
  </div>
</template>
<script>

import { deepMergeByKey, hasValue, JSONDeepCopy } from '../../utils/tool'
import chartOptions from './chartConfig'
export default {
  name: 'dBarChart',
  components: {},
  props: {
    title: String,
    data: {
      type: Object,
      default () {
        return {}
      }
    },

    type: String,
    extraOptions: {
      type: Object,
      default () {
        return { '': [] }
      }
    }
  },
  data () {
    const barChartOptionTemplate = chartOptions[this.type + 'BarChart'] ? (chartOptions[this.type + 'BarChart']) : chartOptions.baseBarChart
    const self = this
    return {
      barChartOptionTemplate: JSONDeepCopy(deepMergeByKey(barChartOptionTemplate, self.extraOptions))
    }
  },
  computed: {
    barChartOption () {
      debugger

      let max = Math.max(...Object.values(this.data).flat(2).map(item => item.value).map(parseFloat), 10)
      max = Math.ceil(max * (this.type == 'stack' ? 1.5 : 1.2))

      const xAxis = Object.values(this.data)[0]?.map(item => {
        return item.label
      })
      this.barChartOptionTemplate.xAxis.data = xAxis
      this.barChartOptionTemplate.yAxis[0].max = max
      this.barChartOptionTemplate.yAxis[0].interval = Math.floor(max / 5)
      const series = []
      const seriesTemplate = this.barChartOptionTemplate.series[0] || {}
      this.barChartOptionTemplate.series = []
      for (const seriesName in this.data) {
        const seriesData = deepMergeByKey(seriesTemplate, {
          name: seriesName,
          type: 'bar',
          data: this.data[seriesName].map(item => item.value)
        })
        series.push(seriesData)
      }

      this.barChartOptionTemplate.series = series

      return this.barChartOptionTemplate
    }
  },

  mounted () {

  },
  methods: {}
}
</script>

<style lang="css" scoped>
.statistic-container {
background: #FFFFFF;
width: 100%;
}

</style>
