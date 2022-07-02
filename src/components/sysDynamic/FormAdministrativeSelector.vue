<template>
  <main
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
    class="form-input-box form-item-box"
  >
    <div class="flex">
      <el-input
        class="cursor-point"
        :value="val"
        :placeholder="getPlaceholder(item)"
        :disabled="getDisabled"
        type="text"
        v-bind="bindOptions"
        v-if="!getTextModel"
        @click.native="selectHandleer"
      >
      </el-input>
      <div v-else :style="item.textStyle || {}" class="form-input-text">
        {{ val || '-' }}
      </div>
    </div>
    <administrativeDialog
      v-if="!getTextModel"
      :title="item.dialogTitle||title"
      :type="item.isMultSelect ? 'checkbox' : 'radio'"
      :visible="!getTextModel && visible.value"
      :defaultCheckedList="valueObj ? valueObj : []"
      @ok="saveAdministractive"
      @close="visible.value = false"
    ></administrativeDialog>
  </main>
</template>

<script>
import FormMixin from '@/common/dynamicPage/components/formItems/mixin'
import administrativeDialog from '@/components/sysSettingDialog/administrative.dialog'

export default {
  name: 'FormAdministrativeSelector',
  mixins: [FormMixin],
  components: { administrativeDialog },
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
  /**
   * value 格式  {admName|name,admCode}
   */
  computed: {
    valueObj () {
      
        console.log('---this.value----',this.value)

      if (this.value instanceof Array) return this.value.filter(item=>item)
      return []
    },
    val: {
      get () {
        //  let value = this.value||[]
        console.log('---this.valueObj----',this.valueObj)
        return this.valueObj
          .map((value) => value.admName || value.name)
          .join(',')
      },
      set (value) {
        this.$emit('input', value)
        this._valueLink(value)
        // 更新数据
        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: value
        })
      }
    }
  },
  data: function () {
    return {
      visible: { value: false }
    }
  },
  created () {},

  methods: {
    selectHandleer () {
      this.visible.value = true
    },

    saveAdministractive (list) {
      this.val = list
      this.visible.value = false
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-dialog__wrapper {
  position: fixed;
}
</style>
