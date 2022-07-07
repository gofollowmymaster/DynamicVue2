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
        readonly
        v-if="!getTextModel"
        @click.native="selectHandleer"
      >
      </el-input>
      <div v-else :style="item.textStyle || {}" class="form-input-text">
        {{ val || '-' }}
      </div>
    </div>

    <innerOrgSelPersonDialog
      v-if="!getTextModel"
      :title="item.dialogTitle"
      :type="item.isMultSelect ? 'checkbox' : 'radio'"
      :visible="!getTextModel && visible.value"
      :defaultCheckedList="value ? value : []"
      @ok="handleSave"
      @close="visible.value = false"
    ></innerOrgSelPersonDialog>
  </main>
</template>

<script>
import FormMixin from '@/packages/components/formItems/mixin'
import innerOrgSelPersonDialog from '@/components/sysSettingDialog/innerOrgSelPerson.dialog'

export default {
  name: 'FormInnerOrgSelPersonSelector',
  mixins: [FormMixin],
  components: { innerOrgSelPersonDialog },
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
    valueObj () {
      if (this.value instanceof Array) return this.value.filter(item => item)
      return []
    },
    val: {
      get () {
        //  let value = this.value||[]
        return this.valueObj
          .map((value) => value.userName || value.name)
          .join(',')
      },
      set (value) {
        this.$emit('input', value)
        // 更新数据
        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: value
        })
      }
    }
  },
  data: function () {
    return {
      visible: { value: false },

      defaultCheckedList: [] // 请传入数据全量
    }
  },
  created () {},

  methods: {
    selectHandleer () {
      this.visible.value = true
    },

    handleSave (list) {
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
