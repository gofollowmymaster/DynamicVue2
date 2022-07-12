<template>
  <!-- 普通输入框 -->
  <main >
  <div class='flex justify-between pr12'>
<el-input
      :value="value"
      :placeholder="getPlaceholder(item)"
      :disabled="getDisabled"
      @blur="(e) => onBlur(item, e)"
      type="text"
      v-bind="bindOptions"
      readonly
      v-if="!getTextModel"
    >
    </el-input>
    <div v-else :style="item.textStyle||{}" class="form-input-text text-ellipsis">{{ value || '-' }}   </div>
   <el-button   @click="selectPoint" size="small" type="text" :disabled="getDisabled" class="ml10">{{!getTextModel?"选择":"查看"}}</el-button>
  </div>
    <DrawElementGis
      v-model="val"
      :visible="visible"
      :zoom="item.zoom"
      :title="item.title"
      :drawType="bindOptions.drawType"
      :mode='getTextModel?"view":"select"'
    ></DrawElementGis>
  </main>
</template>

<script>
import FormMixin from '../../packages/components/formItems/mixin'
import DrawElementGis from '../source/DrawElementGis.vue'

export default {
  components: { DrawElementGis },
  name: 'FormDrawElement',
  mixins: [FormMixin],
  props: {
 
 

  },
  computed: {

    val: {
      get () {
        let value
        try {
          value = JSON.parse(this.value)
        } catch (e) {
          value = []
        }
        return value
      },
      set (lnglat) {
        this.$emit('input', JSON.stringify(lnglat))

        // 只有非子表单的情况下，才会冒泡上去数据变更
        if (this.formItemType !== 'childForm') {
          this.statusChangeFn.valueUpdateEvent({
            [this.item.key]: lnglat
          })
        } else {
          // 如果是子表单的话，执行内置的变更
          this.childChangeData.valueUpdateEvent()
        }
      }
    }
  },
  data: function () {
    return {
      visible: { value: false }
    }
  },
  created () {

  },

  methods: {
    selectPoint () {
      this.visible.value = true
    }
  }
}
</script>
