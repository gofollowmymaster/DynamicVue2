import Vue from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import * as echarts from 'echarts'

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GraphicComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LegendComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  GraphicComponent,
  PieChart,
  LineChart
])

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)
Vue.prototype.$echarts = echarts
