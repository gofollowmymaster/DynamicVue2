<template>
  <div class="pie-container  ">
      <v-chart class="chart" :option="pieChartOption" :autoresize="true"/>
  </div>
</template>
<script>

import {hasValue,JSONDeepCopy,deepMergeByKey } from "../../utils/tool"
import  chartOptions from "./chartConfig"
export default {
  name: 'dPieChart',
  components: {},
  props: {
    data: {
      type: Array,
      require: true
    },
    title:String,
    type:String,
    extraOptions:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
     
    const pieChartOptionTemplate=chartOptions[this.type+'PieChart']?(chartOptions[this.type+'PieChart']):chartOptions['basePieChart']
    return {
       pieChartOptionTemplate:deepMergeByKey(JSONDeepCopy(pieChartOptionTemplate),this.extraOptions)
    }
  },
  computed:{
    pieChartOption(){
      if(this.data.length<1) return this.pieChartOptionTemplate
      debugger
      this.pieChartOptionTemplate.color = [...this.data.reduce((prev,next)=>{
        prev.push(next.color)
        return prev
      },[]).filter(item=>item),...this.pieChartOptionTemplate.color,]
      this.pieChartOptionTemplate.series[0].data = this.data
                    
    //  if(this.pieChartOptionTemplate.legend){
    //    this.pieChartOptionTemplate.legend={}
    //  }
    debugger
    if(this.type=='left'){
      let sum=this.data.reduce((prev,next)=>{
            prev=prev+ parseFloat( next.value)
            return prev
          },0)
          sum=sum?sum:1

          const dataMap=  this.data.reduce((prev,next)=>{
            prev[next.name]={...next,percent:(next.value/sum) *100 }
            return prev
          },{})
          
        this.pieChartOptionTemplate.legend.formatter =function(name){
          const item=dataMap[name]
          return name + `  ${item.percent.toFixed(1)}%`
        }
        this.pieChartOptionTemplate.legend.textStyle={rich:  this.data.reduce((prev,next)=>{
          prev[next.name]=  {
              color: next.color,
          }
            return prev
        },{}) 
      }
    }
      
      debugger
 
      return  this.pieChartOptionTemplate
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
