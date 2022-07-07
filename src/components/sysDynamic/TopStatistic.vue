<template>
  <ul class="flex justify-between">
    <li class="bg-wave card-item mr12 flex p24 text-white flex flex-direction border-r4"
     v-for="card in cardList" :key="card.label"  :style="{backgroundColor:card.backgroundColor}">
      <div class="text-size18">
        <i class=" circle p6 border" :class="'el-icon-' + card.icon"></i>
        <span  class="inline-block ml8" >{{ card.label }}</span>
      </div>
      <div class="mt16 ml36">
        <span class="text-size32">{{ card.value }}</span>
        <span  class="text-size16 inline-block ml6">{{ card.unit }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { JSONDeepCopy } from '@/packages/utils/tool'

export default {
  name: 'TopStatistic',
  props: {
    data: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    apiPromise: {
      type: Promise,
      default () {
        return Promise.resolve()
      }
    }
  },
  data: function () {
    return {
      cardList: []
    }
  },
  computed: {},
  watch: {
    apiPromise: {
      handler (apiPromise) {
        apiPromise.then((data) => {
          if (data) {
            this.cardList = data
          }
        })
      }
    },
    data: {
      handler (data) {
        this.cardList = JSONDeepCopy(data)
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
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
  border: solid 1px white;
}
</style>
