<template>
  <div class="full-width p20 bg-white  over-scroll">
    <DynamicSection :data="pageData" :body="body"></DynamicSection>
  </div>
</template>
<script>
import MiddleStatistic from './components/MiddleStatistic.vue'
import Vue from 'vue'

import { quantityStatisticsApi, treeAndReserveRegionStatisticApi } from '@/network/assets.js'
Vue.component('MiddleStatistic', MiddleStatistic)

export default {
  name: 'assetsOverview',
  data: function () {
    return {
      pageData: {
        statisticType: {
          statisticType: 'protectLev'
        },
        topStatistic: [
          {
            icon: 's-ticket',
            value: 12,
            unit: '台',
            label: '固定资产总数',
            backgroundColor: '#647EE1'
          },
          {
            icon: 's-flag',
            value: 1522,
            unit: '台',
            label: '后备资源总数',
            backgroundColor: '#FC8588'

          },
          {
            icon: 'trophy',
            value: 11522,
            unit: '台',
            label: '不动产总数',
            backgroundColor: '#41c5c5'

          },
          {
            icon: 'moon-night',
            value: 8512,
            unit: '次',
            label: '管养总次数',
            backgroundColor: '#ee9278'

          },
          {
            icon: 'orange',
            value: 192,
            unit: '类',
            label: '资产类型总数',
            backgroundColor: '#ee9278'

          }
        ],
        middleStatistic: [
        ]
      },

      treeAndReserveRegionData: {
        '': []
      }
    }
  },
  computed: {
    body () {
      return [{
        component: 'TopStatistic',
        name: 'topStatistic',
        props:
              {
                class: ['grid-col-24']
              }
      },
      {
        component: 'MiddleStatistic',
        name: 'middleStatistic',
        props:
              {
                class: ['grid-col-24']
              }
      },
      {
        component: 'componentWithTitle',
        name: 'bottomLineStatistic',
        key: 'bottomLineStatistic',
        props: {
          bodyComponent: 'dLineChart',
          title: '所属区域统计',
          class: ['grid-col-24', 'mt24'],
          style: { height: '300px' },
          data: this.treeAndReserveRegionData,
          extraOptions: {
          }
        }
      }

      ]
    }
  },
  components: {},
  mounted () {
    this.loadData()
  },
  methods: {
    onSearch (params) {},
    loadData () {
      treeAndReserveRegionStatisticApi().then((data) => {
        this.treeAndReserveRegionData = {
          固定资产: data.map((item) => {
            return { label: item.categoryName, value: item.treeCountNumber }
          }),
          后备资源: data.map((item) => {
            return { label: item.categoryName, value: item.reserveCountNumber }
          })
        }
      })

      quantityStatisticsApi().then((data) => {
        this.pageData.topStatistic[0].value = data.ancientTreeNumber
        this.pageData.topStatistic[1].value = data.reserveResourcesNumber
        this.pageData.topStatistic[2].value = data.walkwayTreeNumber
        this.pageData.topStatistic[3].value = data.curingNumber
        this.pageData.topStatistic[4].value = data.treeSpeciesNumber
      })
    }
  }
}
</script>

<style lang="css" scoped>

.over-scroll{
  overflow: scroll;

}
.margin-top16 {
  margin-top: 16px;
}

</style>
