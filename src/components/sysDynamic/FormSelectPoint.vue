<template>
  <main  >
    <div class="flex justify-between pr12">
      <el-input
        :value="value"
        :placeholder="getPlaceholder(item)"
        :disabled="getDisabled"
        type="text"
        v-bind="bindOptions"
        readonly
        v-if="!getTextModel">
      </el-input>
      <div v-else :style="item.textStyle || {}" class="form-input-text text-ellipsis">
        {{ value || '-' }}
      </div>
      <el-button
        @click="selectPoint"
        type='text'
        size="small"
        :disabled="getDisabled" class="ml10"
        >{{!getTextModel?'选择':'查看'}}</el-button>
    </div>

    <selectPointGis
      v-if="visible.value"
      v-model="val"
      :visible="visible"
      :zoom="zoom"
      :title="title"
      :mode='getTextModel?"view":"select"'
    ></selectPointGis>
  </main>
</template>

<script>
import FormMixin from '../../packages/components/formItems/mixin'
import { gcj02ToWgs } from '../../packages/utils/mapUtils'
import selectPointGis from '@/components/source/selectPointGis'

export default {
  name: 'FormSelectPoint',
  mixins: [FormMixin],
  components: { selectPointGis },
  props: {
    zoom: {
      type: Number,
      default: function () {
        return 11
      }
    },
    title: {
      type: String,
      default: function () {
        return '选择位置'
      }
    }
  },
  computed: {
    val: {
      get () {
        return this.value ? this.value.split(',') : []
      },
      set (lnglat) {
        debugger
        this.$emit('input', lnglat.join(','))

        // if (!lnglat.length) return ;
        lnglat = gcj02ToWgs(lnglat)

        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            this.statusChangeFn.valueUpdateEvent({
              [this.item.key]: result.regeocode
            })
          } else {
            console.error('根据经纬度查询地址失败')
          }
        })
      }
    }
  },
  data: function () {
    return {
      visible: { value: false }
    }
  },
  created () {
    this.geocoder = new AMap.Geocoder({
      // city: "010", //城市设为北京，默认：“全国”
      // radius: 1000 //范围，默认：500
    })
  },

  methods: {
    selectPoint () {
      this.visible.value = true
    }
  }
}
</script>

<style scoped lang="css"></style>
