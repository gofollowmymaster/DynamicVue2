<template>
  <main  class="flex flex-direction  ">
      
      <dPieChart class="pie-chart   "    :data="data"  :extraOptions="extraOptions" type="solid"></dPieChart>
      <ul class="full-width flex  flex-direction  align-center mt24 ">
        <li  v-for="item in pieData" :key="item.label" class="width80 border flex justify-center align-center text-size16 mt12 py8" :style="{borderColor:item.color}">
          <span class="label-icon mr6"  :style="{backgroundColor:item.color}"></span>   
          <span class="mr8">{{item.label}}</span>
          <span>{{item.value}}</span>
        </li>
      </ul>
  </main>
</template>

<script>
import { JSONDeepCopy } from'@/packages/utils/tool'

export default {
  name: 'leftPie',
  props: {
    data: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    apiPromise: {
      type: Promise,
      default(){
        return Promise.resolve()
      }
    }
  },
  data: function () {
    return {
      pieData: [],
      extraOptions:{
      }
    }
  },
  computed: {},
  watch: {
    data(data){
          this.pieData = JSONDeepCopy(data);
          ['#6997FD', '#36C1BC', '#FF6366', '#5FC7F6'].forEach((color,index) => {
                if( this.pieData[index])this.pieData[index].color=color
          });
    },
    apiPromise: {
      handler (apiPromise) {
        apiPromise.then((data) => {
          if (data) {
            this.pieData = data;
            ['#6997FD', '#36C1BC', '#FF6366', '#5FC7F6'].forEach((color,index) => {
               if( this.pieData[index])this.pieData[index].color=color
            });
          }
        })
      }
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="css">

 .pie-chart{
   height: 180px;
 }
 .border{
   border-radius: 28px;

 }
 .label-icon{
   height: 12px;
   width: 12px;
   border-radius: 50%;
 }

</style>
