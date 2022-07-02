<template>
  <main  class="border grid-wrap border border-r4 p18">
      <componentWithTitle  title='固定资产等级统计'  class="grid-col-5 pr36"   >
        <template  slot="body" >
         <leftPie     :data="protectLevData"></leftPie>
        </template>
            </componentWithTitle >
        <section class="grid-wrap grid-col-19" style="--layout-row-gap:48px;--layout-gap:28px;">
        <componentWithTitle class="grid-col-12"  title='固定资产使用状况统计'    >
         <dBarChart  slot="body"  :data="growthSituationData"  class="bar-chart"  ></dBarChart>
      </componentWithTitle>
            <componentWithTitle class="grid-col-12" title='固定资产养护类型统计'     >
         <dBarLineChart  slot="body"  :data="cureTypeCountNum" class="bar-chart"   type='stack'></dBarLineChart>
      </componentWithTitle>
            <componentWithTitle class="grid-col-12" title='固定资产使用年数统计'    >
         <dBarChart  slot="body"  :data="treeAgeData" class="bar-chart"   ></dBarChart>
      </componentWithTitle>

         <componentWithTitle class="grid-col-12" title='固定资产保护类型统计'    >
         <dBarLineChart  slot="body"  :data="protectTypeCountNum" class="bar-chart" type='stack'></dBarLineChart>
      </componentWithTitle>
        </section>
  </main>
</template>

<script>
import leftPie  from "./leftPie"
import { protectLevStatisticApi,growthSituationStatisticApi,treeAgeStatisticApi,cureTypeCountNumStatisticsApi,protectTypeCountNumStatisticsApi}from  '@/network/oldtree.js'

export default {
  name: 'MiddleStatistic',
  components:{leftPie},
  props: {
    data: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
  },
  data: function () {
    return {
      cardList: [],
      protectLevData:[],
       treeAgeData:{'':[]},
       treeSpecies:{
                  '收费公园': [
                    {
                      value: 320,
                      label: '2万以下'
                    },
                    {
                      value: 301,
                      label: '2万-20万'
                    },
                    {
                      value: 320,
                      label: '20万-100万'
                    },
                    {
                      value: 130,
                      label: '100万以上'
                    },
                  ],
                  '收费公园1': [
                    {
                      value: 320,
                      label: '2万以下'
                    },
                    {
                      value: 301,
                      label: '2万-20万'
                    },
                    {
                      value: 320,
                      label: '20万-100万'
                    },
                    {
                      value: 130,
                      label: '100万以上'
                    },
                  ],
                },
      growthSituationData:{'':[]},
             
                protectTypeCountNum:{'':[]},
                cureTypeCountNum:{'':[]},

    }
  },
  computed: {'':[]},

  mounted () {
    this.loadData()
  },
  methods:{
    loadData(){
      protectLevStatisticApi().then((data)=>{

        debugger
          this.protectLevData= data.map((item)=>{
          return {value:item.countNumber,label:item.categoryName}
        })


      })
      growthSituationStatisticApi().then((data)=>{
        debugger
        this.growthSituationData={'使用状况':data.map((item)=>{
          return {value:item.countNumber,label:item.categoryName}
        })}

      })
      treeAgeStatisticApi().then((data)=>{
        debugger
           this.treeAgeData={'使用年数':data.map((item)=>{
          return {value:item.countNumber,label:item.categoryName}
        })}

      })
      cureTypeCountNumStatisticsApi().then((data)=>{
          debugger
        this.cureTypeCountNum={'今年新增量':data.map((item)=>{
          return {value:item.newYearQuantity,label:item.type}
        }),
        '总数量':data.map((item)=>{
          return {value:item.totalNum,label:item.type}
        })}

      })

       protectTypeCountNumStatisticsApi().then((data)=>{
         debugger
                this.protectTypeCountNum={'今年新增量':data.map((item)=>{
          return {value:item.newYearQuantity,label:item.type}
        }),'总数量':data.map((item)=>{
          return {value:item.totalNum,label:item.type}
        })}
      })
    }
  }
}
</script>

<style scoped lang="less">

.bg-wave {
  background-image: url(/img/wave.png);
}
.card-item {
  height: 160px;
  width: 310px;
  
}
.border{
  border: solid 1px var(--main-color);
}
.bar-chart{
  height: 180px;
}
</style>
